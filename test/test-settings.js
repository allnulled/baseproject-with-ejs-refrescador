module.exports = {
  testDirs: [
    "performance-metrics",
    "moduler-v3",
    "compiler",
    "path-locator",
  ],
  testsSelectors: [
    "*", // todos los tests
    "!performance-metrics"
  ],
  makeCoverage: true,
  showPerformanceMetrics: true,
  nycOptions: {
    exclude: [
      "**/colors.dist.js",
      "**/speed-observer.dist.js",
    ]
  },
};