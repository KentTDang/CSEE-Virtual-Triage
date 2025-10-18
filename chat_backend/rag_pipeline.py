"""
rag_pipeline.py
----------------
Manual RAG (Retrieval-Augmented Generation) pipeline for the UMBC CSEE triage chatbot.
This version does not rely on LangChain's built-in RetrievalQA chain.
It performs each step explicitly: embedding -> retrieval -> prompt -> LLM -> output.
"""

import os
from typing import Dict, List

from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_DATABASE = os.getenv("CHROMA_DATABASE", "Development")
COLLECTION_NAME = os.getenv("CHROMA_COLLECTION", "csee-department")

embeddings = OpenAIEmbeddings(model="text-embedding-3-large")

vectorstore = Chroma(
    collection_name=COLLECTION_NAME,
    embedding_function=embeddings,
    chroma_cloud_api_key=CHROMA_API_KEY,
    tenant=CHROMA_TENANT,
    database=CHROMA_DATABASE,
)

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)

def retrieve_context(query: str, k: int = 4) -> List[Dict]:
    """
    Retrieves top-k relevant chunks from the vectorstore for a given query.
    """
    # print(f"Retrieving top {k} results from Chroma for query: {query}")
    results = vectorstore.similarity_search(query, k=k)
    return results


def build_context_text(results: List) -> str:
    """
    Concatenates retrieved document contents into a single context string.
    """
    context_parts = []
    for i, doc in enumerate(results):
        text = doc.page_content.strip()
        url = doc.metadata.get("url", "")
        title = doc.metadata.get("title", "Unknown Section")
        context_parts.append(f"Source {i+1} - {title} ({url}):\n{text}\n")
    return "\n".join(context_parts)


def generate_prompt(context: str, question: str) -> str:
    """
    Builds the prompt with context and question for the LLM.
    """
    return f"""
                You are a factual assistant for the UMBC CSEE Department triage chatbot.
                Answer the user's question using ONLY the provided context below.
                If the answer cannot be found in the context, respond with "I don't know."

                Context:
                {context}

                Question: {question}

                Guidelines:
                - Be concise and specific.
                - Reference sources when appropriate.
                - Do not invent information.

                Answer:
            """

def ask_question(query: str, k: int = 4) -> Dict[str, object]:
    """
    Executes the full manual RAG process:
    1. Retrieves relevant context from Chroma
    2. Builds a structured prompt
    3. Calls the LLM to generate an answer
    4. Returns the response and sources
    """
    # Step 1: Retrieve relevant docs
    results = retrieve_context(query, k=k)

    # Step 2: Build readable context
    context = build_context_text(results)

    # Step 3: Create final prompt
    prompt = generate_prompt(context, query)

    # Step 4: Query the LLM
    print("Generating response...")
    response = llm.invoke(prompt)
    answer = response.content.strip()

    # Step 5: Collect source metadata
    sources = [
        {
            "title": doc.metadata.get("title", ""),
            "url": doc.metadata.get("url", ""),
            "chunk_index": doc.metadata.get("chunk_index", ""),
        }
        for doc in results
    ]

    return {"answer": answer, "sources": sources}

# CLI test
if __name__ == "__main__":
    print("UMBC CSEE Triage Chatbot\n")
    q = input("Enter a question: ").strip()

    result = ask_question(q)
    print("\nAnswer:\n", result["answer"])

    if result["sources"]:
        print("\nSources:")
        for s in result["sources"]:
            print(f"- {s.get('title')} ({s.get('url')}) [chunk {s.get('chunk_index')}]")
