CREATE TABLE IF NOT EXISTS "BooksMeta" (
    "BookId"        INTEGER NOT NULL UNIQUE,  
    "BookCount"     INTEGER     NULL, 
    FOREIGN KEY("BookId")       REFERENCES "Books"("Id")
);