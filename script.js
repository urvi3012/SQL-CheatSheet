const data = [

{ title: "SELECT", category: "Basics", content: `
Concept: retrieve data
Syntax:
SELECT col1, col2 FROM table
`},

{ title: "WHERE", category: "Basics", content: `
Concept: filter rows
Syntax:
SELECT * FROM table WHERE condition
`},

{ title: "GROUP BY", category: "Aggregation", content: `
Concept: aggregate per group
Syntax:
SELECT col, SUM(x) FROM table GROUP BY col
`},

{ title: "HAVING", category: "Aggregation", content: `
Concept: filter aggregated data
Syntax:
GROUP BY col HAVING SUM(x) > 100
`},

{ title: "CASE WHEN", category: "Aggregation", content: `
Concept: conditional logic
Syntax:
CASE WHEN cond THEN val ELSE val END
`},

{ title: "JOINS", category: "Joins", content: `
INNER JOIN:
FROM t1 JOIN t2 ON t1.id = t2.id

LEFT JOIN:
FROM t1 LEFT JOIN t2 ON ...
`},

{ title: "CROSS JOIN", category: "Joins", content: `
Concept: attach single-row result
Syntax:
FROM t1 CROSS JOIN t2
`},

{ title: "CTE", category: "Basics", content: `
Concept: modular query
Syntax:
WITH cte AS (SELECT ...) SELECT * FROM cte
`},

{ title: "ROW_NUMBER", category: "Window", content: `
ROW_NUMBER() OVER (ORDER BY col)

Example:
2020-05-01 → 1
2020-05-02 → 2
`},

{ title: "LAG / LEAD", category: "Window", content: `
LAG(col, 1, 0) OVER (ORDER BY date)
LEAD(col, 1, 0) OVER (ORDER BY date)
`},

{ title: "ROLLING COUNT", category: "Window", content: `
COUNT(*) OVER (
  ORDER BY date
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)

Key:
ROWS = fixed row window
`},

{ title: "ROLLING SUM / AVG", category: "Window", content: `
SUM(x) OVER (
  ORDER BY date
  ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)
`},

{ title: "RANGE WINDOW", category: "Window", content: `
SUM(x) OVER (
  ORDER BY date
  RANGE BETWEEN INTERVAL '2 days' PRECEDING AND CURRENT ROW
)

Key:
RANGE = time-based window
`},

{ title: "WINDOW WITH CONDITION", category: "Window", content: `
SUM(CASE WHEN cond THEN x END)
OVER (ORDER BY date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
`},

{ title: "NTILE", category: "Window", content: `
NTILE(50) OVER (ORDER BY col)
`},

{ title: "PERCENTILE_CONT", category: "Window", content: `
PERCENTILE_CONT(0.2)
WITHIN GROUP (ORDER BY col)
`},

{ title: "ARRAY_AGG", category: "Functions", content: `
ARRAY_AGG(col)

Example:
[101,102,103]
`},

{ title: "CONCAT", category: "Functions", content: `
CONCAT(col1, col2)
or col1 || col2
`},

{ title: "TO_CHAR (DATE FORMAT)", category: "Date", content: `
TO_CHAR(ts, 'YYYY-MM-DD')
`},

{ title: "EPOCH", category: "Date", content: `
EXTRACT(EPOCH FROM ts)
`},

{ title: "PIVOT (CASE)", category: "Aggregation", content: `
SUM(CASE WHEN risk_category = 'Low Risk' THEN 1 ELSE 0 END)
`},

{ title: "CONDITIONAL AGGREGATION", category: "Aggregation", content: `
SUM(CASE WHEN cond THEN 1 ELSE 0 END)
`},

{ title: "RATIO", category: "Aggregation", content: `
SUM(flag)*1.0 / COUNT(*)
`},

{ title: "CORE DIFFERENCES", category: "Concepts", content: `
ROWS → fixed rows
RANGE → time-based
NTILE → buckets
PERCENTILE → threshold
ROW_NUMBER → position
ROLLING COUNT → recent activity
`}
];

const container = document.getElementById("container");
const search = document.getElementById("search");
const filtersDiv = document.getElementById("filters");
const toggleTheme = document.getElementById("toggleTheme");

let activeCategory = "All";

const categories = ["All", ...new Set(data.map(d => d.category))];

categories.forEach(cat => {
  const btn = document.createElement("button");
  btn.textContent = cat;
  btn.className = "filter-btn";
  if (cat === "All") btn.classList.add("active");

  btn.onclick = () => {
    activeCategory = cat;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render();
  };

  filtersDiv.appendChild(btn);
});

function render() {
  const val = search.value.toLowerCase();

  const filtered = data.filter(d =>
    (activeCategory === "All" || d.category === activeCategory) &&
    (d.title.toLowerCase().includes(val) ||
     d.content.toLowerCase().includes(val))
  );

  container.innerHTML = "";

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = `${item.title} (${item.category})`;

    const content = document.createElement("div");
    content.className = "content";

    const code = document.createElement("code");
    code.textContent = item.content;

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy";
    copyBtn.className = "copy-btn";

    copyBtn.onclick = () => {
      navigator.clipboard.writeText(item.content);
      copyBtn.textContent = "Copied!";
      setTimeout(() => copyBtn.textContent = "Copy", 1000);
    };

    content.appendChild(code);
    content.appendChild(copyBtn);

    title.onclick = () => {
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    };

    card.appendChild(title);
    card.appendChild(content);
    container.appendChild(card);
  });
}

search.addEventListener("input", render);

toggleTheme.onclick = () => {
  document.body.classList.toggle("dark");
};

render();
