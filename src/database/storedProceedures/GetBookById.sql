   SELECT B.*
        , L.Id LibraryId
     FROM Books B
LEFT JOIN Library L ON B.Id = L.BookId
    WHERE B.Id = ?
