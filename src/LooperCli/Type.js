class Type {
  static create(...args) {
    return new this(...args);
  }
  constructor(val) {
    this.val = val;
  }
}