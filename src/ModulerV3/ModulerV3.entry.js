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

  const ModulerV3 = class ModulerV3 {
    static create = <%-await inc("src/ModulerV3/ModulerV3.create.js")%>;
    static Definition = <%-await inc("src/ModulerV3/Definition.js")%>;
    static Registration = <%-await inc("src/ModulerV3/Registration.js")%>;
    <%-await inc("src/ModulerV3/ModulerV3.constructor.js")%>
    assert = <%-await inc("src/common/common.assert.js", { owner: "ModuleV3" })%>;
    define = <%-await inc("src/ModulerV3/ModulerV3.prototype.define.js")%>;
    mean = <%-await inc("src/ModulerV3/ModulerV3.prototype.mean.js")%>;
  };

  return ModulerV3;

});