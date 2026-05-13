async function(options) {
  const definition = new ModulerV3.Definition({
    moduler: this,
    ...options,
  });
  const registration = new ModulerV3.Registration(definition);
  await registration.commit();
}