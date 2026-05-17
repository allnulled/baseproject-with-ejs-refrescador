(definition, options = {}) {
  this._trace("bundle", arguments, 2);
  const entryDefinition = await this.mean(definition);
  return ModulerV3.BundleWriter.create(this, entryDefinition, options);
}