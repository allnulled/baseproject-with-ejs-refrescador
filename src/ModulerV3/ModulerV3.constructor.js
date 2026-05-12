constructor(basedir) {
  this.assert(typeof basedir === "string", "basedir must be string");
  this.basedir = basedir;
  this.modules = {};
}