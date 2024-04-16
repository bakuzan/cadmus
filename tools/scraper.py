import time, os, requests
from bs4 import BeautifulSoup

from utils import extract_text,get_image_and_save
from db import add_book_if_not_exists
import printer

def fetch_and_store(isbn):
    print()
    printer.blue(f"Starting processing for {isbn}...")
    time.sleep(1)

    # Request and cache file if not in cache
    file_path = f"./cache/{isbn}.html"
    if not os.path.isfile(file_path):
        # Request webpage 
        URL = "https://isbnsearch.org/isbn/" + isbn
        page = requests.get(URL)

        # Cache requested webpage
        with open(f"./cache/{isbn}.html", 'wb') as f:
            f.write(page.content)

    # Read cached file and scrape info
    with open(file_path, "r") as fp:
        soup = BeautifulSoup(fp, "html.parser")

        # book info
        bookMeta = soup.find(id="book")
        image = bookMeta.find("img")
        info = bookMeta.find("div", class_="bookinfo")

        data = {}
        data["Title"] = info.find("h1").text.strip()
        data["ISBN13"] = extract_text(info, "ISBN-13:")
        data["ISBN10"] = extract_text(info, "ISBN-10:")
        data["Author"] = extract_text(info, "Author:")
        data["Binding"] = extract_text(info, "Binding:")
        data["Publisher"] = extract_text(info, "Publisher:")
        data["Published"] = extract_text(info, "Published:")

        # Print, get image, and save to database
        printer.custom_pretty_print(data)
        get_image_and_save(data, image)
        return add_book_if_not_exists(data)
