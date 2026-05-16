function(options) {
  const definition = ModulerV3.Definition.create(options);
  return ModulerV3.Registration.create(definition).commit();
}