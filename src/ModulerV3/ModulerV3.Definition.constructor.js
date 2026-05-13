constructor(extra = {}) {
  Object.assign(this, extra);
  this.assert(typeof extra.input === "object", "required «input» as object on definition");
  this.assert(typeof extra.moduler === "object", "required «moduler» as object on definition");
  this.assert(extra.moduler instanceof ModulerV3, "required «moduler» as instance of ModulerV3 on definition");
}