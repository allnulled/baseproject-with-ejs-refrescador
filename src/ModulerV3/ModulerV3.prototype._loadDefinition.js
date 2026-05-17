(definition) {
  let dependencies = [];
  if(definition.uses && definition.uses.length) {
    for(let indexDependency=0; indexDependency<definition.uses.length; indexDependency++) {
      const dependencyDefinition = definition.uses[indexDependency];
      const dependencyMeaning = await this.mean(dependencyDefinition)
      dependencies.push(dependencyMeaning);
    }
  }
  const value = definition[definition.$type];
  let output = undefined;
  if(definition.$type === "module") {
    output = value;
  } else if(definition.$type === "factory") {
    return await this._evaluateFactory(value, dependencies, definition);
  } else if(definition.$type === "file") {
    const fullpath = this.fullpath(value);
    const source = await this._readFile(fullpath);
    output = await this._evaluateSource(source);
  } else if(definition.$type === "url") {
    const fullpath = this.fullpath(value);
    const source = await this._readUrl(fullpath);
    output = await this._evaluateSource(source);
  } else if(definition.$type === "path") {
    const fullpath = this.fullpath(value);
    // @OJO: aquí habrá que mirar el settings.pathMode
    if(typeof require !== "undefined") {
      const source = await this._readFile(fullpath);
      output = await this._evaluateSource(source);
    } else {
      const source = await this._readUrl(fullpath);
      output = await this._evaluateSource(source);
    }
  }
  return output;
}