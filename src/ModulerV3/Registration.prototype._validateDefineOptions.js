function() {
  const possibleRequired = ["module", "factory", "url", "file", "path"];
  const definition = this.definition;
  Classifying_type:
  if (typeof definition.type === "undefined") {
    for (let index = 0; index < possibleRequired.length; index++) {
      const requiredProp = possibleRequired[index];
      if (requiredProp in definition) {
        definition.type = requiredProp;
        break Classifying_type;
      }
    }
  }
  this.assert(typeof definition.type === "string", `required one of: ${possibleRequired.map(p => "«" + p + "»").join(" | ")}`);
  Validating_type: {
    if (definition.type === "module") {
      this.assert(typeof definition.module !== "undefined", `required «module» as not undefined when type is «module»`);
    } else if (definition.type === "factory") {
      this.assert(typeof definition.factory === "function", `required «factory» as function when type is «factory»`);
    } else if (definition.type === "url") {
      this.assert(typeof definition.url === "string", `required «url» as string when type is «url»`);
    } else if (definition.type === "file") {
      this.assert(typeof definition.file === "string", `required «file» as string when type is «file»`);
    } else if (definition.type === "path") {
      this.assert(typeof definition.path === "string", `required «path» as string when type is «path»`);
    } else {
      throw new Error(`type «${definition.type}» was not identified`);
    }
  }
  Validating_other_properties: {
    this.assert(["undefined", "function"].includes(typeof definition.getter), `required «getter» as function or undefined`);
    this.assert(["undefined", "string"].includes(typeof definition.id), `required «id» as string or undefined`);
    this.assert(["undefined", "string", "object"].includes(typeof definition.styles), `required «styles» as array, string or undefined`);
    if(typeof definition.styles === "object") this.assert(Array.isArray(definition.styles), `required «styles» as array, string or undefined`);
    this.assert(["undefined", "string", "object"].includes(typeof definition.category), `required «category» as array, string or undefined`);
    if(typeof definition.category === "object") this.assert(Array.isArray(definition.category), `required «category» as array, string or undefined`);
  }
}