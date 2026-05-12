async function(userOptions) {
  const defineContext = { userOptions };
  await this._validateDefineOptions(defineContext);
  await this._registerDefinition(defineContext);
}