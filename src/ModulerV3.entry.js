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
    <%-await inc("src/ModulerV3/ModulerV3.constructor.js")%>
    assert = <%-await inc("src/ModulerV3/ModulerV3.prototype.assert.js")%>;
    require = <%-await inc("src/ModulerV3/ModulerV3.prototype.require.js")%>;
    define = <%-await inc("src/ModulerV3/ModulerV3.prototype.define.js")%>;
    validateDefineOptions = <%-await inc("src/ModulerV3/ModulerV3.prototype.validateDefineOptions.js")%>;
  };

  return ModulerV3;

});