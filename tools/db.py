import sqlite3
import os

import printer

def create_connection(db_file):
    """
    Create a database connection to the SQLite database specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        conn.row_factory = sqlite3.Row # Make query results dict rather than tuple
    except IOError as e:
        print(e)

    return conn

## Mutation queries
def create_book(conn, book):
    """
    Create a new book into the books table
    :param conn:
    :param book:
    :return: book id
    """
    sql = '''
        INSERT INTO Books(Title, ISBN13, ISBN10, Author, Binding, Publisher, Published) 
        VALUES(:Title, :ISBN13, :ISBN10, :Author, :Binding, :Publisher, :Published)
    '''
    cur = conn.cursor()
    cur.execute(sql, book)
    conn.commit()
    return cur.lastrowid

def create_series(conn, series_name):
    """
    Create a new series into the series table
    :param conn:
    :param series_name:
    :return: series id
    """
    cur = conn.cursor()
    cur.execute("INSERT INTO Series(Name) VALUES(?)", (series_name,))
    conn.commit()
    return cur.lastrowid

def create_book_series(conn, book_id, series_id):
    """
    Create a new books-series into the BooksSeries table
    :param conn:
    :param book_id:
    :param series_id:
    """
    cur = conn.cursor()
    cur.execute("INSERT INTO BooksSeries(BookId, SeriesId) VALUES(?,?)", (book_id, series_id))
    conn.commit()

def delete_book_series(conn, book_id):
    """
    Delete BooksSeries matching BookId
    :param conn:
    :param book_id:
    """
    cur = conn.cursor()
    cur.execute("DELETE FROM BooksSeries WHERE BookId = ?", (book_id,))
    conn.commit()

def create_history(conn, history):
    """
    Create a new history into the History table
    :param conn:
    :param history:
    :return: history id
    """
    sql = '''
        INSERT INTO History(BookId, StartDate, EndDate) 
        VALUES(:BookId, :StartDate, :EndDate)
    '''
    cur = conn.cursor()
    cur.execute(sql, history)
    conn.commit()
    return cur.lastrowid    

## Fetch queries
def fetch_book(conn, book):
    """
    Query rows in the Books table for book
    :param conn: the Connection object
    :return: None
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM Books WHERE ISBN13 = ?", (book["ISBN13"],))
    return cur.fetchone()

def fetch_series(conn, series_name):
    """
    Query rows in the Series table for series
    :param conn: the Connection object
    :return: None
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM Series WHERE Name = ?", (series_name,))
    return cur.fetchone()

def fetch_history(conn, history):
    """
    Query rows in the History table for series
    :param conn: the Connection object
    :return: None
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM History WHERE BookId = ? AND StartDate = ?", (history["BookId"], history["StartDate"]))
    return cur.fetchone()

## Actions
def add_book_if_not_exists(book):
    database = os.getenv("DATABASE_PATH")
    conn = create_connection(database)

    with conn:
        # Check if book already exists
        existing_book = fetch_book(conn, book)
        
        if existing_book:
            existing_id = existing_book["Id"]
            printer.yellow(f"Book({existing_id}) already exists in database, continuing...")
            return existing_id
        else:
            # Create book entry as it doesn't exist
            book_id = create_book(conn, book)
            printer.green("Book added to database.")
            return book_id

def add_series_if_not_exists(series_name):
    if not series_name or not series_name.strip():
        return None

    series_name = series_name.strip()
    database = os.getenv("DATABASE_PATH")
    conn = create_connection(database)

    with conn:
        # Check if book already exists
        existing_series = fetch_series(conn, series_name)
        
        if existing_series:
            existing_id = existing_series["Id"]
            printer.yellow(f"Series({existing_id}) already exists in database, continuing...")
            return existing_id
        else:
            # Create series entry as it doesn't exist
            series_id = create_series(conn, series_name)
            printer.green("Series added to database.")
            return series_id

def update_book_series(book_id, series_id):
    database = os.getenv("DATABASE_PATH")
    conn = create_connection(database)

    with conn:
        # Clear existing BooksSeries
        delete_book_series(conn, book_id)
        
        if series_id:      
            # Create bookseries entry
            create_book_series(conn, book_id, series_id)
            printer.green("BooksSeries added to database.")
        else:
            printer.yellow("No series attached, continuing...")

def add_history_if_not_exists(history):
    database = os.getenv("DATABASE_PATH")
    conn = create_connection(database)

    with conn:
        # Check if history already exists
        existing_history = fetch_history(conn, history)
        
        if existing_history:
            existing_id = existing_history["Id"]
            printer.yellow(f"History({existing_id}) already exists in database, continuing...")
            return existing_id
        else:
            # Create history entry as it doesn't exist
            history_id = create_history(conn, history)
            printer.green("History added to database.")
            return history_id
