(definition) {
  const possibleRequired = ["module", "factory", "url", "file", "path", "name"];
  Classifying_type:
  if (typeof definition.$type === "undefined") {
    for (let index = 0; index < possibleRequired.length; index++) {
      const requiredProp = possibleRequired[index];
      if (requiredProp in definition) {
        this.assert(typeof definition.$type === "undefined", `ambiguous definition type due to «${definition.$type}» and «${requiredProp}=${definition[requiredProp]}»`);
        definition.$type = requiredProp;
      }
    }
  }
  this.assert(typeof definition.$type === "string", `property required in definition: ${possibleRequired.map(p => "«" + p + "»").join(" or ")}`);
}