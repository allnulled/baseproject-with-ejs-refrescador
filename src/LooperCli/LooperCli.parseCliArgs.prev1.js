function(schema = {}, argv = [...process.argv].slice(2)) {
  this.assert(typeof schema === "object" && schema !== null, "schema must be object");
  const parsed = { _: [] };
  const aliasMap = {};
  for (const key in schema) {
    const option = schema[key];
    this.assert(typeof option === "object" && option !== null, `schema option '${key}' must be object`);
    this.assert(Array.isArray(option.type), `'${key}.type' must be array`);
    if (option.alias) {
      aliasMap[option.alias] = key;
    }
    if ("default" in option) {
      parsed[key] = option.default;
    } else {
      parsed[key] = undefined;
    }
  }
  const castSingleValue = (raw, allowedTypes) => {
    for (const allowedType of allowedTypes) {
      if (allowedType instanceof LooperCli.type.classes.String) {
        return String(raw);
      }
      if (allowedType instanceof LooperCli.type.classes.Number) {
        const num = Number(raw);
        if (!Number.isNaN(num)) {
          return num;
        }
      }
      if (allowedType instanceof LooperCli.type.classes.Boolean) {
        if (raw === true || raw === "true" || raw === "1") {
          return true;
        }
        if (raw === false || raw === "false" || raw === "0") {
          return false;
        }
      }
      if (allowedType instanceof LooperCli.type.classes.Null) {
        if (raw === null || raw === "null") {
          return null;
        }
      }
      if (allowedType instanceof LooperCli.type.classes.Constant) {
        if (raw === String(allowedType.val)) {
          return allowedType.val;
        }
      }
    }
    throw new Error(`Cannot cast value '${raw}'`);
  };
  const isArrayType = (option) => {
    return option.type.some(t =>t instanceof LooperCli.type.classes.Array);
  };
  const filteredTypes = (option) => {
    const types = option.type.filter(t =>!(t instanceof LooperCli.type.classes.Array));
    // Array() => Array<String>
    if (types.length === 0) {
      return [LooperCli.type.String()];
    }
    return types;
  };
  let positionalMode = false;
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token === "--") {
      positionalMode = true;
      continue;
    }
    if (positionalMode || !token.startsWith("-")) {
      parsed._.push(token);
      continue;
    }
    let name;
    if (token.startsWith("--")) {
      name = token.slice(2);
      this.assert(name in schema, `Unknown option '--${name}'`);
    } else {
      const alias = token.slice(1);
      this.assert(alias in aliasMap, `Unknown alias '-${alias}'`);
      name = aliasMap[alias];
    }
    const option = schema[name];
    const isBooleanOnly =option.type.length === 1 &&option.type[0] instanceof LooperCli.type.classes.Boolean;
    if (isBooleanOnly) {
      parsed[name] = true;
      continue;
    }
    // ARRAY
    if (isArrayType(option)) {
      parsed[name] = [];
      while (i + 1 < argv.length) {
        const next = argv[i + 1];
        if (next.startsWith("-")) {
          break;
        }
        i++;
        parsed[name].push(castSingleValue(next,filteredTypes(option)));
      }
      continue;
    }
    // SINGLE VALUE
    const next = argv[++i];
    this.assert(next !== undefined,`Missing value for '${token}'`);
    parsed[name] = castSingleValue(next,filteredTypes(option));
  }
  return parsed;
}