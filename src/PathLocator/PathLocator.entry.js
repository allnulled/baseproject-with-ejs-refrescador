if(typeof PathLocator === "undefined")
(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['PathLocator'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['PathLocator'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  const PathLocator = class {
    static create = <%-await inc("src/common/common.static.create.js")%>;
    static isNodejs = <%-await inc("src/common/common.isNodejs.js")%>;
    static isBrowser = <%-await inc("src/common/common.isBrowser.js")%>;
    constructor(userBasedir = null) {
      this.basedir = userBasedir ? userBasedir : this.constructor.isNodejs ? process.cwd() : window.location.protocol + "://" + window.location.hostname + ":" + window.location.port + (window.location.path ? ("/" + window.location.path) : "");
    }
    static hi = function() {console.log("Hi")};
    assert = <%-await inc("src/common/common.assert.js", { owner: "PathLocator" })%>;
    absolute = <%-await inc("src/PathLocator/PathLocator.prototype.absolute.js")%>;
    relative = <%-await inc("src/PathLocator/PathLocator.prototype.relative.js")%>;
  };
  return PathLocator;
});