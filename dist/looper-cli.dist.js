const LooperCli = class {
  static create = function(...args) {
  return new this(...args);
};
  static Schema = class Schema {
  static create = function(...args) {
  return new this(...args);
};
  constructor(original) {
  this.original = original;
};
  parse = function (args = undefined) {
  return LooperCli.parseCommandLineArguments(this.original, args);
};
};
  static Type = class Type {
  static create(...args) {
    return new this(...args);
  }
  constructor(val) {
  this.val = val;
};
};
  static type = {
  classes: {
    String: class extends this.Type {
      static cast = (text) => text;
    },
    Null: class extends this.Type {
      static cast = (text) => null;
    },
    Boolean: class extends this.Type {
      static cast = (text) => {
        if(text === "true") return true;
        if(text === "false") return false;
        throw new Error(`Cannot cast "${text}" to Boolean`);
      }
    },
    Number: class extends this.Type {
      static cast = (text) => {
        const n = Number(text);
        if(Number.isNaN(n)) {
          throw new Error(`Cannot cast "${text}" to Number`);
        }
        return n;
      }
    },
    Array: class extends this.Type {
      static cast = (text) => text;
    },
    Object: class extends this.Type {
      static cast = (text) => text; 
    },
    Constant: class extends this.Type {
      static cast = (text) => text;
    },
  },
  Null: function(...args) {
    return new LooperCli.type.classes.Null(...args);
  },
  Constant: function(...args) {
    return new LooperCli.type.classes.Constant(...args);
  },
  String: function(...args) {
    return new LooperCli.type.classes.String(...args);
  },
  Boolean: function(...args) {
    return new LooperCli.type.classes.Boolean(...args);
  },
  Number: function(...args) {
    return new LooperCli.type.classes.Number(...args);
  },
  Array: function(...args) {
    return new LooperCli.type.classes.Array(...args);
  },
  Object: function(...args) {
    return new LooperCli.type.classes.Object(...args);
  },
};
  static isCastableTo = function(arg, typeId, castproxy) {
  try {
    castproxy.casted = this.type.classes[typeId].cast(arg);
    castproxy.type = typeId;
    return true;
  } catch (error) {
    return false;
  }
};
  static findClosestDirectoryWithFile = function(basedir, file = "package.json") {
  const fs = require("fs");
  const path = require("path");
  let dir = basedir;
  let previousDir = null;
  do {
    try {
      const filepath = path.resolve(dir, file);
      fs.readFileSync(filepath);
      this.projectRoot = dir;
      return dir;
    } catch (error) {
      previousDir = dir;
      dir = path.dirname(dir);
    }
  } while (dir !== previousDir);
  return null;
};
  static findProjectRoot = function (basedir = process.cwd()) {
  return this.findClosestDirectoryWithFile(basedir, "looper.settings.js");
};;
  static assert = function(condition, message) {
  if(!condition) throw new Error("assertion error on «LooperCli»: " + message);
};
  static parseCommandLineArguments = function(schema = {}, argv = [...process.argv].splice(2)) {
  this.assert(typeof schema === "object" && schema !== null, "schema must be object");
  this.assert(!Array.isArray(schema), "schema must be object but not array");
  const parsed = { _: [] };
  const aliasMap = {};
  Collecting_aliases_and_setting_defaults:
  for (const key in schema) {
    const option = schema[key];
    this.assert(typeof option === "object" && option !== null, `schema option '${key}' must be object`);
    this.assert(Array.isArray(option.type), `'${key}.type' must be array`);
    if (option.alias) aliasMap[option.alias] = key;
    if ("default" in option) parsed[key] = option.default;
    else parsed[key] = undefined;
  }
  Parsing_arguments:
  if (Array.isArray(argv)) {
    let current = "_";
    Iterating_args:
    for (let index = 0; index < argv.length; index++) {
      const arg = argv[index];
      if (arg.startsWith("--")) {
        const optionId = arg.substr(2);
        this.assert(optionId in schema, `unknown option «${arg}» (case 1)`);
        current = optionId;
        continue Iterating_args;
      } else if (arg.startsWith("-")) {
        const optionId = aliasMap[arg.substr(1)];
        this.assert(optionId in schema, `unknown short option «${arg}» (case 2)`);
        this.assert(optionId in schema, `unknown option «${optionId}» (case 3)`);
        current = optionId;
        continue Iterating_args;
      } else {
        if (current === "_") {
          parsed._.push(arg);
          continue Iterating_args;
        }
        this.assert(current in schema, `unknown option «${current}» (case 4)`);
        const validTypes = schema[current].type;
        const typeClasses = LooperCli.type.classes;
        const castproxy = { type: undefined, casted: undefined };
        Iterating_types:
        for (let indexType = 0; indexType < validTypes.length; indexType++) {
          const validType = validTypes[indexType];
          if ((validType instanceof typeClasses.String) && (this.isCastableTo(arg, "String", castproxy))) break Iterating_types;
          else if ((validType instanceof typeClasses.Null) && (this.isCastableTo(arg, "Null", castproxy))) break Iterating_types;
          else if ((validType instanceof typeClasses.Boolean) && (this.isCastableTo(arg, "Boolean", castproxy))) break Iterating_types;
          else if ((validType instanceof typeClasses.Number) && (this.isCastableTo(arg, "Number", castproxy))) break Iterating_types;
          else if ((validType instanceof typeClasses.Array) && (this.isCastableTo(arg, "Array", castproxy))) break Iterating_types;
          else if ((validType instanceof typeClasses.Object) && (this.isCastableTo(arg, "Object", castproxy))) break Iterating_types;
          else if ((validType instanceof typeClasses.Constant) && (this.isCastableTo(arg, "Constant", castproxy))) break Iterating_types;
          else throw new Error(`property «type» on index «${index}» is not a valid type class on option «${current}»`);
        }
        this.assert(castproxy.type !== "undefined", `option «${current}» now of type «${typeof arg}» must be one of «${validTypes.map(t => t.constructor.name).join("|")}»`);
        if (castproxy.type === "Array") parsed[current].push(castproxy.casted);
        else parsed[current] = castproxy.casted;
      }
    }
  } else if (typeof argv === "object") {
    Object.assign(parsed, argv);
  } else throw new Error("parameter «argv» must be array or object");
  return parsed;
};
  constructor(basedir) {
  this.basedir = basedir;
  this.projectRoot = null;
  this._schema = null;
};
  assert = function(condition, message) {
  if(!condition) throw new Error("assertion error on «LooperCli.prototype»: " + message);
};
  setSchema = function(schema) {
  this.schema = new LooperCli.Schema(schema);
  return this;
};
  dispatch = async function dispatch(argv = [...process.argv].splice(2)) {
  const fs = require("fs");
  const path = require("path");
  this.assert(typeof argv === "object", `parameter «argv» must be object`);
  const args = Array.isArray(argv) ? LooperCli.parseCommandLineArguments(this.schema.original, argv) : argv;
  const commandRel = path.join(args._.join("/"), "command.js");
  const commandPath = path.resolve(this.basedir, commandRel);
  let commandCallback = undefined;
  try {
    await fs.promises.readFile(commandPath);
    commandCallback = require(commandPath);
  } catch (error) {
    if(error.code === "ENOENT") {
      throw new Error(`no command found for «${commandRel}»`);
    }
    throw error;
  }
  if(typeof commandCallback === "function") {
    return await commandCallback(args);
  }
  return await commandCallback;
};;
};

module.exports = LooperCli;