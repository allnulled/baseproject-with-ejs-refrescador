(settings = {}) {
  this._trace("addSettings", arguments, 2);
  Object.assign(this.settings, settings);
  return this;
}