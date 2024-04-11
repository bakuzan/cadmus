CREATE TABLE IF NOT EXISTS "Books" (
	"Id"	        	INTEGER NOT NULL UNIQUE,
	"Title"				TEXT NOT NULL,
	"ISBN13"			TEXT NOT NULL,
	"ISBN10"			TEXT NOT NULL,
	"Author"			TEXT NOT NULL,
	"Binding"			TEXT NOT NULL,
	"Publisher"			TEXT NULL,
	"Published"			TEXT NULL,
	PRIMARY KEY("Id" AUTOINCREMENT),
	UNIQUE("Title","Author","Publisher","Published")
);
