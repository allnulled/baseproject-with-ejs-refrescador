async function dispatch(argv = [...process.argv].splice(2)) {
  const fs = require("fs");
  const path = require("path");
  this.assert(typeof argv === "object", `parameter «argv» must be object`);
  const args = Array.isArray(argv) ? LooperCli.parseCommandLineArguments(this.schema.original, argv) : argv;
  const commandRel = path.join(args._.join("/"), "command.js");
  const commandPath = path.resolve(this.basedir, commandRel);
  Comprobar_que_hay_comando: {
    try {
      await fs.promises.readFile(commandPath);
    } catch (error) {
      if (error.code === "ENOENT") {
        throw new Error(`no command found for «${commandRel}»`);
      }
      throw error;
    }
  }
  Ejecutar_comando_si_es_funcion: {
    const commandCallback = require(commandPath);
    if (typeof commandCallback === "function") {
      return await commandCallback(args);
    }
    return await commandCallback;
  }
};