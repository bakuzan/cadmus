SELECT
    B.*
  , L.Id LibraryId
  , S.SeriesId
FROM
    Books B
    LEFT JOIN Library L ON B.Id = L.BookId
    LEFT JOIN BooksSeries S ON B.Id = S.BookId
WHERE
    B.Id = ?