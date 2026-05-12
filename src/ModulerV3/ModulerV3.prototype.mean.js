function(id) {
  if(id in this.modules) {
    return this.modules[id].promise;
  }
  const record = {
    exports: {},
    promise: null,
  };
  this.modules[id] = record;
  record.promise = (async () => {
    const factory = await this.getFactoryOf(id);
    const output = await factory(record.exports);
    return record.exports;
  })();
  return record.promise;
}