from bs4 import BeautifulSoup
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter
import requests


def extract_main_content_and_title(url: str):
    """Return (title, cleaned main text) from the page."""
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching {url}: {e}")
        return None, ""

    soup = BeautifulSoup(resp.text, "html.parser")

    # Extract <title> or <h1>
    title_tag = soup.find("title")
    h1_tag = soup.find("h1")
    title = (h1_tag.get_text(strip=True) if h1_tag else
             title_tag.get_text(strip=True) if title_tag else url)

    # Extract <div class="main-content">
    main_div = soup.find("div", class_="main-content")
    if not main_div:
        print(f"Warning: no <div class='main-content'> found in {url}")
        return title, ""

    text = " ".join(main_div.get_text(separator=" ").split())
    return title, text.strip()


def make_documents(urls, chunk_size=800, chunk_overlap=100):
    docs = []
    splitter = RecursiveCharacterTextSplitter(chunk_size=chunk_size,
                                              chunk_overlap=chunk_overlap)

    for url in urls:
        title, raw_text = extract_main_content_and_title(url)
        if not raw_text:
            continue

        chunks = splitter.split_text(raw_text)
        for i, chunk in enumerate(chunks):
            docs.append(
                Document(
                    page_content=chunk,
                    metadata={"url": url, "title": title, "chunk_index": i}
                )
            )
            print(f"Chunk {i}: \n{chunk}\n")

        print(f"Processed {url}: {len(chunks)} chunks")

    print(f"Total documents ready for embedding: {len(docs)}")
    return docs
