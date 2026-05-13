function(subpath) {
  if (this.constructor.isNodejs) {
    return require("path").resolve(this.basedir, subpath).replace(this.basedir, "");
  }
  throw new Error("browser does not support PathLocator.prototype.relative yet");
}