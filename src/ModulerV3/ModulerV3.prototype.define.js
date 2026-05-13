async function(options) {
  const definition = new ModulerV3.Definition({
    input: options,
    moduler: this,
  });
  await definition._lockProcess();
  await definition._validateDefineOptions();
  await definition._registerDefinition();
}