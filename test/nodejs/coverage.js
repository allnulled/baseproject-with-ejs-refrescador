const fs = require("fs");
const coverageLib = require("istanbul-lib-coverage");
const reportLib = require("istanbul-lib-report");
const reports = require("istanbul-reports");

module.exports = (async function(settings) {
  try {
    fs.mkdirSync(".nyc_output", { recursive: true });
  } catch (error) {}
  await fs.promises.writeFile(".nyc_output/out.json",JSON.stringify(global.__coverage__ || {}, null, 2),"utf8");
  const rawCoverage = JSON.parse(fs.readFileSync(".nyc_output/out.json", "utf8"));
  const coverageMap = coverageLib.createCoverageMap(rawCoverage);
  const context = reportLib.createContext({ dir: "dev/coverage", coverageMap });
  reports.create("html").execute(context);
  reports.create("text").execute(context);
})();