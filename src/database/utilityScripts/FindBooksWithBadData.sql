SELECT *
  FROM Books
 WHERE Title 		LIKE '%:>%'
    OR Author 		LIKE '%:>%'
	OR Publisher 	LIKE '%:>%'
	OR Published 	LIKE '%:>%'