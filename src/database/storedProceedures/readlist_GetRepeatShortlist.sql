WITH Latest AS (
  SELECT
    H.Id            AS HistoryId,
    H.StartDate,
    H.EndDate,
    H.BookId,
    B.ISBN13,
    B.Title,
    B.Author,
    S.Name          AS SeriesName,
    ROW_NUMBER() OVER (PARTITION BY H.BookId 
                           ORDER BY H.EndDate DESC, 
                                    H.Id DESC) AS RN,
    COUNT(*) OVER (PARTITION BY H.BookId 
                       ORDER BY H.EndDate ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS ReadNumber
  FROM History H
  JOIN Books B ON B.Id = H.BookId
  LEFT JOIN BooksSeries BS ON B.Id = BS.BookId
  LEFT JOIN Series S ON BS.SeriesId = S.Id
)
SELECT
  L.HistoryId,
  L.StartDate,
  L.EndDate,
  RS.BookId,
  L.ISBN13,
  L.Title,
  L.Author,
  L.SeriesName,
  L.ReadNumber,
  RS.Id AS RepeatShortlistId
FROM RepeatShortlist RS
JOIN Latest L ON L.BookId = RS.BookId AND L.RN = 1
ORDER BY
  CASE WHEN RS.Position IS NOT NULL THEN 0 ELSE 1 END,
  RS.Position ASC,
  L.EndDate ASC;
