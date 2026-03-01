SELECT
    H.Id HistoryId,
    H.BookId,
    B.Title,
    H.StartDate,
    H.EndDate,
    COALESCE(M.BookCount, 1) AS BookCount
FROM History H
JOIN Books B ON H.BookId = B.Id
LEFT JOIN BooksMeta M ON H.BookId = M.BookId;
