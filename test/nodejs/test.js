(async function () {
  const fs = require("fs");
  const path = require("path");
  const parameters = require(__dirname + "/../test-utils.js");
  const Colors = require(__dirname + "/../../dist/colors.dist.js");
  const settings = require(__dirname + "/../test-settings.js");
  const { inc, abs } = parameters;
  const ModulerV3 = require(__dirname + "/../../dist/moduler-v3.dist.js");
  const SpeedObserver = require(__dirname + "/../../dist/speed-observer.dist.js");
  const matchesTestRules = function (file) {
    let isSelected = false;
    Is_test_selected:
    for (let index = 0; index < settings.tests.length; index++) {
      const testRule = settings.tests[index];
      if (testRule === "*") isSelected = true;
      else if (testRule === "!*") isSelected = false;
      else if (testRule.startsWith("!") && file.includes(testRule.substr(1))) {
        isSelected = false;
        break Is_test_selected;
      } else if (file.includes(testRule)) {
        isSelected = true;
        break Is_test_selected;
      }
    }
    return isSelected;
  };
  const evaluarDirectorio = async function (settingsDir, crono1) {
    crono1.start();
    const initDir = new Date();
    const dir = path.resolve(__dirname, settingsDir);
    const dirName = dir.replace(__dirname + "/", "");
    if (!matchesTestRules(dir)) {
      console.log(` ❓ Ignoring tests of directory: «${dirName}»`);
      return false;
    }
    console.log(Colors.style("cyan").text(" 🔻 Running tests of directory: ") + dirName);
    const files = await fs.promises.readdir(dir);
    const errors = [];
    const cronoFiles = SpeedObserver.create();
    let localStatus = "pending";
    Iterating_test_files:
    for (let index = 0; index < files.length; index++) {
      const filename = files[index];
      const file = path.resolve(dir, filename);
      const filepath = path.join(dirName, filename);
      cronoFiles.start();
      if (!file.endsWith(".test.js")) continue Iterating_test_files;
      if (!matchesTestRules(file)) {
        console.log(` ❓ Ignoring test: «${filepath}»`);
        continue Iterating_test_files;
      }
      // console.log(` [*] Starting test: «${filepath}»`);
      let status = "pending";
      try {
        const testCallback = require(file);
        await testCallback({ ModulerV3, SpeedObserver }, parameters);
        console.log(Colors.style("cyan").text(` ✅ Success: `) + `«${filepath}»`);
        status = "ok";
      } catch (error) {
        status = "failed";
        console.log(Colors.style("red").text(` ⛔️ Failure: `) + `«${filepath}»`);
        errors.push({ error, testId: file, testPath: filepath });
      } finally {
        cronoFiles.save(`Test file «${filepath}»`, { status });
      }
    }
    if (errors.length) {
      localStatus = "failed";
      let errorMessage = "";
      errorMessage += Colors.style("red,bold").text(`❌ Tests failed with «${errors.length}» errors:`);
      for (let index = 0; index < errors.length; index++) {
        const errorInfo = errors[index];
        const { error, testPath } = errorInfo;
        errorMessage += `\n  ${index + 1}. ❌ Error in test of:\n    - ${testPath}\n`;
        if(error) errorMessage += `${error.name} => ${error.message}\n${error.stack}`;
        else errorMessage += `${error}`;
      }
      console.log(Colors.table([[errorMessage]], { style: { border: ["red"] } }));
    } else {
      localStatus = "ok";
      console.log(Colors.style("cyan,bold").text(` 🟢 Collection tests of «${dirName}» passed successfully.`));
    }
    crono1.save(`Test collection of «${settingsDir}»`, { status: localStatus });
    const total = (new Date()).getTime() - initDir.getTime();
    return { cronoFiles, total };
  };
  const crono1 = SpeedObserver.create();
  const cronos = [];
  let initAll = new Date();
  for (let index = 0; index < settings.testDirs.length; index++) {
    const testDir = settings.testDirs[index];
    const { cronoFiles, total } = await evaluarDirectorio(testDir, crono1);
    if (cronoFiles) cronos.push({ dir: testDir, crono: cronoFiles, total });
  }
  const durationAll = (new Date()).getTime() - initAll.getTime();
  if (settings.showMetrics) {
    SpeedObserver.reportCollection([{
      title: "All collections",
      tests: crono1.records,
    }].concat(cronos.map(o => {
      return {
        title: `Test collection of «${o.dir}»`,
        tests: o.crono.records,
      };
    })), durationAll);
  }
})();