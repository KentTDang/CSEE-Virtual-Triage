import os
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv
from scrapeNprocess import make_documents

load_dotenv()

CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_DATABASE = os.getenv("CHROMA_DATABASE", "development")

URLS = [
    "https://www.csee.umbc.edu/undergraduate/computer-engineering-bs/",
    "https://www.csee.umbc.edu/undergraduate/computer-engineering-bs/student-outcomes/"
]

docs = make_documents(URLS)

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-large",
    # With the `text-embedding-3` class
    # of models, you can specify the size
    # of the embeddings you want returned.
    # dimensions=1024
)
print(f"Embeddings: {embeddings}")

vectorstore = Chroma.from_documents(
    documents=docs,
    embedding=embeddings,
    collection_name="csee-department",
    chroma_cloud_api_key=CHROMA_API_KEY,
    tenant=CHROMA_TENANT,
    database=CHROMA_DATABASE
)

print("Ingestion complete! Data uploaded to Chroma Cloud.")
