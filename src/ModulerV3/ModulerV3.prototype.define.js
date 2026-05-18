(options) {
  this._trace("define", arguments, 2);
  const definition = new ModulerV3.Definition(options);
  this._tagType(definition);
  this._validateType(definition);
  this._validateNontype(definition);
  return this._registerDefinition(definition);
}