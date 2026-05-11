const abs = (subpath) => require("path").resolve(__dirname, subpath);
const inc = (subpath) => require("fs").readFileSync(abs(subpath)).toString();
const templateParameters = {
  require,
  process,
  projectRoot: __dirname,
  global,
  inc,
  abs,
};
const methods = {
  buildSource: async function () {
    const template = await inc("src/entry.js");
    let source = await require("ejs").render(template, templateParameters, { async: true });
    try {
      const beautify = require("js-beautify/js").js;
      source = beautify(source);
    } catch (error) {
      // @OK-
    }
    console.log(source);
    await require("fs").promises.writeFile(abs("moduler-v3.dist.js"), source, "utf8");
  },
  startTests: function () {
    return require(abs("test/nodejs/test.js"))(templateParameters);
  }
}

const main = async function () {
  await methods.buildSource();
  await methods.startTests();
};

main();
