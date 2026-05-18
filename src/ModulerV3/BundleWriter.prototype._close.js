(force = false) {
  this._trace("prototype._unblock");
  if(!force) {
    this.assert(this._state !== "available", "BundleWriter instance is already available");
  }
  this._state = "available";
}