const LooperCli = class {
  static create = <%-await inc("src/common/common.static.create.js")%>;
  static Schema = <%-await inc("src/LooperCli/Schema.js")%>;
  static Type = <%-await inc("src/LooperCli/Type.js")%>;
  static type = <%-await inc("src/LooperCli/LooperCli.type.js")%>;
  constructor(basedir) {
    this.basedir = basedir;
    this.projectRoot = null;
  }
  static assert = <%-await inc("src/common/common.assert.js", { owner: "LooperCli" })%>;
  static parseCliArgs = <%-await inc("src/LooperCli/LooperCli.parseCliArgs.js")%>
  assert = <%-await inc("src/common/common.assert.js", { owner: "LooperCli.prototype" })%>;
  findProjectRoot = <%-await inc("src/LooperCli/LooperCli.prototype.findProjectRoot.js")%>
};

module.exports = LooperCli;