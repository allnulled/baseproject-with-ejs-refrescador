const LooperCli = class {
  static create = <%-await inc("src/common/common.static.create.js")%>;
  static Schema = <%-await inc("src/LooperCli/Schema/Schema.js")%>;
  static Type = <%-await inc("src/LooperCli/Type/Type.js")%>;
  static type = <%-await inc("src/LooperCli/LooperCli.type.js")%>;
  static isCastableTo = <%-await inc("src/LooperCli/LooperCli.isCastableTo.js")%>;
  static findClosestDirectoryWithFile = <%-await inc("src/LooperCli/LooperCli.findClosestDirectoryWithFile.js")%>;
  static findProjectRoot = <%-await inc("src/LooperCli/LooperCli.findProjectRoot.js")%>;
  static assert<%-await inc("src/common/common.assert.js", { owner: "LooperCli" })%>;
  static parseCommandLineArguments = <%-await inc("src/LooperCli/LooperCli.parseCommandLineArguments.js")%>;
  <%-await inc("src/LooperCli/LooperCli.constructor.js")%>;
  assert<%-await inc("src/common/common.assert.js", { owner: "LooperCli.prototype" })%>;
  setSchema = <%-await inc("src/LooperCli/LooperCli.prototype.setSchema.js")%>;
  parseCommandLineArguments = <%-await inc("src/LooperCli/LooperCli.prototype.parseCommandLineArguments.js")%>;
  dispatch = <%-await inc("src/LooperCli/LooperCli.prototype.dispatch.js")%>;
};

module.exports = LooperCli;