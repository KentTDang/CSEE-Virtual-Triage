import os 
from langchain_google_genai import ChatGoogleGenerativeAI

#https://python.langchain.com/docs/tutorials/rag/
def rag(question: str) -> str:

    # Initialize the Gemini model
    llm = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash",
        temperature=0,
        max_tokens=None,
        timeout=None,
        max_retries=2,
    )
