() {
  this._trace("globalize");
  this.previousGlobal = GlobalModuler.instance;
  GlobalModuler.set(this);
  return this;
}