# Tools

Script to scrape book information and insert it into the local database.

## Setup

1. In powershell, run `venv/Scripts/activate`
2. Restore packages, `python -m pip install -r requirements.txt`

## How

1. Create a `isbns.txt` file in the `tools` directory
2. Add isbn's of the books you want, one per line
3. Run `python main.py`
