function(op) {
  this.records.push({
    op: op,
    ms: this.stop(),
  });
}