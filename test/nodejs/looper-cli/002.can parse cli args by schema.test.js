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

  const args2 = schema.parse({
    bool: {
      alias: "b",
      type: [LooperCli.type.Boolean()],
      default: null,
    },
    string: {
      alias: "s",
      type: [LooperCli.type.String()],
      default: "defaultz",
    },
    array: {
      alias: "a",
      type: [LooperCli.type.Array()],
      default: [],
    },
    number: {
      alias: "n",
      type: [LooperCli.type.Number()],
      default: 0,
    },
    option: {
      alias: "o",
      type: [LooperCli.type.Constant("x"), LooperCli.type.Constant("y")],
      default: "z",
    }
  }, ["comando", "--bool", "true", "false", "--string", "testo", "testo2", "--array", "v1", "v2", "-n", "800"]);

  LooperCli.assert(typeof args2 === "object", "LooperCli.Schema.prototype.parse should return object");
  LooperCli.assert(typeof args2._ === "object", "args2._ should be object");
  LooperCli.assert(args2._[0] === "comando", "args2._[0] should be 'comando'");
  LooperCli.assert(args2.bool === false, "args2.bool should be false");
  LooperCli.assert(args2.string === "testo2", "args2.string should be 'testo2'");
  LooperCli.assert(args2.array.length === 2, "args2.array.length should be 2");
  
};