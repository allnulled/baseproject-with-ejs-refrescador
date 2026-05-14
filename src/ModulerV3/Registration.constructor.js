constructor(definition = {}) {
  this.assert(typeof definition === "object", "definition must be object");
  this.assert(definition instanceof ModulerV3.Definition, "definition must be original instance");
  this.definition = definition;
}