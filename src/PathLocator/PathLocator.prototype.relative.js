function(subpath) {
  this.assert(typeof subpath === "string", "subpath must be string");
  if (this.constructor.isNodejs) {
    return require("path").resolve(this.basedir, subpath).replace(this.basedir, "");
  }
  throw new Error("browser does not support PathLocator.prototype.relative yet");
}