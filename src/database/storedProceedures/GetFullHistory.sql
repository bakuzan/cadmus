SELECT
    H.Id HistoryId
  , H.StartDate
  , H.EndDate
  , H.BookId
  , B.ISBN13 -- Required to load image

  , B.Title
  , B.Author
  , S.Name SeriesName
  , COALESCE(M.BookCount, 1) AS "BookCount"
FROM
    History H
    JOIN Books B ON H.BookId = B.Id
    LEFT JOIN BooksSeries BS ON B.Id = BS.BookId
    LEFT JOIN Series S ON BS.SeriesId = S.Id
    LEFT JOIN BooksMeta M ON B.Id = M.BookId
ORDER BY
    CASE
        WHEN EndDate IS NULL THEN 0
        ELSE 1
    END
  , StartDate DESC
  , EndDate DESC