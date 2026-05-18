module.exports = {
  buildTargets: [
    ["src/Colors/Colors.entry.js", "dist/colors.dist.js"],
    ["src/ModulerV3/ModulerV3.entry.js", "dist/moduler-v3.dist.js"],
    ["src/SpeedObserver/SpeedObserver.entry.js", "dist/speed-observer.dist.js"],
    ["src/PathLocator/PathLocator.entry.js", "dist/path-locator.dist.js"],
    ["src/LooperCli/LooperCli.entry.js", "dist/looper-cli.dist.js"],
  ],
  exportations: {
    "dist/moduler-v3.dist.js": ["test/browser/lib/moduler-v3.dist.js"],
    "dist/path-locator.dist.js": ["test/browser/lib/path-locator.dist.js"],
    "dist/speed-observer.dist.js": ["test/browser/lib/speed-observer.dist.js"],
    // Por si los eliminas o dejas de compilarlos, para que test no pete porque los usa
  },
  testsSelectors: [
    "!*", // todos los tests
    // Por si quieres ignorar:
    "!performance-metrics",
    "bundler",
    "moduler-v3",
    "path-locator",
    "looper-cli"
  ],
  isTracing: !true,
  beautifyDist: true,
  makeCoverage: !true,
  showPerformanceMetrics: !true,
  showTestProgress: !true,
  
  nycOptions: {
    exclude: [
      //*
      // "**" + "/colors.dist.js",
      // "**" + "/speed-observer.dist.js",
      // "**" + "/path-locator.dist.js",
      // "**" + "/looper-cli.dist.js",
      // "**" + "/moduler-v3.dist.js",
      //*/
    ]
  }
};