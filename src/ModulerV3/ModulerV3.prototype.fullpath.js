(subpath) {
  this._trace("fullpath", arguments, 2);
  return require("path").resolve(this.basedir, subpath);
}