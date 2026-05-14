class Schema {
  static create = <%-await inc("src/common/common.static.create.js")%>;
  <%-await inc("src/LooperCli/Schema/Schema.constructor.js")%>;
  parse = <%-await inc("src/LooperCli/Schema/Schema.prototype.parse.js")%>;
}