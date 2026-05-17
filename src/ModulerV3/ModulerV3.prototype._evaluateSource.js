(original, args = {}) {
  const source = await this._injectSource(original);
  const keys = Object.keys(args);
  const values = Object.values(args);
  const safeSource = this._wrapInTryCatch(source);
  const asyncCallback = new ((async function() {}).constructor)(...keys, safeSource);
  // console.log(source);
  return await asyncCallback(...values);
}