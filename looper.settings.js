module.exports = {
  buildTargets: [
    // ["src/Colors/Colors.entry.js", "dist/colors.dist.js"],
    ["src/ModulerV3/ModulerV3.entry.js", "dist/moduler-v3.dist.js"],
    // ["src/SpeedObserver/SpeedObserver.entry.js", "dist/speed-observer.dist.js"],
    // ["src/PathLocator/PathLocator.entry.js", "dist/path-locator.dist.js"],
    // ["src/LooperCli/LooperCli.entry.js", "dist/looper-cli.dist.js"],
  ],
  testsSelectors: [
    "!*", // todos los tests
    // Por si quieres ignorar:
    "!performance-metrics",
    "moduler-v3",
    "!path-locator",
    "!looper-cli"
  ],
  buildExporter: function(entry, { DevUtils }) {
    const filenameSrc = require("path").basename(entry);
    const filenameDst = filenameSrc.substr(0,1).toLowerCase() + (filenameSrc.substr(1).replace(/\.entry\.js$/g, "").replace(/[A-Z]/g, match => "-" + match.toLowerCase())) + ".dist.js";
    const dist = require("path").resolve(DevUtils.projectRoot, "dist", filenameDst);
    return dist;
  },
  beautifyDist: true,
  makeCoverage: !true,
  showPerformanceMetrics: true,
  nycOptions: {
    exclude: [
      "**/colors.dist.js",
      "**/speed-observer.dist.js",
      "**/path-locator.dist.js",
    ]
  },
};