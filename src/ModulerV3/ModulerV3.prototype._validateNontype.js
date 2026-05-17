(definition) {
  this.assert(["undefined", "function"].includes(typeof definition.getter), `required «getter» as function or undefined`);
  this.assert(["undefined", "string"].includes(typeof definition.id), `required «id» as string or undefined`);
  this.assert(["undefined", "string", "object"].includes(typeof definition.styles), `required «styles» as array, string or undefined`);
  if(typeof definition.styles === "object") this.assert(Array.isArray(definition.styles), `required «styles» as array, string or undefined`);
  this.assert(["undefined", "string", "object"].includes(typeof definition.category), `required «category» as array, string or undefined`);
  if(typeof definition.category === "object") this.assert(Array.isArray(definition.category), `required «category» as array, string or undefined`);
}