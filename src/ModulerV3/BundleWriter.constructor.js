constructor(moduler = null) {
  this._trace("constructor");
  this.assert(typeof moduler === "object", "required «moduler» as object");
  this.assert(moduler instanceof ModulerV3, "required «moduler» as instance of ModulerV3");
  this._state = "available";
  this.moduler = moduler;
  this.basedir = moduler.basedir;
  this.analysis = {};
}