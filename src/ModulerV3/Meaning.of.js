(options) {
  const definition = ModulerV3.Definition.create(options);
  const registration = ModulerV3.Registration.create(definition);
  registration._tagType(options);
  registration._validateType(options);
  registration._validateNontype(options);
  
}