module.exports = {
  testDirs: [
    "performance-metrics",
    "moduler-v3",
    "compiler",
    "path-locator",
  ],
  tests: [
    "*", // todos los tests
    "!performance-metrics"
  ],
  showMetrics: true,
  nycOptions: {
    exclude: [
      "**/colors.dist.js",
      "**/speed-observer.dist.js",
    ]
  },
};