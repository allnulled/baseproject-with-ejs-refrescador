(definition) {
  if(typeof definition.name === "string") {

  }
  this._tagMeaningStartedAt(definition);
  let dependencies = [];
  if(definition.uses && definition.uses.length) {
    for(let indexDependency=0; indexDependency<definition.uses.length; indexDependency++) {
      const dependencyDefinition = definition.uses[indexDependency];
      const dependencyMeaning = await this.mean(dependencyDefinition)
      dependencies.push(dependencyMeaning);
    }
  }
  const value = definition[definition.$type];
  let source = undefined;
  let output = undefined;
  if(definition.$type === "module") {
    output = value;
  } else if(definition.$type === "factory") {
    output = await this._evaluateFactory(value, dependencies, definition);
  } else if(definition.$type === "file") {
    const fullpath = this.fullpath(value);
    source = await this._readFile(fullpath);
    output = await this._evaluateSource(source);
  } else if(definition.$type === "url") {
    const fullpath = this.fullpath(value);
    source = await this._readUrl(fullpath);
    output = await this._evaluateSource(source);
  } else if(definition.$type === "path") {
    const fullpath = this.fullpath(value);
    // @OJO: aquí habrá que mirar el settings.pathMode
    if(typeof require !== "undefined") {
      source = await this._readFile(fullpath);
      output = await this._evaluateSource(source);
    } else {
      source = await this._readUrl(fullpath);
      output = await this._evaluateSource(source);
    }
  } else if(definition.$type === "name") {
    const realName = `name://${definition.name}`;
    this.assert(realName in this.definitions, `no module defined as «${definition.name}»`);
    output = this.definitions[realName]
    source = output.$source || undefined;
  } else {
    throw new Error("Type not detected by _loadDefinition");
  }
  this._tagOrder(definition);
  this._tagSource(definition, source);
  this._tagMeaningEndedAt(definition);
  // @DANGEROUSEMAXIMUTS:
  // @DANGEROUSEMAXIMUTS:
  // @DANGEROUSEMAXIMUTS:
  // @DANGEROUSEMAXIMUTS:
  if(output instanceof ModulerV3.Definition) {
    output = await this.mean(output);
  }
  // @DANGEROUSEMAXIMUTS:
  // @DANGEROUSEMAXIMUTS:
  // @DANGEROUSEMAXIMUTS:
  // @DANGEROUSEMAXIMUTS:
  return output;
}