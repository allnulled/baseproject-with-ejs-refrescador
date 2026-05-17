(optionsInput = {}) {
  this._trace("prototype.write");
  this.assert(typeof optionsInput === "object", "required «options» as object");
  const options = Object.assign({}, BundleWriter._defaultOptions, optionsInput);
  const toFile = typeof options.outFile === "string";
  const toDir = typeof options.outDir === "string"
  this.assert(toFile || toDir, "required «options.outFile» or «options.outDir» as string");
}