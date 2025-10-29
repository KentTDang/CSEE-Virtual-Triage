"""
api/main.py
------------
FastAPI backend for the UMBC CSEE triage chatbot.
Exposes a single /ask endpoint that runs the manual RAG pipeline
defined in rag_pipeline.py and returns the answer + sources as JSON.
"""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict

from rag_pipeline import ask_question

class QuestionRequest(BaseModel):
    query: str
    top_k: int = 4  # optional, defaults to 4

class AnswerResponse(BaseModel):
    answer: str
    sources: List[Dict[str, str]]

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
