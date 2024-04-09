import sqlite3
import os

def create_connection(db_file):
    """
    Create a database connection to the SQLite database specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except IOError as e:
        print(e)

    return conn

def create_book(conn, book):
    """
    Create a new book into the books table
    :param conn:
    :param project:
    :return: project id
    """
    sql = '''
        INSERT INTO Books(Title, ISBN13, ISBN10, Author, Binding, Publisher, Published) 
        VALUES(:Title, :ISBN13, :ISBN10, :Author, :Binding, :Publisher, :Published)
    '''
    cur = conn.cursor()
    cur.execute(sql, book)
    conn.commit()
    return cur.lastrowid

def fetch_book(conn, book):
    """
    Query all rows in the book table
    :param conn: the Connection object
    :return: None
    """
    cur = conn.cursor()
    cur.execute("SELECT * FROM Books WHERE ISBN13 = ?", (book["ISBN13"],))
    return cur.fetchone()

def add_book_if_not_exists(book):
    database = os.getenv("DATABASE_PATH")
    conn = create_connection(database)

    with conn:
        # Check if book already exists
        existing_book = fetch_book(conn, book)
        
        if existing_book:
            print("Book already exists in database, continuing...")
        else:
            # Create book entry as it doesn't exist
            create_book(conn, book)
            print("Book added to database.")
