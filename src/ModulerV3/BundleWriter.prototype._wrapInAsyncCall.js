(code) {
  this._trace("prototype._wrapInAsyncCall");
  let js = "";
  js += `(async function() {\n`;
  js += `  ${code}\n`;
  js += `})();\n`;
  return js;
}