function(schema = {}, argv = [...process.argv].slice(2)) {
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
}