const main = async function (file = process.argv[2]) {
  if(file.includes("/dist")) return false;
  const { methods } = require(__dirname + "/../test/test-utils.js");
  await methods.buildSource("src/ModulerV3.entry.js", "dist/moduler-v3.dist.js");
  await methods.buildSource("src/Colors.entry.js", "dist/colors.dist.js");
  await methods.buildSource("src/SpeedObserver.entry.js", "dist/speed-observer.dist.js");
  await methods.instrumentSources();
  await methods.startTests();
};

main();
