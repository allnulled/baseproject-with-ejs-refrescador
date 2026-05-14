const templateParameters = {};
const findProjectRoot = function (file = "looper.settings.js") {
  const fs = require("fs");
  const path = require("path");
  let dir = process.cwd();
  let previousDir = null;
  do {
    try {
      const filepath = path.resolve(dir, file);
      fs.readFileSync(filepath);
      return dir;
    } catch (error) {
      previousDir = dir;
      dir = path.dirname(dir);
    }
  } while (dir !== previousDir);
  return null;
};
const projectRoot = findProjectRoot();
const abs = function (subpath) {
  return require("path").resolve(projectRoot, subpath);
};
const relativ = function (subpath) {
  return require("path").resolve(projectRoot, subpath).replace(projectRoot, "");
};
const inc = async function (subpath, callParameters = {}) {
  const file = abs(subpath);
  const content = await require("fs").promises.readFile(file, "utf8");
  return await require("ejs").render(content, { ...templateParameters, ...callParameters }, { async: true });
};
Object.assign(templateParameters, {
  require,
  process,
  projectRoot,
  global,
  inc,
  abs,
  relativ,
});
const methods = {
  buildSource: async function (input, output) {
    const template = await inc(input);
    let source = await require("ejs").render(template, templateParameters, { async: true });
    if (settings.beautifyDist) {
      try {
        const beautify = require("js-beautify/js").js;
        source = beautify(source);
      } catch (error) {
        // @OK-
        console.log(error);
      }
    }

    console.log(` 🔨 Building «${output}»`);
    await require("fs").promises.writeFile(abs(output), source, "utf8");
  },
  instrumentSources: async function () {
    if (settings.makeCoverage) {
      const instrumentation = require(abs("dev/tool/instrument.js"));
      await instrumentation(require(projectRoot + "/looper.settings.js").nycOptions);
      return true;
    }
    return false;
  },
  startTests: function () {
    return require(abs("test/nodejs/test.js"));
  }
};
const expect = {
  because: function (id = undefined) {
    return {
      toNotThrow: function (callback) {
        try {
          callback();
        } catch (error) {
          console.log(error);
          throw new Error("expectation throws: " + id);
        }
      },
      toNotThrowAsync: async function (callback) {
        try {
          await callback();
        } catch (error) {
          console.log(error);
          throw new Error("expectation throws async: " + id);
        }
      },
      toThrow: function (callback) {
        let hasThrown = false;
        try {
          callback();
        } catch (error) {
          hasThrown = true;
        }
        if (!hasThrown) throw new Error("expectation does not throw: " + id);
      },
      toThrowAsync: async function (callback) {
        let hasThrown = false;
        try {
          await callback();
        } catch (error) {
          hasThrown = true;
        }
        if (!hasThrown) throw new Error("expectation does not throw async: " + id);
      }
    }
  }
};
const globsMatch = function (text, globs) {
  const { minimatch } = require("minimatch");
  const matches = globs.filter(pattern => {
    return minimatch(text, pattern);
  });
  return matches.length ? matches : null;
}
const settings = require(projectRoot + "/looper.settings.js");
const DevUtils = class {
  static expect = expect;
  static methods = methods;
  static inc = inc;
  static abs = abs;
  static relativ = relativ;
  static templateParameters = templateParameters;
  static projectRoot = projectRoot;
  static findProjectRoot = findProjectRoot;
  static settings = settings;
  static globsMatch = globsMatch;
};
module.exports = DevUtils;