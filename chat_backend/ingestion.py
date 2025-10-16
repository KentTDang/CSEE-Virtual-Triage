# ingestion.py
import os
from langchain_community.document_loaders import WebBaseLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_HOST = os.getenv("CHROMA_HOST", "https://api.trychroma.com")

URLS = [
    "https://cs.umbc.edu/",
    "https://cs.umbc.edu/undergraduate/",
    "https://cs.umbc.edu/graduate/",
    "https://cs.umbc.edu/faculty/",
]

loader = WebBaseLoader(URLS)
docs = loader.load()
print(f"Loaded {len(docs)} pages")

splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
split_docs = splitter.split_documents(docs)
print(f"Created {len(split_docs)} chunks")

print("Creating embeddings with Gemini...")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

print("Uploading to Chroma Cloud...")
vectorstore = Chroma.from_documents(
    documents=split_docs,
    embedding=embeddings,
    collection_name="umbc-department",
    client_settings={
        "chroma_api_impl": "rest",
        "chroma_server_host": CHROMA_HOST,
        "chroma_server_http_port": 443,
        "chroma_api_key": CHROMA_API_KEY,
        "chroma_tenant": CHROMA_TENANT,
    },
)

print("Ingestion complete! Data uploaded to Chroma Cloud.")
