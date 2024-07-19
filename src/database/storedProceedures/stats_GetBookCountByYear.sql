WITH
    DAYS_CTE AS (
        SELECT
            strftime ('%Y', H.StartDate) 'Year'
          , ROUND(
                julianday (COALESCE(H.EndDate, 'now')) - julianday (H.StartDate)
            ) 'Days'
        FROM
            History H
        ORDER BY
            strftime ('%Y', H.StartDate) DESC
    )
SELECT
    D.Year 'Year'
  , COUNT(*) 'Total'
  , ROUND(AVG(D.Days)) 'AverageDays'
FROM
    DAYS_CTE D
GROUP BY
    D.Year
ORDER BY
    D.Year DESC