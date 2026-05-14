module.exports = async function({ LooperCli }) {
  const cli = LooperCli.create();
  const schema = new LooperCli.Schema({
    file: {
      alias: "f",
      type: [
        LooperCli.type.String(),
        LooperCli.type.Null()
      ],
      default: null,
    },
    mode: {
      alias: "md",
      type: [
        LooperCli.type.Constant("binary"),
        LooperCli.type.Constant("utf8")
      ],
      default: "utf8",
    },
    method: {
      alias: "mt",
      type: [
        LooperCli.type.Constant("sync"),
        LooperCli.type.Constant("async"),
      ],
      default: "async",
    },
    version: {
      alias: "v",
      type: [
        LooperCli.type.Boolean()
      ],
      default: "async",
    },
  });

  const args = schema.parse({
    file: {
      alias: "f",
      type: [LooperCli.type.Array()],
      default: [],
    }
  }, ["command", "--file", "f1", "f2", "f3"]);

  LooperCli.assert(typeof args === "object", "LooperCli.Schema.prototype.parse should return object");
  LooperCli.assert(typeof args._ === "object", "args._ should be object");
  LooperCli.assert(args._[0] === "command", "args._[0] should be 'command'");
  LooperCli.assert(typeof args.file === "object", "args.file should be object");
  LooperCli.assert(args.file[0] === "f1", "args.file[0] should be 'f1'");
  LooperCli.assert(args.file[1] === "f2", "args.file[0] should be 'f2'");
  LooperCli.assert(args.file[2] === "f3", "args.file[0] should be 'f3'");
  
};