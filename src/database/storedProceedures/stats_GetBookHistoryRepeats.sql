SELECT
    H.Id AS HistoryId,
    H.StartDate,
    H.EndDate,
    H.BookId,
    
    B.Title,
    B.Author,
    S.Name AS SeriesName,
    L.Id LibraryId
FROM History H
JOIN 
    (
        SELECT BookId
          FROM History
         GROUP BY BookId
        HAVING COUNT(*) >= 2
    ) dup ON dup.BookId = H.BookId
JOIN Books B ON H.BookId = B.Id
LEFT JOIN BooksSeries BS ON B.Id = BS.BookId
LEFT JOIN Series S ON BS.SeriesId = S.Id
LEFT JOIN Library L ON B.Id = L.BookId
ORDER BY H.StartDate DESC;