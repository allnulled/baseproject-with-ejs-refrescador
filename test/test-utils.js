let templateParameters = {};
const projectRoot = require("path").resolve(__dirname + "/..");
const abs = function (subpath) {
  return require("path").resolve(projectRoot, subpath);
};
const inc = async function(subpath) {
  const file = abs(subpath);
  const content = await require("fs").promises.readFile(file, "utf8");
  return await require("ejs").render(content, templateParameters, { async: true });
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
    await require("fs").promises.writeFile(abs(output), source, "utf8");
  },
  startTests: function () {
    return require(abs("test/nodejs/test.js"));
  }
};

module.exports = { methods, inc, abs, templateParameters, projectRoot };