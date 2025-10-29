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



from fastapi import Request

@app.post("/chat")
async def chat_adapter(request: Request):
    """
    Adapter endpoint for AI SDK v5 frontend.
    Extracts latest user message from `messages` and calls ask_question().
    """
    try:
        # ✅ Parse the JSON body explicitly
        body = await request.json()
        messages = body.get("messages", [])
        user_query = ""

        if messages:
            last = messages[-1]
            if last.get("role") == "user":
                # AI SDK v5 sends messages as { parts: [{ type: 'text', text: '...' }] }
                parts = last.get("parts", [])
                if parts and len(parts) > 0 and "text" in parts[0]:
                    user_query = parts[0]["text"]
                elif "content" in last:
                    user_query = last["content"]

        if not user_query.strip():
            raise HTTPException(status_code=400, detail="Empty query")

        # ✅ Call your RAG pipeline
        result = ask_question(user_query, k=4)

        # ✅ Convert Pydantic model if needed
        if hasattr(result, "dict"):
            result = result.dict()

        # ✅ Return AI SDK v5-compatible response
        return {
            "messages": [
                {
                    "id": "rag-response",
                    "role": "assistant",
                    "parts": [
                        {"type": "text", "text": result.get("answer", "")}
                    ],
                }
            ],
            "sources": result.get("sources", []),
        }


    except Exception as e:
        print("🔥 Chat adapter error:", e)
        raise HTTPException(status_code=500, detail=str(e))
