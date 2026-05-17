(options) {
  this._trace("define", arguments, 2);
  const definition = new ModulerV3.Definition(options);
  this._tagType(definition);
  this._validateType(definition);
  this._validateNontype(definition);
  return this._registerDefinition(definition);
  /*
  const definition = ModulerV3.Definition.create(options);
  return ModulerV3.Registration.create(definition).commit();
  //*/
}