(code) {
  this._trace("prototype._beautify");
  try {
    const beautify = require("js-beautify/js").js;
    const output = beautify(code);
    return output;
  } catch (error) {
    console.error(error);
    return code;
  }
}