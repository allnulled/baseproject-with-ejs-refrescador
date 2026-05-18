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
    if (typeof global !== "undefined") global.die = (...args) => {
        console.log(...args);
        process.exit(1);
    };
    const ModulerV3 = class ModulerV3 {
        static create = function(...args) {
            return new this(...args);
        };
        static Definition = class ModulerV3Definition {
            static create = function(...args) {
                return new this(...args);
            }
            constructor(extra = {}) {
                Object.assign(this, extra);
                this.$definitionStartedAt = new Date();
            }
        };
        static InjectionParser = class InjectionParser {
            static TOKENS = [
                "/* @inject.source(",
                "// @inject.source(",
                "inject.source("
            ];
            static create(code) {
                return new this(code);
            }
            constructor(code) {
                this.code = code;
                this.i = 0;
            }
            parse() {
                const results = [];
                this.i = 0;
                while (!this.eof()) {
                    const tokenInfo = this.findNextToken();
                    if (!tokenInfo) {
                        break;
                    }
                    const {
                        token,
                        start
                    } = tokenInfo;
                    this.i = start + token.length;
                    const tokenStart = start;
                    this.skipSpaces();
                    const path = this.parseString();
                    this.skipSpaces();
                    let options = null;
                    if (this.peek() === ",") {
                        this.next();
                        this.skipSpaces();
                        options = this.parseBalanced();
                    }
                    this.skipSpaces();
                    if (this.peek() === ")") {
                        this.next();
                    }
                    // cerrar comentario multilinea
                    this.skipSpaces();
                    if (
                        token.startsWith("/*") &&
                        this.code.slice(this.i, this.i + 2) === "*/"
                    ) {
                        this.i += 2;
                        Linter_bypassers: {
                            if (this.code.slice(this.i, this.i + 1) === "0") {
                                this.i += 1;
                            }
                            if (this.code.slice(this.i, this.i + 1) === "nulo") {
                                this.i += 4;
                            }
                        }
                    }
                    const tokenEnd = this.i;
                    results.push({
                        path,
                        options,
                        start: tokenStart,
                        end: tokenEnd,
                        raw: this.code.slice(tokenStart, tokenEnd)
                    });
                }
                return results;
            }
            // =====================================================
            // TOKEN SEARCH
            // =====================================================
            findNextToken() {
                let bestIndex = Infinity;
                let bestToken = null;
                for (const token of this.constructor.TOKENS) {
                    const idx = this.code.indexOf(token, this.i);
                    if (idx !== -1 && idx < bestIndex) {
                        bestIndex = idx;
                        bestToken = token;
                    }
                }
                if (bestToken === null) {
                    return null;
                }
                return {
                    token: bestToken,
                    start: bestIndex
                };
            }
            // =====================================================
            // CORE
            // =====================================================
            eof() {
                return this.i >= this.code.length;
            }
            peek(offset = 0) {
                return this.code[this.i + offset];
            }
            next() {
                return this.code[this.i++];
            }
            skipSpaces() {
                while (
                    !this.eof() &&
                    /\s/.test(this.peek())
                ) {
                    this.i++;
                }
            }
            // =====================================================
            // STRING
            // =====================================================
            parseString() {
                const quote = this.peek();
                if (
                    quote !== '"' &&
                    quote !== "'" &&
                    quote !== "`"
                ) {
                    throw new Error(`Expected string at ${this.i}`);
                }
                this.next();
                let result = "";
                while (!this.eof()) {
                    const c = this.next();
                    // escape
                    if (c === "\\") {
                        result += c;
                        if (!this.eof()) {
                            result += this.next();
                        }
                        continue;
                    }
                    // close
                    if (c === quote) {
                        return result;
                    }
                    result += c;
                }
                throw new Error("Unexpected EOF while parsing string");
            }
            // =====================================================
            // BALANCED
            // =====================================================
            parseBalanced() {
                const start = this.peek();
                if (!"([{".includes(start)) {
                    throw new Error(`Expected balanced structure at ${this.i}`);
                }
                const stack = [start];
                let result = this.next();
                while (!this.eof()) {
                    const c = this.next();
                    result += c;
                    // ==========================================
                    // STRING MODE
                    // ==========================================
                    if (
                        c === '"' ||
                        c === "'" ||
                        c === "`"
                    ) {
                        result += this.consumeString(c);
                        continue;
                    }
                    // ==========================================
                    // OPEN
                    // ==========================================
                    if (
                        c === "(" ||
                        c === "[" ||
                        c === "{"
                    ) {
                        stack.push(c);
                        continue;
                    }
                    // ==========================================
                    // CLOSE
                    // ==========================================
                    if (
                        c === ")" ||
                        c === "]" ||
                        c === "}"
                    ) {
                        const last =
                            stack[stack.length - 1];
                        if (!this.matches(last, c)) {
                            throw new Error(`Unexpected closing token "${c}" at ${this.i}`);
                        }
                        stack.pop();
                        if (stack.length === 0) {
                            return result;
                        }
                    }
                }
                throw new Error("Unexpected EOF while parsing balanced structure");
            }
            consumeString(quote) {
                let result = "";
                while (!this.eof()) {
                    const c = this.next();
                    result += c;
                    if (c === "\\") {
                        if (!this.eof()) {
                            result += this.next();
                        }
                        continue;
                    }
                    if (c === quote) {
                        return result;
                    }
                }
                throw new Error("Unexpected EOF inside string");
            }
            matches(open, close) {
                return (
                    (open === "(" && close === ")") ||
                    (open === "[" && close === "]") || (open === "{" && close === "}"));
            }
        };
        static BundleWriter = class BundleWriter {
            static create = function(...args) {
                return new this(...args);
            };
            static _defaultOptions = {
                // REQUIRED
                outFile: false,
                outDir: false,
                // OPTIONAL
                compilationMode: "concat",
            };
            constructor(moduler = null) {
                this._trace("constructor");
                this.assert(typeof moduler === "object", "required «moduler» as object");
                this.assert(moduler instanceof ModulerV3, "required «moduler» as instance of ModulerV3");
                this.moduler = moduler;
            }
            _isTracing = false;
            _trace(method, args = [], debug = 0) {
                if (this._isTracing) {
                    if (debug <= 0 || typeof debug !== "number") {
                        console.log(`[trace][moduler-v3.bundle-writer] ${method} args=${args.length}`);
                    } else if (debug === 1) {
                        console.log(`[trace][moduler-v3.bundle-writer] ${method} args=[${[...args].map((arg,i) => (i+1) + "=" + typeof arg).join(",")}]`);
                    } else if (debug === 2) {
                        console.log(`[trace][moduler-v3.bundle-writer] ${method} args=`, Object.assign({}, [...args]));
                    } else if (debug > 2) {
                        console.log(`[trace][moduler-v3.bundle-writer] ${method} args=`, JSON.stringify(Object.assign([...args]), null, 2));
                    }
                }
            };
            assert(condition, message) {
                if (!condition) throw new Error("assertion error on «ModuleV3.BundleWriter»: " + message);
            };
            async write(optionsInput = {}) {
                this._trace("prototype.write");
                this.assert(typeof optionsInput === "object", "required «options» as object");
                const options = Object.assign({}, BundleWriter._defaultOptions, optionsInput);
                const toFile = typeof options.outFile === "string";
                const toDir = typeof options.outDir === "string"
                this.assert(toFile || toDir, "required «options.outFile» or «options.outDir» as string");
            };
        };
        constructor(basedirInput = null, settings = {}) {
            const basedir = basedirInput === null ? typeof require !== "undefined" ? process.cwd() : `${window.location.protocol}://${window.location.host}:${window.location.port}/${window.location.path}` : basedirInput;
            this.assert(typeof basedir === "string", "basedir must be string");
            this.basedir = basedir;
            this.definitions = {};
            this.settings = settings;
            this.counter = 0;
        }
        _isTracing = false;
        _trace(method, args = [], debug = 0) {
            if (this._isTracing) {
                if (debug <= 0 || typeof debug !== "number") {
                    console.log(`[trace][moduler-v3] ${method} args=${args.length}`);
                } else if (debug === 1) {
                    console.log(`[trace][moduler-v3] ${method} args=[${[...args].map((arg,i) => (i+1) + "=" + typeof arg).join(",")}]`);
                } else if (debug === 2) {
                    console.log(`[trace][moduler-v3] ${method} args=`, Object.assign({}, [...args]));
                } else if (debug > 2) {
                    console.log(`[trace][moduler-v3] ${method} args=`, JSON.stringify(Object.assign([...args]), null, 2));
                }
            }
        };
        assert(condition, message) {
            if (!condition) throw new Error("assertion error on «ModuleV3»: " + message);
        };
        addSettings(settings = {}) {
            this._trace("addSettings", arguments, 2);
            Object.assign(this.settings, settings);
            return this;
        };
        define(options) {
            this._trace("define", arguments, 2);
            const definition = new ModulerV3.Definition(options);
            this._tagType(definition);
            this._validateType(definition);
            this._validateNontype(definition);
            return this._registerDefinition(definition);
        };
        async mean(options) {
            this._trace("mean", arguments, 1);
            this.assert(typeof options === "object", "required «options» as object on ModulerV3.prototype.mean");
            const definition = options instanceof ModulerV3.Definition ? options : await this.define(options);
            const meaning = await this._loadDefinition(definition);
            return meaning;
            Si_es_string:
                if (typeof options === "id") {
                    Devolver_cacheado_si_escaece: if (id in this.modules) {
                        return this.modules[id].promise;
                    }
                }
            let record = undefined;
            Registrar_modulo_al_inicio: {
                record = {
                    exports: {},
                    promise: null,
                };
                this.modules[id] = record;
            }
            Iniciar_promesa: {
                record.promise = (async () => {
                    const factory = await this.resolveDefinitionById(id);
                    const output = await factory(record.exports);
                    return record.exports;
                })();
            }
            Devolver_promesa: {
                return record.promise;
            }
        };
        fullpath(subpath) {
            this._trace("fullpath", arguments, 2);
            return require("path").resolve(this.basedir, subpath);
        };
        async bundle(definition, options = {}) {
            this._trace("bundle", arguments, 2);
            const moduler = ModulerV3.create(this.basedir).addSettings({
                saveSources: true
            });
            await moduler.mean(definition);
            return ModulerV3.BundleWriter.create(moduler);
        };
        globalize() {
            this._trace("globalize");
            this.previousGlobal = GlobalModuler.instance;
            GlobalModuler.set(this);
            return this;
        };
        unglobalize() {
            this._trace("unglobalize");
            if (typeof this.previousGlobal !== "undefined") {
                GlobalModuler.set(this.previousGlobal);
            }
            return this;
        };
        _tagType(definition) {
            const possibleRequired = ["module", "factory", "url", "file", "path", "name"];
            Classifying_type:
                if (typeof definition.$type === "undefined") {
                    for (let index = 0; index < possibleRequired.length; index++) {
                        const requiredProp = possibleRequired[index];
                        if (requiredProp in definition) {
                            this.assert(typeof definition.$type === "undefined", `ambiguous definition type due to «${definition.$type}» and «${requiredProp}=${definition[requiredProp]}»`);
                            definition.$type = requiredProp;
                        }
                    }
                }
            this.assert(typeof definition.$type === "string", `property required in definition: ${possibleRequired.map(p => "«" + p + "»").join(" or ")}`);
        };
        _tagOrder(definition) {
            definition.$order = this.counter++;
        };
        _tagSource(definition, source) {
            if (this.settings.saveSources === true) {
                definition.$source = source;
            }
            this._tagDefinitionEndedAt(definition);
        };
        _tagMeaningStartedAt(definition) {
            // definition.$meaningStartedAt = new Date();
        };
        _tagMeaningEndedAt(definition) {
            // definition.$meaningEndedAt = new Date();
        };
        _tagDefinitionStartedAt(definition) {
            // definition.$definitionStartedAt = new Date();
        };
        _tagDefinitionEndedAt(definition) {
            // definition.$definitionEndedAt = new Date();
        };
        _validateType(definition) {
            if (definition.$type === "module") {
                this.assert(typeof definition.module !== "undefined", `required «module» as not undefined when type is «module»`);
            } else if (definition.$type === "factory") {
                this.assert(typeof definition.factory === "function", `required «factory» as function when type is «factory»`);
            } else if (definition.$type === "url") {
                this.assert(typeof definition.url === "string", `required «url» as string when type is «url»`);
            } else if (definition.$type === "file") {
                this.assert(typeof definition.file === "string", `required «file» as string when type is «file»`);
            } else if (definition.$type === "path") {
                this.assert(typeof definition.path === "string", `required «path» as string when type is «path»`);
            } else if (definition.$type === "name") {
                this.assert(typeof definition.name === "string", `required «name» as string when type is «name»`);
            } else {
                throw new Error(`type «${definition.$type}» was not identified`);
            }
        };
        _validateNontype(definition) {
            this.assert(["undefined", "function"].includes(typeof definition.getter), `required «getter» as function or undefined`);
            this.assert(["undefined", "string"].includes(typeof definition.id), `required «id» as string or undefined`);
            this.assert(["undefined", "string", "object"].includes(typeof definition.styles), `required «styles» as array, string or undefined`);
            if (typeof definition.styles === "object") this.assert(Array.isArray(definition.styles), `required «styles» as array, string or undefined`);
            this.assert(["undefined", "string", "object"].includes(typeof definition.category), `required «category» as array, string or undefined`);
            if (typeof definition.category === "object") this.assert(Array.isArray(definition.category), `required «category» as array, string or undefined`);
        };
        _registerDefinition(definition) {
            const ids = [];
            Registrar_definicion_por_tipo_si_escaece: {
                if (["path", "file", "url"].includes(definition.$type)) {
                    const id = `${definition.$type}://${definition[definition.$type]}`;
                    if (id in this.definitions) throw new Error(`duplicated module id «${id}»`);
                    this.definitions[id] = definition;
                    ids.push(id);
                }
            }
            Registrar_definicion_por_name_si_escaece: {
                if (typeof definition.as === "string") {
                    const id = `name://${definition.as}`;
                    if (id in this.definitions) throw new Error(`duplicated module id «${id}»`);
                    this.definitions[id] = definition;
                    ids.push(id);
                }
            }
            if (ids.length) {
                definition.$ids = ids;
            }
            return definition;
        };
        async _loadDefinition(definition) {
            if (typeof definition.name === "string") {

            }
            this._tagMeaningStartedAt(definition);
            let dependencies = [];
            if (definition.uses && definition.uses.length) {
                for (let indexDependency = 0; indexDependency < definition.uses.length; indexDependency++) {
                    const dependencyDefinition = definition.uses[indexDependency];
                    const dependencyMeaning = await this.mean(dependencyDefinition)
                    dependencies.push(dependencyMeaning);
                }
            }
            const value = definition[definition.$type];
            let source = undefined;
            let output = undefined;
            if (definition.$type === "module") {
                output = value;
            } else if (definition.$type === "factory") {
                output = await this._evaluateFactory(value, dependencies, definition);
            } else if (definition.$type === "file") {
                const fullpath = this.fullpath(value);
                source = await this._readFile(fullpath);
                output = await this._evaluateSource(source);
            } else if (definition.$type === "url") {
                const fullpath = this.fullpath(value);
                source = await this._readUrl(fullpath);
                output = await this._evaluateSource(source);
            } else if (definition.$type === "path") {
                const fullpath = this.fullpath(value);
                // @OJO: aquí habrá que mirar el settings.pathMode
                if (typeof require !== "undefined") {
                    source = await this._readFile(fullpath);
                    output = await this._evaluateSource(source);
                } else {
                    source = await this._readUrl(fullpath);
                    output = await this._evaluateSource(source);
                }
            } else if (definition.$type === "name") {
                const realName = `name://${definition.name}`;
                this.assert(realName in this.definitions, `no module defined as «${definition.name}»`);
                output = this.definitions[realName]
                source = output.$source || undefined;
            } else {
                throw new Error("Type not detected by _loadDefinition");
            }
            this._tagOrder(definition);
            this._tagSource(definition, source);
            this._tagMeaningEndedAt(definition);
            // @DANGEROUSEMAXIMUTS:
            // @DANGEROUSEMAXIMUTS:
            // @DANGEROUSEMAXIMUTS:
            // @DANGEROUSEMAXIMUTS:
            if (output instanceof ModulerV3.Definition) {
                output = await this.mean(output);
            }
            // @DANGEROUSEMAXIMUTS:
            // @DANGEROUSEMAXIMUTS:
            // @DANGEROUSEMAXIMUTS:
            // @DANGEROUSEMAXIMUTS:
            return output;
        };
        _evaluateFactory(callback, dependencies, definition) {
            return callback(...dependencies.concat([definition, this]));
        };
        _wrapInTryCatch(code) {
            let js = "";
            js += `try {`;
            js += `  ${code}`;
            js += `} catch(error) {`;
            js += `  console.log("[!] Failed JavaScript live evaluation:", error);`;
            js += `  throw error;`;
            js += `}`;
            return js;
        };
        _wrapInAsyncCall(code) {
            let js = "";
            js += `(async function() {\n`;
            js += `  ${code}`;
            js += `\n})()`;
            return js;
        };
        __interprint(arg) {
            console.log(arg);
            return arg;
        };
        _destructureObjectToJs(obj, id) {
            let js = "";
            for (let prop in obj) {
                js += `const ${prop} = ${id}.${prop};\n`;
            }
            return js;
        };
        async _evaluateSource($_EVALUATION_ORIGINAL_SOURCE, $_EVALUATION_CALLBACK_ARGUMENTS = {}, $_MAKE_AS_ASYNC_FUNCTION = false) {
            const $_EVALUATION_PRODUCED_SOURCE = await this._injectSource($_EVALUATION_ORIGINAL_SOURCE);
            const $_EVALUATION_CALLBACK_ARGUMENT_KEYS = Object.keys($_EVALUATION_CALLBACK_ARGUMENTS);
            const $_EVALUATION_SAFE_SOURCE = this._wrapInTryCatch($_EVALUATION_PRODUCED_SOURCE);
            if ($_MAKE_AS_ASYNC_FUNCTION) {
                const $_EVALUATION_ASYNC_CALLBACK = new((async function() {}).constructor)(...$_EVALUATION_CALLBACK_ARGUMENT_KEYS, $_EVALUATION_SAFE_SOURCE);
                return $_EVALUATION_ASYNC_CALLBACK(...Object.values($_EVALUATION_CALLBACK_ARGUMENTS));
            } else {
                return eval(this._wrapInAsyncCall(this._destructureObjectToJs($_EVALUATION_CALLBACK_ARGUMENTS, "$_EVALUATION_CALLBACK_ARGUMENTS") + $_EVALUATION_SAFE_SOURCE));
            }
        };
        async _injectSource(original) {
            const injections = ModulerV3.InjectionParser.create(original).parse();
            if (!injections.length) {
                return original;
            }
            let source = original;
            for (let indexInjection = injections.length - 1; indexInjection >= 0; indexInjection--) {
                const injection = injections[indexInjection];
                const options = injection.options;
                const suboriginal = await this._readPath(injection.path);
                const subsource = await this._injectSource(suboriginal, options);
                let recomposition = "";
                recomposition += source.substr(0, injection.start);
                recomposition += subsource;
                recomposition += source.substr(injection.end);
                source = recomposition;
            }
            return source;
        };
        _readFile(subpath) {
            return require("fs/promises").readFile(this.fullpath(subpath), "utf8");
        };
        _readUrl(subpath) {
            return fetch(this.fullpath(subpath), {
                method: "GET"
            }).then(response => response.text());
        };
        _readPath(subpath) {
            if (this.settings.pathMode === "file") {
                return this._readFile(subpath);
            } else if (this.settings.pathMode === "url") {
                return this._readUrl(subpath);
            } else if (typeof require === "function") {
                return this._readFile(subpath);
            }
            return this._readUrl(subpath);
        };
    };
    return ModulerV3;
});
if (typeof GlobalModuler === "undefined") {

    const GlobalModuler = class GlobalModuler {
        static instance = new ModulerV3();
        static set(newInstance) {
            GlobalModuler.instance = newInstance;
        }
        static define(...args) {
            return GlobalModuler.instance.define(...args);
        }
        static mean(...args) {
            return GlobalModuler.instance.mean(...args);
        }
    };

    if (typeof window !== 'undefined') {
        window.GlobalModuler = GlobalModuler;
        window.define = GlobalModuler.define;
        window.mean = GlobalModuler.mean;
    }
    if (typeof global !== 'undefined') {
        global.GlobalModuler = GlobalModuler;
        global.define = GlobalModuler.define;
        global.mean = GlobalModuler.mean;
    }


}