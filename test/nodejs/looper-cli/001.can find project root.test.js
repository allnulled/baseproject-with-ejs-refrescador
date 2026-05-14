module.exports = async function({ LooperCli }) {
  const fs = require("fs");
  const path = require("path");
  const originalRoot = path.resolve(__dirname, "../../..");

  const cli = LooperCli.create();
  const proot = await cli.findProjectRoot();
  LooperCli.assert(originalRoot === proot, "LooperCli.prototype.findProjectRoot no caza bien el proyecto original (punto 1)");

  const root2 = path.resolve(__dirname, "project1");
  const cli2 = LooperCli.create(root2);
  const proot2 = await cli2.findProjectRoot();
  const expected2 = path.resolve(originalRoot, "test/nodejs/looper-cli/project1");
  LooperCli.assert(expected2 === proot2, "LooperCli.prototype.findProjectRoot no caza bien el proyecto relativo (punto 2)");

  const root3 = path.resolve(__dirname, "project1/subpath/subpath");
  const cli3 = LooperCli.create(root3);
  const proot3 = await cli3.findProjectRoot();
  LooperCli.assert(expected2 === proot3, "LooperCli.prototype.findProjectRoot no caza bien el proyecto relativo (punto 3)");

};