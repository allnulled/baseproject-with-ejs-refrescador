module.exports = {
  testDirs: [
    "performance-metrics",
    "moduler-v3",
    "compiler",
  ],
  tests: [
    "*", // todos los tests
    "!performance-metrics"
  ],
  showMetrics: true,
};