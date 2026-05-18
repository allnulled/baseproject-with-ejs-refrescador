(optionsUser = {}) {
  this._trace("prototype.write");
  this.assert(typeof optionsUser === "object", "required «options» as object");
  const options = Object.assign({}, BundleWriter._defaultOptions, optionsUser);
  const toFile = typeof options.outFile === "string";
  const toDir = typeof options.outDir === "string"
  this.assert(toFile || toDir, "required «options.outFile» or «options.outDir» as string");
  this._block();
  await this._analyze(options);
  await this._persist(options);
  this._close();
}