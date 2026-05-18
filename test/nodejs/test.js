module.exports = (async function () {

  const fs = require("fs");
  const path = require("path");
  const NYC = require("nyc");
  const settings = require(__dirname + "/../../looper.settings.js");
  const instrumentalSubpath = settings.makeCoverage ? "dev/coverage/" : "";
  const nyc = new NYC({
    cwd: __dirname + "/../..",
    tempDirectory: ".nyc_output",
    ...settings.nycOptions,
  });
  const getInstrumentalSubpathOf = function(pref, suff) {
    const path1 = path.resolve(pref + suff);
    const itShould = nyc.exclude.shouldInstrument(path1);
    let output = path1;
    if (itShould) {
      output = path.resolve(pref + instrumentalSubpath + suff);
    }
    return output;
  };
  const requireInstrumentalSubpathOf = async function(pref, suff) {
    const instrumentalSub1 = getInstrumentalSubpathOf(pref, suff);
    try {
      fs.readFileSync(instrumentalSub1, "utf8");
      return require(instrumentalSub1);
    } catch (error) {
      if(error.code === "ENOENT") {
        return require(pref + suff);
      }
      throw error;
    }
  };
  const DevUtils = require(__dirname + "/../../dev/dev-utils.js");
  const Colors = await requireInstrumentalSubpathOf(__dirname + "/../../", "dist/colors.dist.js");
  const LooperCli = await requireInstrumentalSubpathOf(__dirname + "/../../", "dist/looper-cli.dist.js");
  const ModulerV3 = await requireInstrumentalSubpathOf(__dirname + "/../../", "dist/moduler-v3.dist.js");
  const SpeedObserver = await requireInstrumentalSubpathOf(__dirname + "/../../", "dist/speed-observer.dist.js");
  const PathLocator = await requireInstrumentalSubpathOf(__dirname + "/../../", "dist/path-locator.dist.js");
  const { inc, abs, relativ } = DevUtils;
  const matchesTestRules = function (absfile) {
    const file = relativ(absfile);
    let isSelected = "no:default";
    Is_test_selected:
    for (let index = 0; index < settings.testsSelectors.length; index++) {
      const testRule = settings.testsSelectors[index].trim();
      if (testRule === "*") {
        isSelected = "yes:*";
      } else if (testRule === "!*") {
        isSelected = "no:!*";
      } else if (testRule.startsWith("!") && file.includes(testRule.substr(1))) {
        isSelected = "no:" + testRule;
        break Is_test_selected;
      } else if (file.includes(testRule)) {
        isSelected = "yes:" + testRule;
        break Is_test_selected;
      }
    }
    return isSelected;
  };
  let globalErrors = [];
  const evaluarDirectorio = async function (settingsDir, crono1) {
    crono1.start();
    const initDir = new Date();
    const dir = path.resolve(__dirname, settingsDir);
    const dirName = dir.replace(__dirname + "/", "");
    const dirIgnoreMatch = matchesTestRules(dir);
    if (dirIgnoreMatch.startsWith("no:")) {
      // console.log(Colors.style("cyan").text(` ▫️ Ignoring tests of directory: «${dirName}» due to selector «${dirIgnoreMatch}»`));
      return false;
    }
    console.log(Colors.style("cyan").text(" 🔻✅🧪 Running collection of tests of directory: ") + dirName);
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
      const fileIgnoreMatch = matchesTestRules(file);
      if (fileIgnoreMatch.startsWith("no:")) {
        // console.log(` ▫️ Ignoring test of file: «${filepath}» due to selector «${fileIgnoreMatch}»`);
        continue Iterating_test_files;
      }
      // console.log(` [*] Starting test: «${filepath}»`);
      let status = "pending";
      try {
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
        const testCallback = require(file);
        await testCallback({
          ModulerV3,
          SpeedObserver,
          Colors,
          PathLocator,
          settings,
          DevUtils,
          LooperCli
        });
        console.log(Colors.style("greenBright").text(`   ✅ Success: «${filepath}»`));
        status = "ok";
      } catch (error) {
        status = "failed";
        console.log("   ⛔️ " + Colors.style("red,underline").text(`Failure: «${filepath}»`));
        errors.push({ error, testId: file, testPath: filepath });
      } finally {
        cronoFiles.save(`File «${filepath}»`, { status });
        ///////////////////////////////////
        ///////////////////////////////////
        ///////////////////////////////////
      }
    }
    if (errors.length) {
      localStatus = "failed";
      let errorMessage = "";
      errorMessage += Colors.style("red,bold").text(`   ⛔️⛔️ Failed collection of tests of «${dirName}» with «${errors.length}» errors`);
      console.log(errorMessage);
    } else {
      localStatus = "ok";
      console.log(Colors.style("greenBright,bold").text(`   ✅✅ Succeded collection of tests of «${dirName}».`));
    }
    crono1.save(`Collection «${settingsDir}»`, { status: localStatus });
    const total = (new Date()).getTime() - initDir.getTime();
    globalErrors = globalErrors.concat(errors);
    return { cronoFiles, total };
  };
  console.log(Colors.style("yellow,bold").text(" 🧪 Starting tests"));
  const crono1 = SpeedObserver.create();
  const cronos = [];
  let initAll = new Date();
  const testDirs = (await fs.promises.readdir(__dirname, { withFileTypes: true })).filter(f => {
    return f.isDirectory() && true;
  }).map(f => path.resolve(f.path, f.name));
  console.log(testDirs.map((dir,indexTest) => `   ▫️ ${indexTest+1}. ${dir}`).join("\n"));
  for (let index = 0; index < testDirs.length; index++) {
    const testDir = testDirs[index];
    const testDirname = testDir.replace(__dirname + "/", "");
    const { cronoFiles, total } = await evaluarDirectorio(testDir, crono1);
    if (cronoFiles) cronos.push({ dir: testDir, crono: cronoFiles, total });
  }
  const durationAll = (new Date()).getTime() - initAll.getTime();
  Muestra_metricas: {
    if (settings.showPerformanceMetrics) {
      await SpeedObserver.reportCollection([{
        title: "All collections",
        tests: crono1.records,
      }].concat(cronos.map(o => {
        return {
          title: `Collection «${o.dir}»`,
          tests: o.crono.records,
        };
      })), durationAll);
      if (globalErrors.length) {
        console.log(Colors.style("bold,red").text(" 🔻❌ Test errors review: " + globalErrors.length));
        for (let index = 0; index < globalErrors.length; index++) {
          const errorInfo = globalErrors[index];
          const header = Colors.style("bold,redBright").text(Colors.padLinesToMax(`🔴 ERR-${index + 1}. ${errorInfo.error.name} at:\n📄 ${errorInfo.testPath} `));
          let out = "";
          out += `${errorInfo.error.name}`;
          out += `: ${errorInfo.error.message}`;
          out += ` {\n  ${errorInfo.error.stack}\n}`;
          out = Colors.style("yellowBright").text(Colors.padLinesToMax(out));
          console.log(Colors.table([[header], [out]], { style: { border: ["red"] } }));
        }
      }
    }
    Genera_reporte_de_cobertura:
    if(settings.makeCoverage) {
      await require(__dirname + "/coverage.js");
    }
  }

})();