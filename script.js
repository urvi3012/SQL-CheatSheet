const data = [

{
title: "SELECT",
content: `
Concept: retrieve data
Syntax:
SELECT col1, col2 FROM table

Expected Output:
subset of columns/rows

When to use:
every query
`
},

{
title: "WHERE",
content: `
Concept: filter rows
Syntax:
SELECT * FROM table WHERE condition

Expected Output:
filtered rows

When to use:
apply conditions before aggregation
`
},

{
title: "GROUP BY",
content: `
Concept: aggregate per group
Syntax:
SELECT col, SUM(x) FROM table GROUP BY col

Expected Output:
one row per group

When to use:
metrics per entity
`
},

{
title: "HAVING",
content: `
Concept: filter aggregated data
Syntax:
GROUP BY col HAVING SUM(x) > 100

Expected Output:
filtered groups

When to use:
post aggregation filtering
`
},

{
title: "CASE WHEN",
content: `
Concept: conditional logic
Syntax:
CASE WHEN cond THEN val ELSE val END

Expected Output:
derived column

When to use:
classification, flags
`
},

{
title: "JOINS",
content: `
INNER JOIN:
FROM t1 JOIN t2 ON t1.id = t2.id

LEFT JOIN:
FROM t1 LEFT JOIN t2 ON ...

Expected Output:
combined tables

When to use:
merge datasets
`
},

{
title: "CROSS JOIN",
content: `
Concept: attach single-row result
Syntax:
FROM t1 CROSS JOIN t2

Expected Output:
all combinations

When to use:
attach threshold or constants
`
},

{
title: "CTE",
content: `
Concept: modular query
Syntax:
WITH cte AS (SELECT ...) SELECT * FROM cte

Expected Output:
intermediate reusable table

When to use:
multi-step queries
`
},

{
title: "ROW_NUMBER",
content: `
Concept: row position

Syntax:
ROW_NUMBER() OVER (ORDER BY col)

Example:
date        row_number
2020-05-01  1
2020-05-02  2
2020-05-10  3

When to use:
deduplication, ranking
`
},

{
title: "LAG / LEAD",
content: `
Concept: previous / next row

Syntax:
LAG(col, 1, 0) OVER (ORDER BY date)
LEAD(col, 1, 0) OVER (ORDER BY date)

Example:
date        value prev next
2020-05-01  10    0    20
2020-05-02  20    10   30
2020-05-03  30    20   0

When to use:
comparisons, deltas
`
},

{
title: "ROLLING COUNT (ROWS)",
content: `
Concept: count rows in recent window

Syntax:
COUNT(*) OVER (
  ORDER BY date
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)

Example:
date        rolling_count
2020-05-01  1
2020-05-02  2
2020-05-03  3
2020-05-10  3
2020-05-11  3

Key Point:
ROWS = fixed row window, ignores time gaps

When to use:
activity density
`
},

{
title: "ROLLING SUM / AVG",
content: `
Concept: rolling metric

Syntax:
SUM(x) OVER (
  ORDER BY date
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)

Expected Output:
sum of last rows

When to use:
trend analysis
`
},

{
title: "RANGE WINDOW (TIME BASED)",
content: `
Concept: time-based window

Syntax:
SUM(x) OVER (
  ORDER BY date
  RANGE BETWEEN INTERVAL '2 days' PRECEDING AND CURRENT ROW
)

Expected Output:
values in time range

Key Point:
RANGE respects time gaps

When to use:
irregular timestamps
`
},

{
title: "WINDOW WITH CONDITION (EVENT BASED)",
content: `
Concept: conditional rolling metric

Syntax:
SUM(CASE WHEN cond THEN x END)
OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)

Example:
date        type   value rolling_order_sum
2020-05-01  order  10    10
2020-05-02  visit  5     10
2020-05-03  order  20    30
2020-05-04  visit  7     20
2020-05-05  order  15    35

Key Point:
window = all rows
aggregation = conditional

When to use:
filtered trends
`
},

{
title: "NTILE",
content: `
Concept: equal buckets

Syntax:
NTILE(50) OVER (ORDER BY col)

Example:
value bucket
10    1
20    2
30    3
40    4
50    5

When to use:
top/bottom % rows
`
},

{
title: "PERCENTILE_CONT",
content: `
Concept: value threshold

Syntax:
PERCENTILE_CONT(0.2)
WITHIN GROUP (ORDER BY col)

Example:
values: 10,20,30,40,50
p20 ≈ 18

When to use:
cutoff filtering

Difference:
NTILE → splits rows
PERCENTILE → gives value
`
},

{
title: "ARRAY",
content: `
Concept: store multiple values

Syntax:
ARRAY_AGG(col)

Example:
user_id orders
1       [101,102,103]

When to use:
group into lists
`
},

{
title: "CONCAT",
content: `
Concept: combine strings

Syntax:
CONCAT(col1, col2)
or col1 || col2

Example:
John + Doe → John Doe

When to use:
format output
`
},

{
title: "DATE FORMAT (TO_CHAR)",
content: `
Concept: format timestamp

Syntax:
TO_CHAR(ts, 'YYYY-MM-DD')

Example:
May 2020

When to use:
reporting
`
},

{
title: "EPOCH",
content: `
Concept: seconds since 1970

Syntax:
EXTRACT(EPOCH FROM ts)

Example:
1 day → 86400

When to use:
time difference
`
},

{
title: "PIVOT (CASE WHEN)",
content: `
Concept: convert rows to columns

Syntax:
SUM(CASE WHEN cond THEN 1 ELSE 0 END)

Example:
inspection_type  no low medium high total
Routine          10 20  15     5    50

When to use:
category breakdown
`
},

{
title: "CONDITIONAL AGGREGATION",
content: `
Concept: filtered counts

Syntax:
SUM(CASE WHEN cond THEN 1 ELSE 0 END)

Expected Output:
count per condition

When to use:
ratios, KPIs
`
},

{
title: "RATIO",
content: `
Concept: percentage

Syntax:
SUM(flag)*1.0 / COUNT(*)

Expected Output:
decimal

When to use:
metrics
`
},

{
title: "CORE DIFFERENCES",
content: `
ROWS → fixed row window
RANGE → time-based window
NTILE → equal row buckets
PERCENTILE → threshold value
ROW_NUMBER → position
ROLLING COUNT → recent activity
`
}

];
