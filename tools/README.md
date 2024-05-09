# Tools

Script to scrape book information and insert it into the local database.

## Setup

In powershell:

1. Run `python -m venv venv`
1. Run `venv/Scripts/activate`
1. Restore packages with `python -m pip install -r requirements.txt`

## How

1. Create a `isbns.txt` or `data.csv` file in the `tools` directory
2. Add isbn's of the books you want, one per line
3. Run `python main.py`
