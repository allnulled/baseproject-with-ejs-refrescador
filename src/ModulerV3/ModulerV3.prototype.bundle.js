(definition, options = {}) {
  this._trace("bundle", arguments, 2);
  const moduler = ModulerV3.create(this.basedir).addSettings({ saveSources: true });
  await moduler.mean(definition);
  return ModulerV3.BundleWriter.create(moduler);
}