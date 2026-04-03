CREATE TABLE IF NOT EXISTS "UnreadShortlist" (
  "Id"          INTEGER NOT NULL UNIQUE,
  "BookId"      INTEGER NOT NULL UNIQUE, 
  "Position"    INTEGER NULL, 
  PRIMARY KEY("Id" AUTOINCREMENT),
  FOREIGN KEY("BookId")       REFERENCES "Books"("Id")
);
