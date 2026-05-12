function(testResults, totalMs) {
  Iterating_collections:
  for (let index = 0; index < testResults.length; index++) {
    const testInfo = testResults[index];
    const { title, tests } = testInfo;
    const cols = [];
    Iterating_files:
    for (let indexFile = 0; indexFile < tests.length; indexFile++) {
      const test = tests[indexFile];
      const { op, status, ms } = test;
      cols.push([
        SpeedObserver.colors.style("bold,white").text(` ⏳ ${ms}ms `),
        SpeedObserver.colors.style(status === "ok" ? "greenBright" : "underline,redBright").text(status),
        SpeedObserver.colors.style(status === "ok" ? "italic,greenBright" : "underline,italic,bold,red").text(op),
        SpeedObserver.colors.style("magenta,underline").text(((ms / totalMs) * 100).toFixed(2) + "% of " + totalMs + "ms"),
      ]);
    }
    console.log(SpeedObserver.colors.table([
      // ["Time", "Status", "File"]
    ].concat(cols), {
      head: [{ colSpan: 4, content: title}],
      style: {
        border: ["yellow"],
        head: ["white","bold"],
      }
    }));
  }
}