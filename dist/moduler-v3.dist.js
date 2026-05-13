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
                this.assert(typeof extra.input === "object", "required «input» as object on definition");
                this.assert(typeof extra.moduler === "object", "required «moduler» as object on definition");
                this.assert(extra.moduler instanceof ModulerV3, "required «moduler» as instance of ModulerV3 on definition");
            }
            assert = function(condition, message) {
                if (!condition) throw new Error("assertion error on «ModuleV3.Definition»: " + message);
            };
            _lockProcess = function() {
                if (this._isLocked) {
                    throw new Error("definition cannot be overwritten");
                }
                this._isLocked = true;
            };
            _validateDefineOptions = function() {
                const possibleRequired = ["module", "factory", "url", "file", "path"];
                Classifying_type:
                    if (typeof this.input.type !== "string") {
                        for (let index = 0; index < possibleRequired.length; index++) {
                            const requiredProp = possibleRequired[index];
                            if (requiredProp in this.input) {
                                this.type = requiredProp;
                                break Classifying_type;
                            }
                        }
                    } else {
                        this.type = this.input.type;
                    }
                this.assert(typeof this.type === "string", `required one of: ${possibleRequired.map(p => "«" + p + "»").join(" | ")}`);
                Validating_type: {
                    if (this.type === "module") {
                        this.assert(typeof this.input.module !== "undefined", `required «module» as not undefined`);
                    } else if (this.type === "factory") {
                        this.assert(typeof this.input.factory === "function", `required «factory» as function`);
                    } else if (this.type === "url") {
                        this.assert(typeof this.input.url === "string", `required «url» as string`);
                    } else if (this.type === "file") {
                        this.assert(typeof this.input.file === "string", `required «file» as string`);
                    } else if (this.type === "path") {
                        this.assert(typeof this.input.path === "string", `required «path» as string`);
                    } else {
                        throw new Error(`type «${this.type}» was not identified`);
                    }
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
                input: options,
                moduler: this,
            });
            await definition._lockProcess();
            await definition._validateDefineOptions();
            await definition._registerDefinition();
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