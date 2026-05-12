function(op, extra = {}) {
  this.records.push({
    op: op,
    ms: this.stop(),
    ...extra,
  });
}