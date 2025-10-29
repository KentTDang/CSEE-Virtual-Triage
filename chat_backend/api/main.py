"""
api/main.py
------------
FastAPI backend for the UMBC CSEE triage chatbot.
Exposes:
  • /ask  – synchronous JSON endpoint
  • /chat – streaming SSE endpoint for AI SDK v5 DefaultChatTransport
"""

import asyncio
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Union
import json
import time

from rag_pipeline import ask_question


# -----------------------------
# Data Models
# -----------------------------
class QuestionRequest(BaseModel):
    query: str
    top_k: int = 4


class Source(BaseModel):
    title: str
    url: str
    chunk_index: Union[int, str, None] = None


class AnswerResponse(BaseModel):
    answer: str
    sources: List[Source]


# -----------------------------
# App Initialization
# -----------------------------
app = FastAPI(
    title="UMBC CSEE Triage Chatbot API",
    version="1.0",
    description="Backend API for the triage chatbot using RAG over CSEE department data.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for local dev, or set ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Health Check
# -----------------------------
@app.get("/health")
async def health_check():
    return {"status": "ok"}


# -----------------------------
# Standard JSON RAG Endpoint
# -----------------------------
@app.post("/ask", response_model=AnswerResponse)
async def ask_question_endpoint(request: QuestionRequest):
    try:
        answer, sources = ask_question(request.query, k=request.top_k)
        return {"answer": answer, "sources": sources}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# -----------------------------
# Streaming Chat Endpoint (SSE)
# -----------------------------
from fastapi import Request
from starlette.concurrency import iterate_in_threadpool

@app.post("/chat")
async def chat_stream(request: Request):
    """
    SSE endpoint compatible with AI SDK v5 DefaultChatTransport.
    Streams assistant replies sentence-by-sentence.
    """
    try:
        body = await request.json()
        messages = body.get("messages", [])
        user_query = ""

        if messages:
            last = messages[-1]
            if last.get("role") == "user":
                parts = last.get("parts", [])
                if parts and "text" in parts[0]:
                    user_query = parts[0]["text"]
                elif "content" in last:
                    user_query = last["content"]

        if not user_query.strip():
            return StreamingResponse(
                iterate_in_threadpool([b"event: error\ndata: Empty query\n\n"]),
                media_type="text/event-stream"
            )

        # --- Run your RAG pipeline ---
        result = ask_question(user_query, k=4)
        answer = result.get("answer", "")
        sources = result.get("sources", [])

        # --- Define event generator ---
        async def event_stream():
            # Force immediate connection confirmation
            yield b": ping\n\n"

            # Stream in sentences for smoother pacing
            for sentence in answer.split(". "):
                event_data = {
                    "type": "message",
                    "data": {
                        "id": "rag-response",
                        "role": "assistant",
                        "parts": [{"type": "text", "text": sentence.strip() + ". "}],
                    },
                }
                yield f"event: message\ndata: {json.dumps(event_data)}\n\n".encode("utf-8")
                await asyncio.sleep(0.05)

            # Final completion event
            done_data = {"type": "done", "sources": sources}
            yield f"event: done\ndata: {json.dumps(done_data)}\n\n".encode("utf-8")

        # --- Return streaming response ---
        return StreamingResponse(
            event_stream(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache, no-transform",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no",  # required for proxies
            },
        )

    except Exception as e:
        print("🔥 Chat streaming error:", e)
        return StreamingResponse(
            iterate_in_threadpool([
                f"event: error\ndata: {json.dumps({'error': str(e)})}\n\n".encode("utf-8")
            ]),
            media_type="text/event-stream"
        )
