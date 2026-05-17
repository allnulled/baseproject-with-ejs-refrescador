module.exports = async function({ ModulerV3 }) {
  const moduler = ModulerV3.create(__dirname + "/modules-1");
  const fs = require("fs");
  const path = require("path");
  const f_1 = (...args) => ModulerV3.InjectionParser.create(...args);
  const f_2 = subpath => fs.promises.readFile(path.resolve(__dirname, subpath), "utf8");
  const matches1 = f_1(await f_2("modules-1/injections-1.js")).parse();
  const matches2 = f_1(await f_2("modules-1/injections-2.js")).parse();
  const matches3 = f_1(await f_2("modules-1/injections-3.js")).parse();
  const matches4 = f_1(await f_2("modules-1/injections-4.js")).parse();
  // console.log(matches1);
  // console.log(matches2);
  // console.log(matches3);
  // console.log(matches4);
  moduler.assert(matches1.length === 1, "matches1 should have 1 match");
  moduler.assert(matches1[0].path === "a.js", "matches1 should have 1 match with specific path");
  // console.log(matches1[0]);
  moduler.assert(matches1[0].start === 7, "matches1 should have 1 match with specific start");
  moduler.assert(matches1[0].end === 35, "matches1 should have 1 match with specific end");
  moduler.assert(matches1[0].raw === '/* @inject.source("a.js") */', "matches1 should have 1 match with specific raw");
  moduler.assert(matches2.length === 1, "matches2 should have 1 matches");
  moduler.assert(matches3.length === 1, "matches3 should have 2 matches");
  moduler.assert(matches4.length === 3, "matches4 should have 3 matches");
}