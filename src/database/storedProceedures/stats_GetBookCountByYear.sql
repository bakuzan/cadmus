SELECT strftime('%Y', H.StartDate) Year
	  , COUNT(*) 'Total'
  FROM History H
 GROUP BY strftime('%Y', H.StartDate)
 ORDER BY strftime('%Y', H.StartDate) DESC