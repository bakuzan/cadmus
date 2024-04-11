CREATE TABLE IF NOT EXISTS "History" (
	"Id"	        	INTEGER NOT NULL UNIQUE,
	"BookId"			INTEGER NOT NULL,
    "StartDate"         DATE NOT NULL,
    "EndDate"           DATE NULL,
	PRIMARY KEY("Id" AUTOINCREMENT),
    FOREIGN KEY("BookId") REFERENCES "Books"("Id"),
	UNIQUE("BookId","StartDate")
);
