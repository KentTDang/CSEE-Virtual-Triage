import os
from langchain_chroma import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_HOST = os.getenv("CHROMA_HOST", "https://api.trychroma.com")
CHROME_DATABASE = os.getenv("CHROMA_DATABASE", "development")

def get_vectorstore(collection_name="umbc-department"):
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

    vectorstore = Chroma(
        collection_name=collection_name,
        embedding_function=embeddings,
        chroma_cloud_api_key=CHROMA_API_KEY,
        tenant=CHROMA_TENANT,
        database=CHROME_DATABASE
    )

    return vectorstore
