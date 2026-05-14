class Type {
  static create(...args) {
    return new this(...args);
  }
  <%-await inc("src/LooperCli/Type/Type.constructor.js")%>;
}