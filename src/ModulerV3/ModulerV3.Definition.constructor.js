constructor(extra = {}) {
  Object.assign(this, extra);
  if(!(typeof extra.moduler === "object")) throw new Error("required «moduler» as object on definition");
  if(!(extra.moduler instanceof ModulerV3)) throw new Error("required «moduler» as instance of ModulerV3 on definition");
}