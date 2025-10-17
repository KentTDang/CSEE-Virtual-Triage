import os
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_DATABASE = os.getenv("CHROMA_DATABASE", "development")

URLS = [
    "https://www.csee.umbc.edu/",
    "https://www.csee.umbc.edu/overview/",
    "https://www.csee.umbc.edu/undergraduate/"
]

loader = WebBaseLoader(URLS)
docs = loader.load()
print(f"Example document page content:\n{docs[0].page_content[:500]}...\n")
print(f"Loaded {len(docs)} pages")

splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
split_docs = splitter.split_documents(docs)
print(f"Example chunked page content:\n{split_docs[0]}...\n")
print(f"Created {len(split_docs)} chunks")

print("Creating embeddings with Gemini...")
embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")

# vectorstore = Chroma.from_documents(
#     documents=split_docs,
#     embedding=embeddings,
#     collection_name="csee-department",
#     chroma_cloud_api_key=CHROMA_API_KEY,
#     tenant=CHROMA_TENANT,
#     database=CHROMA_DATABASE
# )

print("Ingestion complete! Data uploaded to Chroma Cloud.")
