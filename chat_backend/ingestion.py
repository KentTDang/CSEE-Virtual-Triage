import os
from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv
import re

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_DATABASE = os.getenv("CHROMA_DATABASE", "development")

URLS = [
    "https://www.csee.umbc.edu/undergraduate/"
]

#https://python.langchain.com/docs/integrations/document_loaders/
loader = WebBaseLoader(URLS)
docs = loader.load()
import re

for doc in docs:
    text = doc.page_content
    text = re.sub(r"\s+", " ", text)  # collapse whitespace
    # remove recurring boilerplate phrases
    text = re.sub(r"Skip to main content", "", text, flags=re.IGNORECASE)
    text = re.sub(r"Search Context", "", text, flags=re.IGNORECASE)
    doc.page_content = text.strip()

print(f"Example document page content:\n{docs[0].page_content[:500]}...\n")
print(f"Loaded {len(docs)} pages")

splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=100)
split_docs = splitter.split_documents(docs)
print(f"Example chunked page content:\n{split_docs[0]}...\n")
print(f"Created {len(split_docs)} chunks")

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-large",
    # With the `text-embedding-3` class
    # of models, you can specify the size
    # of the embeddings you want returned.
    # dimensions=1024
)
print(f"Embeddings: {embeddings}")

vectorstore = Chroma.from_documents(
    documents=split_docs,
    embedding=embeddings,
    collection_name="csee-department",
    chroma_cloud_api_key=CHROMA_API_KEY,
    tenant=CHROMA_TENANT,
    database=CHROMA_DATABASE
)

print("Ingestion complete! Data uploaded to Chroma Cloud.")
