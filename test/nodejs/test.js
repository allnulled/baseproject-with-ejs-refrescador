(async function () {
  const fs = require("fs");
  const path = require("path");
  const parameters = require(__dirname + "/../test-utils.js");
  const { inc, abs } = parameters;
  const ModulerV3 = require(__dirname + "/../../dist/moduler-v3.dist.js");
  const SpeedObserver = require(__dirname + "/../../dist/speed-observer.dist.js");
  const evaluarDirectorio = async function (dir) {
    console.log("[*] Running tests of directory: " + dir);
    const files = await fs.promises.readdir(dir);
    const dirName = path.basename(dir);
    const errors = [];
    Iterating_test_files:
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      if (!file.endsWith(".test.js")) continue Iterating_test_files;
      console.log(` [*] Starting test: «${dirName}/${file}»`);
      try {
        const testCallback = require(`${__dirname}/performance-metrics/${file}`);
        await testCallback({ ModulerV3, SpeedObserver }, parameters);
      } catch (error) {
        errors.push({ error, testId: file });
      }
    }
    if (errors.length) {
      console.error(`[!] Tests failed with «${errors.length}» errors:`);
      for (let index = errors.length - 1; index >= 0; index--) {
        const errorInfo = errors[index];
        const { error, testId } = errorInfo;
        console.error(`  [!ERR:${index + 1}] Error in test of «${testId}»:`, error);
      }
    }
  };

  await evaluarDirectorio(__dirname + "/performance-metrics");

})();