function (subpath) {
  if (this.constructor.isNodejs) {
    return require("path").resolve(this.basedir, subpath);
  }
  throw new Error("browser does not support PathLocator.prototype.absolute yet");
}