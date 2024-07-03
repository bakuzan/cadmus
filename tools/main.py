import os, csv

import config
import scraper
import db
import printer

# Load .env
config.setup()

# Target file locations
isbn_file_path = "./isbns.txt"
csv_file_path = "./data.csv"

# Read in the isbns list if file exists
# This will scrape data for Books table
if os.path.isfile(isbn_file_path):
    input = open(isbn_file_path)
    isbns = input.readlines()
    input.close()

    for isbn in isbns:
        scraper.fetch_and_store(isbn.strip())
else:
    print()
    printer.red(f"No {isbn_file_path} found, continuing...")

# Read in the csv data if file exists
# This will scrape data for Books table
# AND insert Series and History for each row
if os.path.isfile(csv_file_path):
    f = open(csv_file_path, mode='r')
    rows = csv.DictReader(f)

    for row in rows:
        data = {}
        isbn = row["ISBN"]
        if not isbn:
            printer.magenta("Row doesn't have an ISBN, skipping...")
            continue

        series_name = row["Series"] or None
        data["StartDate"] = row["Start"] or None
        data["EndDate"] = row["End"] or None
        if not data["StartDate"]:
            printer.magenta("Row doesn't have a StartDate, skipping...")
            continue
        
        # Ensure book exists, ensure series exists, update link and add history
        data["BookId"] = scraper.fetch_and_store(isbn)
        series_id = db.add_series_if_not_exists(series_name)
        printer.custom_pretty_print(data)
        db.update_book_series(data["BookId"], series_id)
        db.add_history_if_not_exists(data)
else:
    print()
    printer.red(f"No {csv_file_path} found, continuing...")
