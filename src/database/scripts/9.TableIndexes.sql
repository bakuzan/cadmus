/* Data Tables */

CREATE UNIQUE INDEX IF NOT EXISTS "Books_Unique_Columns" ON "Books" ("Title","Author","Publisher","Published");
CREATE INDEX IF NOT EXISTS "Library_BookId_Index" ON "Library" ("BookId");
