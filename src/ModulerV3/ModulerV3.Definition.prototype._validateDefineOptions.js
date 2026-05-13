function() {
  const possibleRequired = ["module", "factory", "url", "file", "path"];
  Classifying_type:
  if (typeof this.input.type !== "string") {
    for (let index = 0; index < possibleRequired.length; index++) {
      const requiredProp = possibleRequired[index];
      if (requiredProp in this.input) {
        this.type = requiredProp;
        break Classifying_type;
      }
    }
  } else {
    this.type = this.input.type;
  }
  this.assert(typeof this.type === "string", `required one of: ${possibleRequired.map(p => "«" + p + "»").join(" | ")}`);
  Validating_type: {
    if (this.type === "module") {
      this.assert(typeof this.input.module !== "undefined", `required «module» as not undefined`);
    } else if (this.type === "factory") {
      this.assert(typeof this.input.factory === "function", `required «factory» as function`);
    } else if (this.type === "url") {
      this.assert(typeof this.input.url === "string", `required «url» as string`);
    } else if (this.type === "file") {
      this.assert(typeof this.input.file === "string", `required «file» as string`);
    } else if (this.type === "path") {
      this.assert(typeof this.input.path === "string", `required «path» as string`);
    } else {
      throw new Error(`type «${this.type}» was not identified`);
    }
  }
}