WITH
    YearsAgo_CTE AS (
        SELECT
            H.BookId
          , B.Title
          , B.Author
          , MAX(H.StartDate) StartDate
          , MAX(H.EndDate) EndDate
          , strftime ('%Y', 'now') - strftime ('%Y', MAX(H.StartDate)) YearsAgo
          , CASE
                WHEN strftime ('%m-%d', MAX(H.StartDate)) <= strftime ('%m-%d', 'now')
                AND strftime ('%m-%d', MAX(H.EndDate)) >= strftime ('%m-%d', 'now') THEN 1
                ELSE 0
            END IsExact
        FROM
            History H
            JOIN Books B ON H.BookId = B.Id
        GROUP BY
            H.BookId
    )
SELECT
    *
FROM
    YearsAgo_CTE
WHERE
    YearsAgo >= 3
    OR (
        YearsAgo <> 0
        AND IsExact = 1
    )
ORDER BY
    IsExact DESC
  , YearsAgo DESC