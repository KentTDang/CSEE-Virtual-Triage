import os
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from dotenv import load_dotenv
from scrape.scrapeNprocess import make_documents

load_dotenv()

CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_DATABASE = os.getenv("CHROMA_DATABASE", "development")
URLS = [
  "https://advising.coeit.umbc.edu/computer-engineering/",
  "https://advising.coeit.umbc.edu/computer-science/",
  "https://www.csee.umbc.edu",
  "https://www.csee.umbc.edu/about/",
  "https://www.csee.umbc.edu/facts-highlights/",
  "https://www.csee.umbc.edu/jobs/",
  "https://www.csee.umbc.edu/undergraduate/",
  "https://www.csee.umbc.edu/undergraduate/computer-engineering-bs/",
  "https://www.csee.umbc.edu/undergraduate/computer-engineering-bs/student-outcomes/",
  "https://www.csee.umbc.edu/undergraduate/computer-engineering-bs/transfer-information-computer-engineering/",
  "https://www.csee.umbc.edu/undergraduate/computer-science-bs/",
  "https://www.csee.umbc.edu/undergraduate/computer-science-bs/student-outcomes/",
  "https://www.csee.umbc.edu/undergraduate/computer-science-bs/faq/",
  "https://www.csee.umbc.edu/computer-science-b-s-tracks/",
  "https://www.csee.umbc.edu/undergraduate/computer-science-bs/course-frequency/",
  "https://www.csee.umbc.edu/enrollment-and-graduation-data/",
  "https://www.csee.umbc.edu/undergraduate/computer-science-bs/transfer-information/",
  "https://www.csee.umbc.edu/undergraduate/computer-science-bs/syllabi/",
  "https://www.csee.umbc.edu/undergraduate/undergraduate-faq-advising-registration-graduation/",
  "https://www.csee.umbc.edu/undergraduate/required-technology/",
  "https://www.csee.umbc.edu/resources/internships/",
  "https://www.csee.umbc.edu/resources/internships/guidelines-for-cmsc-498-reports/",
  "https://www.csee.umbc.edu/files/2022/01/498_agreement3.doc",
  "https://www.csee.umbc.edu/resources/student-organizations/",
  "https://www.csee.umbc.edu/resources/student-forms/",
  "https://www.csee.umbc.edu/graduate/",
  "https://www.csee.umbc.edu/graduate/computer-engineering-ms-phd/",
  "https://www.csee.umbc.edu/graduate/computer-science-m-s-ph-d/",
  "https://www.csee.umbc.edu/computer-science-graduate-program-handbook/",
  "https://www.csee.umbc.edu/graduate-track-in-cybersecurity-for-students-in-the-ms-and-phd-programs-in-computer-science/",
  "https://www.csee.umbc.edu/admission/",
  "https://www.csee.umbc.edu/comp-sci-grad-faq/",
  "https://www.csee.umbc.edu/graduate/electrical-engineering-m-s-ph-d/",
  "https://www.csee.umbc.edu/accelerated-bachelors-masters-program/",
  "https://www.csee.umbc.edu/graduate/graduate-orientation/",
  "https://www.csee.umbc.edu/online-orientation/",
  "https://www.csee.umbc.edu/people/",
  "https://www.csee.umbc.edu/leadership/",
  "https://www.csee.umbc.edu/tenure-track-faculty/",
  "https://www.csee.umbc.edu/instructional-faculty/",
  "https://www.csee.umbc.edu/adjunct-faculty/",
  "https://www.csee.umbc.edu/people/staff/",
  "https://www.csee.umbc.edu/research/",
  "https://www.csee.umbc.edu/csee-research-areas/",
  "https://www.csee.umbc.edu/research-focus-areas-and-centers/",
  "https://www.csee.umbc.edu/research/research-labs/",
  "https://www.csee.umbc.edu/news-events/",
  "https://www.csee.umbc.edu/resources/",
  "https://www.csee.umbc.edu/academic-advocacy-referral/",
  "https://www.csee.umbc.edu/academic-success-center-resources/",
  "https://www.csee.umbc.edu/scholarships/",
  "https://registrar.umbc.edu/calendars/registration-appointments/"
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
    collection_name="csee-department-1",
    chroma_cloud_api_key=CHROMA_API_KEY,
    tenant=CHROMA_TENANT,
    database=CHROMA_DATABASE
)

print("Ingestion complete! Data uploaded to Chroma Cloud.")
