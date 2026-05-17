(definition) {
  if (definition.$type === "module") {
    this.assert(typeof definition.module !== "undefined", `required «module» as not undefined when type is «module»`);
  } else if (definition.$type === "factory") {
    this.assert(typeof definition.factory === "function", `required «factory» as function when type is «factory»`);
  } else if (definition.$type === "url") {
    this.assert(typeof definition.url === "string", `required «url» as string when type is «url»`);
  } else if (definition.$type === "file") {
    this.assert(typeof definition.file === "string", `required «file» as string when type is «file»`);
  } else if (definition.$type === "path") {
    this.assert(typeof definition.path === "string", `required «path» as string when type is «path»`);
  } else {
    throw new Error(`type «${definition.$type}» was not identified`);
  }
}