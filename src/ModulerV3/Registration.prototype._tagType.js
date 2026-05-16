() {
  const definition = this.definition;
  const possibleRequired = ["module", "factory", "url", "file", "path"];
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
  this.assert(typeof definition.type === "string", `property required in definition: ${possibleRequired.map(p => "«" + p + "»").join(" or ")}`);
}