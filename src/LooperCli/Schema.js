class Schema {
  static create(...args) {
    return new this(...args);
  }
  constructor(original) {
    this.original = original;
  }
  parse(schema = {}, args = undefined) {
    return LooperCli.parseCliArgs(schema, args);
  }
}