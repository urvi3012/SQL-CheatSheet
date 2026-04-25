const data = [

{
title: "WINDOW FRAME (ROWS vs RANGE)",
category: "Window",
content: `
Concept:
Defines which rows are included in a window calculation.

Two types:
1. ROWS → based on physical row count
2. RANGE → based on value (time/numeric)

---

Input:
date        value
2020-05-01  10
2020-05-02  20
2020-05-03  30
2020-05-10  40

---

ROWS Example:
SUM(value) OVER (
  ORDER BY date
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)

Output:
date        sum
2020-05-01  10
2020-05-02  30
2020-05-03  60
2020-05-10  90   ← still includes 2 previous rows

---

RANGE Example:
SUM(value) OVER (
  ORDER BY date
  RANGE BETWEEN INTERVAL '2 days' PRECEDING AND CURRENT ROW
)

Output:
date        sum
2020-05-01  10
2020-05-02  30
2020-05-03  60
2020-05-10  40   ← gap removes older rows

---

When to use:
ROWS → fixed number of rows
RANGE → real time-based windows
`
},

{
title: "PRECEDING / FOLLOWING",
category: "Window",
content: `
Concept:
Defines direction of window relative to current row

---

Input:
date        value
2020-05-01  10
2020-05-02  20
2020-05-03  30
2020-05-04  40

---

1. PRECEDING (past)

ROWS BETWEEN 1 PRECEDING AND CURRENT ROW

Output:
10
30
50
70

Meaning:
current + previous row

---

2. FOLLOWING (future)

ROWS BETWEEN CURRENT ROW AND 1 FOLLOWING

Output:
30
50
70
40

Meaning:
current + next row

---

3. BOTH SIDES

ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING

Output:
30
60
90
70

Meaning:
previous + current + next

---

When to use:
PRECEDING → history
FOLLOWING → forecasting / forward window
`
},

{
title: "ROLLING COUNT vs ROW_NUMBER",
category: "Window",
content: `
Concept difference:

ROW_NUMBER:
- gives position
- keeps increasing

ROLLING COUNT:
- counts rows in window
- resets based on window

---

Input:
date
2020-05-01
2020-05-02
2020-05-03
2020-05-10

---

ROW_NUMBER:
1,2,3,4

---

ROLLING COUNT (last 2 rows):
1
2
3
3

---

Key:
ROW_NUMBER = position
ROLLING COUNT = recent activity

---

When to use:
ROW_NUMBER → ranking
ROLLING COUNT → density/frequency
`
},

{
title: "WINDOW WITH CONDITION",
category: "Window",
content: `
Concept:
Apply condition inside window aggregation

---

Input:
date        type    value
2020-05-01  order   10
2020-05-02  visit   5
2020-05-03  order   20

---

Query:
SUM(CASE WHEN type='order' THEN value END)
OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)

---

Output:
10
10
30

---

Key:
Window = all rows
Aggregation = only filtered rows

---

When to use:
filtered trends
`
},

{
title: "NTILE vs PERCENTILE",
category: "Window",
content: `
Concept difference:

NTILE:
- splits rows evenly

PERCENTILE_CONT:
- gives value threshold

---

Input:
10,20,30,40,50

---

NTILE(5):
1,2,3,4,5

---

PERCENTILE_CONT(0.2):
~18

---

Key:
NTILE → bucket
PERCENTILE → cutoff value

---

When to use:
NTILE → top/bottom %
PERCENTILE → threshold filtering
`
},

{
title: "LAG / LEAD (with default)",
category: "Window",
content: `
Concept:
Access previous or next row

---

Syntax:
LAG(col, 1, default)
LEAD(col, 1, default)

---

Input:
value
10
20
30

---

Output:
value prev next
10    0    20
20    10   30
30    20   0

---

When to use:
time comparison, diff calculation
`
},

{
title: "DATE FORMATTING (TO_CHAR)",
category: "Date",
content: `
Concept:
Convert timestamp to readable format

---

Input:
2020-05-01 14:35:20

---

Formats:

YYYY → 2020
MM → 05
Mon → May
DD → 01
Day → Friday
HH24 → 14
HH12 → 02
MI → 35
SS → 20

---

Examples:

TO_CHAR(ts,'YYYY-MM-DD')
→ 2020-05-01

TO_CHAR(ts,'Mon YYYY')
→ May 2020

TO_CHAR(ts,'Day, DD Mon YYYY')
→ Friday, 01 May 2020

---

When to use:
reporting / dashboards
`
},

{
title: "EPOCH",
category: "Date",
content: `
Concept:
Convert time difference to seconds

---

Example:
2020-05-02 - 2020-05-01

Query:
EXTRACT(EPOCH FROM (t2 - t1))

Output:
86400

---

When to use:
time difference calculations
`
},

{
title: "ARRAY_AGG",
category: "Functions",
content: `
Concept:
Group values into array

---

Example:
user_id orders
1       [101,102,103]

---

When to use:
list aggregation
`
},

{
title: "PIVOT (CASE WHEN)",
category: "Aggregation",
content: `
Concept:
Convert rows → columns

---

Query:
SUM(CASE WHEN risk='Low' THEN 1 END)

---

Output:
type   low high total
A      10  5    15

---

When to use:
reporting, dashboards
`
}

];
