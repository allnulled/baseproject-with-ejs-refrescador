() {
  if(this._isLocked) {
    throw new Error("definition cannot be overwritten");
  }
  this._isLocked = true;
}