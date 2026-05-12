const main = async function () {
  const { methods } = require(__dirname + "/test/test-utils.js");
  await methods.buildSource("src/ModulerV3.entry.js", "dist/moduler-v3.dist.js");
  await methods.buildSource("src/SpeedObserver.entry.js", "dist/speed-observer.dist.js");
  await methods.buildSource("src/Colors.entry.js", "dist/colors.dist.js");
  await methods.startTests();
};

main();
