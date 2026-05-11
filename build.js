const inc = (subpath) => require("fs").readFileSync(require("path").resolve(__dirname, subpath)).toString();
const methods = {
  buildSource: async function () {
    const template = await inc("src/entry.js");
    let source = await require("ejs").render(template, {
      require,
      process,
      projectRoot: __dirname,
      global,
      inc,
    }, { async: true });
    try {
      const beautify = require("js-beautify/js").js;
      source = beautify(source);
    } catch (error) {
      // @OK-
    }
    console.log(source);
    await require("fs").promises.writeFile(__dirname + "/moduler-v3.dist.js", source, "utf8");
  },
  startTests: function () {
    return require(__dirname + "/test.js")();
  }
}

const main = async function () {
  await methods.buildSource();
  await methods.startTests();
};

main();
