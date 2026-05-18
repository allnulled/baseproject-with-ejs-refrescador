(force = false) {
  this._trace("prototype._block");
  if(!force) {
    this.assert(this._state === "available", "BundleWriter instance is busy right now");
  }
  this._state = "blocked";
}