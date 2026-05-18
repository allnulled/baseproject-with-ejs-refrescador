class BundleWriter {
  static create = <%-await inc("src/common/common.static.create.js")%>;
  static _defaultOptions = <%-await inc("src/ModulerV3/BundleWriter._defaultOptions.js")%>;
  <%-await inc("src/ModulerV3/BundleWriter.constructor.js")%>
  _isTracing = <%-await inc("src/common/common._isTracing.js")%>;
  _trace<%-await inc("src/common/common._trace.js", { owner: "moduler-v3.bundle-writer" })%>;
  assert<%-await inc("src/common/common.assert.js", { owner: "ModuleV3.BundleWriter" })%>;
  async write<%-await inc("src/ModulerV3/BundleWriter.prototype.write.js")%>;
  async _analyze<%-await inc("src/ModulerV3/BundleWriter.prototype._analyze.js")%>;
  async _persist<%-await inc("src/ModulerV3/BundleWriter.prototype._persist.js")%>;
  _block<%-await inc("src/ModulerV3/BundleWriter.prototype._block.js")%>;
  _close<%-await inc("src/ModulerV3/BundleWriter.prototype._close.js")%>;
  _wrapInAsyncCall<%-await inc("src/ModulerV3/BundleWriter.prototype._wrapInAsyncCall.js")%>;
  _beautify<%-await inc("src/ModulerV3/BundleWriter.prototype._beautify.js")%>;
  fullpath<%-await inc("src/ModulerV3/ModulerV3.prototype.fullpath.js")%>;
}