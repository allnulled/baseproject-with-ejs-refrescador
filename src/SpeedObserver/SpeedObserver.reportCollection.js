function(testResults, totalMs) {
  const rows = [];
  Iterating_collections:
  for (let index = 0; index < testResults.length; index++) {
    const testInfo = testResults[index];
    const { title, tests } = testInfo;
    Iterating_files:
    for (let indexFile = 0; indexFile < tests.length; indexFile++) {
      const test = tests[indexFile];
      const { op, status, ms } = test;
      rows.push([
        SpeedObserver.colors.style("bold,white").text(`   ⏳ ${ms}ms `),
        SpeedObserver.colors.style(status === "ok" ? "greenBright" : "underline,red").text(status),
        SpeedObserver.colors.style(status === "ok" ? "italic,greenBright" : "red,underline").text(op),
        SpeedObserver.colors.style("magenta").text(((ms / totalMs) * 100).toFixed(2) + "% of " + totalMs + "ms"),
      ]);
    }
  }
  console.log(SpeedObserver.colors.style("cyan").text(" 🔻⏳📐 Test performance metrics:"));
  console.log(SpeedObserver.colors.borderlessTable([
    // [{ colSpan: 4, content: "Times" }]
    ["   ⏳ Time", "Status", "File", "Duration"],
  ].concat(rows), {
    style: {
      border: ["yellow"],
      head: ["white","bold"],
    }
  }));
}