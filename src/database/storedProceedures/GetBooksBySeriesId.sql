SELECT B.*
  FROM Books B
  JOIN BooksSeries S ON B.Id = S.BookId
 WHERE S.SeriesId = ?