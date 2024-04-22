CREATE TABLE IF NOT EXISTS "BooksSeries" (
    "BookId"        INTEGER NOT NULL UNIQUE,  
    "SeriesId"      INTEGER NOT NULL, 
    FOREIGN KEY("BookId")       REFERENCES "Books"("Id"),
    FOREIGN KEY("SeriesId")     REFERENCES "Series"("Id")
);