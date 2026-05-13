(function(factory) {
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
})(function() {

    const ModulerV3 = class ModulerV3 {
        static create = function(...args) {
            return new this(...args);
        };
        static Definition = class {
            constructor(extra = {}) {
                Object.assign(this, extra);
                if (!(typeof extra.moduler === "object")) throw new Error("required «moduler» as object on definition");
                if (!(extra.moduler instanceof ModulerV3)) throw new Error("required «moduler» as instance of ModulerV3 on definition");
            }
            assert = function(condition, message) {
                if (!condition) throw new Error("assertion error on «ModuleV3.Definition»: " + message);
            };
        };
        static Registration = class {
            constructor(definition = {}) {
                this.assert(typeof definition === "object", "definition must be object");
                this.assert(definition instanceof ModulerV3.Definition, "definition must be original instance");
                this.definition = definition;
            }
            assert = function(condition, message) {
                if (!condition) throw new Error("assertion error on «ModuleV3.Registration»: " + message);
            };
            commit = async function() {
                await this._lockProcess();
                await this._validateDefineOptions();
                await this._registerDefinition();
            };
            _lockProcess = function() {
                if (this._isLocked) {
                    throw new Error("definition cannot be overwritten");
                }
                this._isLocked = true;
            };
            _validateDefineOptions = function() {
                const possibleRequired = ["module", "factory", "url", "file", "path"];
                const definition = this.definition;
                Classifying_type:
                    if (typeof definition.type === "undefined") {
                        for (let index = 0; index < possibleRequired.length; index++) {
                            const requiredProp = possibleRequired[index];
                            if (requiredProp in definition) {
                                definition.type = requiredProp;
                                break Classifying_type;
                            }
                        }
                    }
                this.assert(typeof definition.type === "string", `required one of: ${possibleRequired.map(p => "«" + p + "»").join(" | ")}`);
                Validating_type: {
                    if (definition.type === "module") {
                        this.assert(typeof definition.module !== "undefined", `required «module» as not undefined when type is «module»`);
                    } else if (definition.type === "factory") {
                        this.assert(typeof definition.factory === "function", `required «factory» as function when type is «factory»`);
                    } else if (definition.type === "url") {
                        this.assert(typeof definition.url === "string", `required «url» as string when type is «url»`);
                    } else if (definition.type === "file") {
                        this.assert(typeof definition.file === "string", `required «file» as string when type is «file»`);
                    } else if (definition.type === "path") {
                        this.assert(typeof definition.path === "string", `required «path» as string when type is «path»`);
                    } else {
                        throw new Error(`type «${definition.type}» was not identified`);
                    }
                }
                Validating_other_properties: {
                    this.assert(["undefined", "function"].includes(typeof definition.getter), `required «getter» as function or undefined`);
                    this.assert(["undefined", "string"].includes(typeof definition.id), `required «id» as string or undefined`);
                    this.assert(["undefined", "string", "object"].includes(typeof definition.styles), `required «styles» as array, string or undefined`);
                    if (typeof definition.styles === "object") this.assert(Array.isArray(definition.styles), `required «styles» as array, string or undefined`);
                    this.assert(["undefined", "string", "object"].includes(typeof definition.category), `required «category» as array, string or undefined`);
                    if (typeof definition.category === "object") this.assert(Array.isArray(definition.category), `required «category» as array, string or undefined`);
                }
            };
            _registerDefinition = function() {
                //console.log(this.input);
            };
        };
        constructor(basedir) {
            this.assert(typeof basedir === "string", "basedir must be string");
            this.basedir = basedir;
            this.modules = {};
        }
        assert = function(condition, message) {
            if (!condition) throw new Error("assertion error on «ModuleV3»: " + message);
        };
        define = async function(options) {
            const definition = new ModulerV3.Definition({
                moduler: this,
                ...options,
            });
            const registration = new ModulerV3.Registration(definition);
            await registration.commit();
        };
        mean = function(id) {
            if (id in this.modules) {
                return this.modules[id].promise;
            }
            const record = {
                exports: {},
                promise: null,
            };
            this.modules[id] = record;
            record.promise = (async () => {
                const factory = await this.getFactoryOf(id);
                const output = await factory(record.exports);
                return record.exports;
            })();
            return record.promise;
        };
    };

    return ModulerV3;

});