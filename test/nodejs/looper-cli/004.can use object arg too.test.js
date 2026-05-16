module.exports = async function({ LooperCli }) {

  const cli = LooperCli.create(__dirname + "/project1/cli").setSchema({
    file: {
      alias: "f",
      type: [LooperCli.type.String(),LooperCli.type.Null()],
      default: null,
    },
    mode: {
      alias: "mo",
      type: [LooperCli.type.Constant("binary"),LooperCli.type.Constant("utf8")],
      default: "utf8",
    },
    method: {
      alias: "me",
      type: [LooperCli.type.Constant("sync"),LooperCli.type.Constant("async"),],
      default: "async",
    },
    version: {
      alias: "v",
      type: [LooperCli.type.Boolean()],
      default: false,
    },
    list: {
      alias: "l",
      type: [LooperCli.type.Array()],
      default: [],
    }
  });

  const objectArg = {
    _: ["group1", "group2"],
    file: "file1",
    mode: "binary",
    method: "async",
    version: true,
    list: ["one", "two", "three"],
  };

  const output1 = await cli.dispatch(objectArg);
  const objectParsed = cli.parseCommandLineArguments(objectArg);
  const output2 = await cli.dispatch({ _: ["group1"] });
  
  LooperCli.assert(output1 === 400, "LooperCli.prototype.dispatch no está devolviendo los valores esperados (punto 1)");
  LooperCli.assert(output2 === 100, "LooperCli.prototype.dispatch no está devolviendo los valores esperados (punto 2)");
  
};