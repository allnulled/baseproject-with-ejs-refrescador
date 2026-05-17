() {
  this._trace("unglobalize");
  if(typeof this.previousGlobal !== "undefined") {
    GlobalModuler.set(this.previousGlobal);
  }
  return this;
}