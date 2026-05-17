class BundleWriter {
  static create = <%-await inc("src/common/common.static.create.js")%>;
  static _defaultOptions = <%-await inc("src/ModulerV3/BundleWriter._defaultOptions.js")%>;
  <%-await inc("src/ModulerV3/BundleWriter.constructor.js")%>
  _isTracing = <%-await inc("src/common/common._isTracing.js")%>;
  _trace<%-await inc("src/common/common._trace.js", { owner: "moduler-v3.bundle-writer" })%>;
  assert<%-await inc("src/common/common.assert.js", { owner: "ModuleV3.BundleWriter" })%>;
  async write<%-await inc("src/ModulerV3/BundleWriter.prototype.write.js")%>;
}