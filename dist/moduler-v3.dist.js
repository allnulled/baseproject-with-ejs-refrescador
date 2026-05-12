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
        constructor(basedir) {
            this.basedir = basedir;
            this.modules = {};
        }
        assert = function(condition, message) {
            if (!condition) throw new Error(message);
        };
        require = function(id) {
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
        define = async function(userOptions) {
            const defineContext = {
                userOptions
            };
            await this.validateDefineOptions(defineContext);

        };
        validateDefineOptions = function(defineContext) {
            const possibleRequired = ["module", "factory", "url", "file", "path"];
            const {
                userOptions
            } = defineContext;
            if (typeof userOptions === "string") {
                defineContext.options = {
                    id: userOptions
                };
            } else if (typeof userOptions === "object") {
                defineContext.options = {
                    ...userOptions
                };
            } else throw new Error(`Invalid define options type «${typeof userOptions}»`);
            this.assert(typeof options.id === "string", "define requires property id");
            let hasType = false;
            Ierating_props:
                for (let prop in options) {
                    if (possibleRequired.includes(prop)) {
                        hasType = prop;
                        break Ierating_props;
                    }
                }
            this.assert(typeof hasType === "string", `define required type through any property of «${possibleRequired.join(",")}»`);
        };
    };

    return ModulerV3;

});