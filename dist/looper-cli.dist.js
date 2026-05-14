const LooperCli = class {
  static create = function(...args) {
  return new this(...args);
};
  static Schema = class Schema {
  static create(...args) {
    return new this(...args);
  }
  constructor(original) {
    this.original = original;
  }
  parse(schema = {}, args = undefined) {
    return LooperCli.parseCliArgs(schema, args);
  }
};
  static Type = class Type {
  static create(...args) {
    return new this(...args);
  }
  constructor(val) {
    this.val = val;
  }
};
  static type = {
  classes: {
    String: class extends this.Type {},
    Null: class extends this.Type {},
    Boolean: class extends this.Type {},
    Number: class extends this.Type {},
    Array: class extends this.Type {},
    Object: class extends this.Type {},
    Constant: class extends this.Type {},
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
  static castables = {
  "String": text => text,
  "Number": text => {
    const n = Number(text);
    if(Number.isNaN(n)) {
      throw new Error(`Cannot cast "${text}" to Number`);
    }
    return n;
  },
  "Boolean": text => {
    if(text === "true") return true;
    if(text === "false") return false;
    throw new Error(`Cannot cast "${text}" to Boolean`);
  },
  "Array": text => text,
  "Object": text => text,
  "Null": text => null,
  "Constant": text => text,
};
  static isCastableTo = function(arg, typeId, castproxy) {
  try {
    castproxy.casted = this.castables[typeId](arg);
    castproxy.type = typeId;
    return true;
  } catch (error) {
    return false;
  }
};
  static findClosestWithFile = function(basedir, file = "package.json") {
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
  return this.findClosestWithFile(basedir, "looper.settings.js");
};;
  constructor(basedir) {
    this.basedir = basedir;
    this.projectRoot = null;
  }
  static assert = function(condition, message) {
  if(!condition) throw new Error("assertion error on «LooperCli»: " + message);
};
  static parseCliArgs = function(schema = {}, argv = [...process.argv].slice(2)) {
  this.assert(typeof schema === "object" && schema !== null, "schema must be object");
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
        const castproxy = { type: undefined, casted: undefined };
        Iterating_types:
        for (let indexType = 0; indexType < validTypes.length; indexType++) {
          const validType = validTypes[indexType];
          if ((validType instanceof LooperCli.type.classes.String) && (this.isCastableTo(arg, "String", castproxy))) break Iterating_types;
          else if ((validType instanceof LooperCli.type.classes.Null) && (this.isCastableTo(arg, "Null", castproxy))) break Iterating_types;
          else if ((validType instanceof LooperCli.type.classes.Boolean) && (this.isCastableTo(arg, "Boolean", castproxy))) break Iterating_types;
          else if ((validType instanceof LooperCli.type.classes.Number) && (this.isCastableTo(arg, "Number", castproxy))) break Iterating_types;
          else if ((validType instanceof LooperCli.type.classes.Array) && (this.isCastableTo(arg, "Array", castproxy))) break Iterating_types;
          else if ((validType instanceof LooperCli.type.classes.Object) && (this.isCastableTo(arg, "Object", castproxy))) break Iterating_types;
          else if ((validType instanceof LooperCli.type.classes.Constant) && (this.isCastableTo(arg, "Constant", castproxy))) break Iterating_types;
          else console.log(validType);
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
};

module.exports = LooperCli;