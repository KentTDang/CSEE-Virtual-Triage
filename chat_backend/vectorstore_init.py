# db/vectorstore_init.py
import os
from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_HOST = os.getenv("CHROMA_HOST", "https://api.trychroma.com")

def get_vectorstore(collection_name="umbc-department"):
    """
    Connect to Chroma Cloud vector store using Gemini embeddings.
    """
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    vectorstore = Chroma(
        collection_name=collection_name,
        client_settings={
            "chroma_api_impl": "rest",
            "chroma_server_host": CHROMA_HOST,
            "chroma_server_http_port": 443,
            "chroma_api_key": CHROMA_API_KEY,
            "chroma_tenant": CHROMA_TENANT,
        },
        embedding_function=embeddings,
    )

    return vectorstore
