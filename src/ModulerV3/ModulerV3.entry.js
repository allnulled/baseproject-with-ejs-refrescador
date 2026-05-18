(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['ModulerV3'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['ModulerV3'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  if(typeof global !== "undefined") global.die = (...args) => { console.log(...args); process.exit(1); };
  const ModulerV3 = class ModulerV3 {
    static create = <%-await inc("src/common/common.static.create.js")%>;
    static Definition = <%-await inc("src/ModulerV3/Definition.js")%>;
    static InjectionParser = <%-await inc("src/ModulerV3/InjectionParser.js")%>;
    static BundleWriter = <%-await inc("src/ModulerV3/BundleWriter.js")%>;
    <%-await inc("src/ModulerV3/ModulerV3.constructor.js")%>
    _isTracing = <%-await inc("src/common/common._isTracing.js")%>;
    _trace<%-await inc("src/common/common._trace.js", { owner: "moduler-v3" })%>;
    assert<%-await inc("src/common/common.assert.js", { owner: "ModuleV3" })%>;
    addSettings<%-await inc("src/ModulerV3/ModulerV3.prototype.addSettings.js")%>;
    define<%-await inc("src/ModulerV3/ModulerV3.prototype.define.js")%>;
    async mean<%-await inc("src/ModulerV3/ModulerV3.prototype.mean.js")%>;
    fullpath<%-await inc("src/ModulerV3/ModulerV3.prototype.fullpath.js")%>;
    async bundle<%-await inc("src/ModulerV3/ModulerV3.prototype.bundle.js")%>;
    globalize<%-await inc("src/ModulerV3/ModulerV3.prototype.globalize.js")%>;
    unglobalize<%-await inc("src/ModulerV3/ModulerV3.prototype.unglobalize.js")%>;
    _tagType<%-await inc("src/ModulerV3/ModulerV3.prototype._tagType.js")%>;
    _tagOrder<%-await inc("src/ModulerV3/ModulerV3.prototype._tagOrder.js")%>;
    _tagSource<%-await inc("src/ModulerV3/ModulerV3.prototype._tagSource.js")%>;
    _tagMeaningStartedAt<%-await inc("src/ModulerV3/ModulerV3.prototype._tagMeaningStartedAt.js")%>;
    _tagMeaningEndedAt<%-await inc("src/ModulerV3/ModulerV3.prototype._tagMeaningEndedAt.js")%>;
    _tagDefinitionStartedAt<%-await inc("src/ModulerV3/ModulerV3.prototype._tagDefinitionStartedAt.js")%>;
    _tagDefinitionEndedAt<%-await inc("src/ModulerV3/ModulerV3.prototype._tagDefinitionEndedAt.js")%>;
    _validateType<%-await inc("src/ModulerV3/ModulerV3.prototype._validateType.js")%>;
    _validateNontype<%-await inc("src/ModulerV3/ModulerV3.prototype._validateNontype.js")%>;
    _registerDefinition<%-await inc("src/ModulerV3/ModulerV3.prototype._registerDefinition.js")%>;
    async _loadDefinition<%-await inc("src/ModulerV3/ModulerV3.prototype._loadDefinition.js")%>;
    _evaluateFactory<%-await inc("src/ModulerV3/ModulerV3.prototype._evaluateFactory.js")%>;
    _wrapInTryCatch<%-await inc("src/ModulerV3/ModulerV3.prototype._wrapInTryCatch.js")%>;
    _wrapInAsyncCall<%-await inc("src/ModulerV3/ModulerV3.prototype._wrapInAsyncCall.js")%>;
    __interprint<%-await inc("src/ModulerV3/ModulerV3.prototype.__interprint.js")%>;
    _destructureObjectToJs<%-await inc("src/ModulerV3/ModulerV3.prototype._destructureObjectToJs.js")%>;
    async _evaluateSource<%-await inc("src/ModulerV3/ModulerV3.prototype._evaluateSource.js")%>;
    async _injectSource<%-await inc("src/ModulerV3/ModulerV3.prototype._injectSource.js")%>;
    _readFile<%-await inc("src/ModulerV3/ModulerV3.prototype._readFile.js")%>;
    _readUrl<%-await inc("src/ModulerV3/ModulerV3.prototype._readUrl.js")%>;
    _readPath<%-await inc("src/ModulerV3/ModulerV3.prototype._readPath.js")%>;
  };
  return ModulerV3;  
});
<%-await inc("src/ModulerV3/GlobalModuler.js") %>