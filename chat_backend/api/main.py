"""
api/main.py
------------
FastAPI backend for the UMBC CSEE triage chatbot.
Exposes a single /ask endpoint that runs the manual RAG pipeline
defined in rag_pipeline.py and returns the answer + sources as JSON.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Union

from rag_pipeline import ask_question

# Request model
class QuestionRequest(BaseModel):
    query: str
    top_k: int = 4

# Source metadata model
class Source(BaseModel):
    title: str
    url: str
    chunk_index: Union[int, str, None] = None  # <-- FIX: accept int or str

# Response model
class AnswerResponse(BaseModel):
    answer: str
    sources: List[Source]


# Initialize FastAPI
app = FastAPI(
    title="UMBC CSEE Triage Chatbot API",
    version="1.0",
    description="Backend API for the triage chatbot using RAG over CSEE department data.",
)

#Health Check
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Main endpoint
@app.post("/ask", response_model=AnswerResponse)
async def ask_question_endpoint(request: QuestionRequest):
    """
    Takes a user query, retrieves relevant CSEE content,
    runs the LLM generation, and returns an answer + sources.
    """
    try:
        result = ask_question(request.query, k=request.top_k)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

from fastapi.middleware.cors import CORSMiddleware

# Allow local dev frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for stricter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/chat")
async def chat_adapter(request: Dict):
    """
    Adapter endpoint for AI SDK frontend.
    Extracts the latest user message from `messages`
    and forwards it to /ask for processing.
    """
    try:
        messages = request.get("messages", [])
        user_query = ""
        if messages:
            last = messages[-1]
            if last.get("role") == "user":
                user_query = last.get("content", "")

        if not user_query.strip():
            raise HTTPException(status_code=400, detail="Empty query")

        # Call your existing RAG pipeline
        result = ask_question(user_query, k=4)

        # Format response so AI SDK can display it
        return {
            "id": "rag-response",
            "role": "assistant",
            "parts": [{"type": "text", "text": result["answer"]}],
            "sources": result.get("sources", []),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

