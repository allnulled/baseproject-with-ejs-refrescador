if (typeof PathLocator === "undefined")
    (function(factory) {
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
    })(function() {
        const PathLocator = class {
            static create = function(...args) {
                return new this(...args);
            };
            static isNodejs = (typeof global !== "undefined") && (typeof process !== "undefined") && (typeof require !== "undefined");
            static isBrowser = (typeof window !== "undefined") && (typeof document !== "undefined") && (typeof location !== "undefined");
            constructor(userBasedir = null) {
                this.basedir = userBasedir ? userBasedir : this.constructor.isNodejs ? process.cwd() : window.location.protocol + "://" + window.location.hostname + ":" + window.location.port + (window.location.path ? ("/" + window.location.path) : "");
            }
            static hi = function() {
                console.log("Hi")
            };
            assert(condition, message) {
                if (!condition) throw new Error("assertion error on «PathLocator»: " + message);
            };
            absolute = function(subpath) {
                this.assert(typeof subpath === "string", "subpath must be string");
                if (this.constructor.isNodejs) {
                    return require("path").resolve(this.basedir, subpath);
                }
                throw new Error("browser does not support PathLocator.prototype.absolute yet");
            };
            relative = function(subpath) {
                this.assert(typeof subpath === "string", "subpath must be string");
                if (this.constructor.isNodejs) {
                    return require("path").resolve(this.basedir, subpath).replace(this.basedir, "");
                }
                throw new Error("browser does not support PathLocator.prototype.relative yet");
            };
        };
        return PathLocator;
    });