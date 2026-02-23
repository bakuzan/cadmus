WITH
    DAYS_CTE AS (
        SELECT
            strftime('%Y', H.StartDate) AS Year,
            ROUND(julianday(COALESCE(H.EndDate, 'now')) - julianday(H.StartDate)) AS Days,
            COALESCE(M.BookCount, 1) AS BookCount
        FROM
            History H
            LEFT JOIN BooksMeta M ON M.BookId = H.BookId
        ORDER BY
            strftime('%Y', H.StartDate) DESC
    )
SELECT
    D.Year AS Year,
    SUM(D.BookCount) AS Total,
    ROUND(
        SUM(D.Days) * 1.0
        / SUM(D.BookCount)
    ) AS AverageDays
FROM
    DAYS_CTE D
GROUP BY
    D.Year
ORDER BY
    D.Year DESC;
