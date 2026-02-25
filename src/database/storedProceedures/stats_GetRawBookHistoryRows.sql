SELECT
    H.BookId,
    H.StartDate,
    H.EndDate,
    COALESCE(M.BookCount, 1) AS BookCount
FROM History H
LEFT JOIN BooksMeta M ON H.BookId = M.BookId;
