SELECT
    B.*
  , L.Id LibraryId
  , S.SeriesId
  , COALESCE(M.BookCount, 1) AS "BookCount"
  , RS.Id AS "RepeatShortlistId"
FROM
    Books B
    LEFT JOIN Library L ON B.Id = L.BookId
    LEFT JOIN BooksSeries S ON B.Id = S.BookId
    LEFT JOIN BooksMeta M ON B.Id = M.BookId
    LEFT JOIN RepeatShortlist RS ON B.Id = RS.BookId
WHERE
    B.Id = ?