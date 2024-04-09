from dotenv import load_dotenv
import os

def setup():
    load_dotenv()
    print("USING DATABASE_PATH", os.getenv("DATABASE_PATH"))