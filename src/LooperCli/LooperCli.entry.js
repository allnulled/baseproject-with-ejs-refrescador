const LooperCli = class {
  static create = <%-await inc("src/common/common.static.create.js")%>;
  static Schema = <%-await inc("src/LooperCli/Schema.js")%>;
  static Type = <%-await inc("src/LooperCli/Type.js")%>;
  static type = <%-await inc("src/LooperCli/LooperCli.type.js")%>;
  static castables = <%-await inc("src/LooperCli/LooperCli.castables.js")%>;
  static isCastableTo = <%-await inc("src/LooperCli/LooperCli.isCastableTo.js")%>;
  static findClosestWithFile = <%-await inc("src/LooperCli/LooperCli.findClosestWithFile.js")%>;
  static findProjectRoot = <%-await inc("src/LooperCli/LooperCli.findProjectRoot.js")%>;
  constructor(basedir) {
    this.basedir = basedir;
    this.projectRoot = null;
  }
  static assert = <%-await inc("src/common/common.assert.js", { owner: "LooperCli" })%>;
  static parseCliArgs = <%-await inc("src/LooperCli/LooperCli.parseCliArgs.js")%>;
};

module.exports = LooperCli;