module.exports = async function({ LooperCli }) {
  const fs = require("fs");
  const path = require("path");
  const originalRoot = path.resolve(__dirname, "../../..");

  const proot = await LooperCli.findProjectRoot();
  LooperCli.assert(originalRoot === proot, "LooperCli.prototype.findProjectRoot no caza bien el proyecto original (punto 1)");

  const initDir2 = path.resolve(__dirname, "project1");
  const proot2 = await LooperCli.findProjectRoot(initDir2);
  const expected2 = path.resolve(originalRoot, "test/nodejs/looper-cli/project1");
  LooperCli.assert(expected2 === proot2, "LooperCli.prototype.findProjectRoot no caza bien el proyecto relativo (punto 2)");

  const initDir3 = path.resolve(__dirname, "project1/subpath/subpath");
  const proot3 = await LooperCli.findProjectRoot(initDir3);
  LooperCli.assert(expected2 === proot3, "LooperCli.prototype.findProjectRoot no caza bien el proyecto relativo (punto 3)");

};