let templateParameters = {};
const projectRoot = require("path").resolve(__dirname + "/..");
const abs = function (subpath) {
  return require("path").resolve(projectRoot, subpath);
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
});
const methods = {
  buildSource: async function (input, output) {
    const template = await inc(input);
    let source = await require("ejs").render(template, templateParameters, { async: true });
    try {
      const beautify = require("js-beautify/js").js;
      source = beautify(source);
    } catch (error) {
      // @OK-
    }
    console.log(` 🔨 Building «${output}»`);
    await require("fs").promises.writeFile(abs(output), source, "utf8");
  },
  instrumentSources: async function() {
    const instrumentation = require(abs("dev/instrument.js"));
    await instrumentation(require(__dirname + "/test-settings.js").nycOptions);
    return;
  },
  startTests: function () {
    return require(abs("test/nodejs/test.js"));
  }
};
const expect = {
  because: function (id = "undetermined reason") {
    return {
      toNotThrow: function (callback) {
        callback();
      },
      toNotThrowAsync: async function (callback) {
        await callback();
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
module.exports = { expect, methods, inc, abs, templateParameters, projectRoot };