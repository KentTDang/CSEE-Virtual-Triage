# https://python.langchain.com/docs/tutorials/rag/
# https://docs.crawl4ai.com/core/crawler-result/#2-html-variants
# Structured llm output: https://python.langchain.com/docs/how_to/structured_output/

import os
from dotenv import load_dotenv

from typing import List, Dict
from typing_extensions import Annotated, TypedDict

from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import PromptTemplate
from pydantic import BaseModel

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
CHROMA_API_KEY = os.getenv("CHROMA_API_KEY")
CHROMA_TENANT = os.getenv("CHROMA_TENANT")
CHROMA_DATABASE = os.getenv("CHROMA_DATABASE", "Development")
COLLECTION_NAME = os.getenv("CHROMA_COLLECTION", "csee-department")

class Source(BaseModel):
    title: str
    url: str

class StructuredOutput(BaseModel):
    answer: str
    category: str
    sources: List[Source]

class Chatbot:

    def __init__(self):
        print("Initialize any objects")
        self.llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)
        self.embeddings = OpenAIEmbeddings(model="text-embedding-3-large")
        self.vectorstore = Chroma(
            collection_name=COLLECTION_NAME,
            embedding_function=self.embeddings,
            chroma_cloud_api_key=CHROMA_API_KEY,
            tenant=CHROMA_TENANT,
            database=CHROMA_DATABASE,
        )
        self.prompt = PromptTemplate.from_template(
            """
            You are a staff at the University of Maryland, Baltimore County in the Department 
            of Computer Science and Electrical Engineering (CSEE).

            Your task is to answer questions about office hours, forms, advising contacts, deadlines, and etc
            and to categorize the questions.

            The possible categories for the answers and questions are:
            - Academic Advising:Academic advising is a dynamic relationship between advisor and student 
            to support the student's educational and career success. Advisors provide guidance on academic 
            policies and regulations, post-graduate opportunities, and other resources available on-campus 
            that offer academic and personal support.
            - Forms:
                Enrollment
                Enroll for Excess Credits, Time Conflict, Request for Credit by Examination, USM Inter-Institutional Enrollment, BSEP Inter-Institutional

                Exception/Appeals Requests
                Exception to Enrollment Policy, Time Conflict Exception, Petition for Residency, Petition for Academic Clemency

                Records Update/Request
                Declaration/Change of Major, Graduation Verification Letter, Enrollment Verification, Degree Verification, Student Data Request, Duplicate Diploma Ordering, Personal Information Update

                Transfer Requests
                Course Review, Verification of Transferability

                Veteran Affairs
                Semester Certification, Responsibility Checklist, Add/Drop Reporting
            - Events: School Event means any school-sponsored or school authorized extra-curricular event or activity on or off school property.
            - General Info: Any information that does not fall into the categories above

            You will be given context to the CSEE department website. You will need to reference the context you used.

            Guidelines:
            - Be concise and specific.
            - Reference sources when appropriate.
            - Do not invent information.

            Examples:

            Question:
            Answer:

            Question:
            Answer:

            Question:
            Answer:
            
            Context:
            {context}

            Question: 
            {question}

            Answer:
            """
        )

    
    def _retrieve_context(self, query: str, k: int = 4) -> List[Dict]:
        """
        Retrieves top-k relevant chunks from the vectorstore for a given query.
        """
        return self.vectorstore.similarity_search(query, k=k)
    
    def _build_context_text(self, results: List) -> str:
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

    def evaluate(self, query: str, k: int = 4):
        print("Inside of evaluate" )
        context = self._retrieve_context(query, k=k)
        built_context = self._build_context_text(context)

        prompt = self.prompt.format(context=built_context, question=query)
        structured_llm = self.llm.with_structured_output(StructuredOutput, method="json_schema")

        response: StructuredOutput = structured_llm.invoke(prompt)

        print("Response: ", response)
        return response
