(options) {
  this._trace("prototype._persist");
  const source = this._analysis.js.output;
  const filepath = this.fullpath(options.outFile);
  await require("fs").promises.writeFile(filepath, source, "utf8");
}