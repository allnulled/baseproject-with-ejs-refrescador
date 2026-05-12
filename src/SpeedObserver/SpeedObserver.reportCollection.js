function(testResults) {
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
        SpeedObserver.colors.style("italic,white").text(` ⏳ ${ms} ms `),
        status,
        SpeedObserver.colors.style("italic,magenta").text(op),
      ]);
    }
    console.log(SpeedObserver.colors.table([
      // ["Time", "Status", "File"]
    ].concat(cols), {
      head: [{ colSpan: 3, content: title}],
      style: {
        border: ["yellow"],
        head: ["white","bold"],
      }
    }));
  }
}