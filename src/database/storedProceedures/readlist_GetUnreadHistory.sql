SELECT
    0       AS HistoryId,
    ''      AS StartDate,
    NULL    AS EndDate,
    B.Id    AS BookId,

    B.ISBN13,
    B.Title,
    B.Author,

    S.Name  AS SeriesName,
    0       AS ReadNumber,
    U.Id    AS ShortlistId
FROM Books B
LEFT JOIN History H ON H.BookId = B.Id
LEFT JOIN BooksSeries BS ON B.Id = BS.BookId
LEFT JOIN Series S ON BS.SeriesId = S.Id
LEFT JOIN UnreadShortlist U ON U.BookId = B.Id
WHERE H.Id IS NULL
ORDER BY 
    CASE WHEN U.Position IS NULL THEN 1 ELSE 0 END,
    U.Position ASC,
    B.Id ASC;