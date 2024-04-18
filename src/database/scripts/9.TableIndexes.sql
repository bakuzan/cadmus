/* Data Tables */

CREATE UNIQUE INDEX IF NOT EXISTS "Books_ISBN13_Index" ON "Books" ("ISBN13");
CREATE UNIQUE INDEX IF NOT EXISTS "Books_ISBN10_Index" ON "Books" ("ISBN10");
CREATE UNIQUE INDEX IF NOT EXISTS "Books_Unique_Columns" ON "Books" ("Title","Author","Publisher","Published");

CREATE INDEX IF NOT EXISTS "Library_BookId_Index" ON "Library" ("BookId");

CREATE UNIQUE INDEX IF NOT EXISTS "History_Unique_Columns" ON "History" ("BookId","StartDate");
CREATE INDEX IF NOT EXISTS "History_BookId_Index" ON "History" ("BookId");

CREATE UNIQUE INDEX IF NOT EXISTS "Series_Unique_Columns" ON "Series" ("Name");

CREATE UNIQUE INDEX IF NOT EXISTS "BooksSeries_Unique_Columns" ON "BooksSeries" ("BookId","SeriesId");
CREATE INDEX IF NOT EXISTS "BooksSeries_BookId_Index" ON "BooksSeries" ("BookId");
CREATE INDEX IF NOT EXISTS "BooksSeries_SeriesId_Index" ON "BooksSeries" ("SeriesId");