   INSERT INTO Library (BookId)
   SELECT B.Id
     FROM Books B
LEFT JOIN Library L	ON B.Id = L.BookId
 WHERE L.Id IS NULL
   AND B.ISBN13 NOT IN (
	'9780140440799', -- Karamazov
	'9780140449242',
	'9780460003353', -- Faust
	'9780140449099'  -- Don Quixote
	)