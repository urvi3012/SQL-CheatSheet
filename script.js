const container = document.getElementById("container");

const data = [
{
title: "ROLLING COUNT",

concept: "Counts rows in sliding window",

syntax: `
COUNT(*) OVER (
 ORDER BY date
 ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)
`,

input: `
date        value
2020-05-01  10
2020-05-02  20
2020-05-03  30
2020-05-10  40
`,

query: `
SELECT date,
COUNT(*) OVER (
 ORDER BY date
 ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
)
FROM t
`,

output: `
1
2
3
3
`,

explanation: `
Always takes current + 2 previous rows.
Ignores date gaps.
`,

when: `
Use for recent activity by row count
`
},

{
title: "PRECEDING / FOLLOWING",

concept: "Controls window direction",

syntax: `
ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
ROWS BETWEEN CURRENT ROW AND 1 FOLLOWING
`,

input: `
10,20,30,40
`,

query: `
SUM(value) OVER (
 ORDER BY value
 ROWS BETWEEN 1 PRECEDING AND CURRENT ROW
)
`,

output: `
10
30
50
70
`,

explanation: `
PRECEDING = previous rows
FOLLOWING = next rows
`,

when: `
Use for forward/backward analysis
`
},

{
title: "TO_CHAR",

concept: "Format timestamps",

syntax: `
TO_CHAR(ts, 'YYYY-MM-DD')
`,

input: `
2020-05-01 14:35:20
`,

query: `
SELECT TO_CHAR(ts, 'DD Mon YYYY')
`,

output: `
01 May 2020
`,

explanation: `
Formatting converts timestamp to readable string
`,

when: `
Use in reporting
`
},

{
title: "EPOCH",

concept: "Convert time to seconds",

syntax: `
EXTRACT(EPOCH FROM ts)
`,

input: `
2020-05-02 - 2020-05-01
`,

query: `
SELECT EXTRACT(EPOCH FROM diff)
`,

output: `
86400
`,

explanation: `
1 day = 86400 seconds
`,

when: `
Use for time differences
`
}
];

function render() {
  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${item.title}</h2>

      <b>Concept:</b><pre>${item.concept}</pre>
      <b>Syntax:</b><pre>${item.syntax}</pre>
      <b>Input:</b><pre>${item.input}</pre>
      <b>Query:</b><pre>${item.query}</pre>
      <b>Output:</b><pre>${item.output}</pre>
      <b>Explanation:</b><pre>${item.explanation}</pre>
      <b>When to use:</b><pre>${item.when}</pre>
    `;

    container.appendChild(card);
  });
}

render();
