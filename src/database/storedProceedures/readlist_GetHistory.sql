WITH Prep AS (
    SELECT
        H.Id AS HistoryId,
        H.StartDate,
        H.EndDate,
        H.BookId,

        B.ISBN13,
        B.Title,
        B.Author,

        S.Name AS SeriesName,

        -- nth read of this book
        (
            SELECT COUNT(*)
            FROM History H2
            WHERE H2.BookId = H.BookId
              AND H2.StartDate <= H.StartDate
        ) AS ReadNumber
    FROM History H
    JOIN Books B ON H.BookId = B.Id
    LEFT JOIN BooksSeries BS ON B.Id = BS.BookId
    LEFT JOIN Series S ON BS.SeriesId = S.Id
),

Ongoing AS (
    SELECT *
      FROM Prep
     WHERE EndDate IS NULL
     ORDER BY StartDate DESC     
),

Completed AS (
    SELECT *
      FROM Prep
     WHERE EndDate IS NOT NULL
     ORDER BY StartDate DESC, EndDate DESC
     LIMIT :limit
)

SELECT * FROM Ongoing
UNION ALL
SELECT * FROM Completed;
