SELECT
    0       AS HistoryId,
    ''      AS StartDate,
    NULL    AS EndDate,
    B.Id    AS BookId,

    B.ISBN13,
    B.Title,
    B.Author,

    S.Name  AS SeriesName,
    0       AS ReadNumber
FROM Books B
LEFT JOIN History H ON H.BookId = B.Id
LEFT JOIN BooksSeries BS ON B.Id = BS.BookId
LEFT JOIN Series S ON BS.SeriesId = S.Id
WHERE H.Id IS NULL
ORDER BY B.Id ASC
LIMIT :limit;