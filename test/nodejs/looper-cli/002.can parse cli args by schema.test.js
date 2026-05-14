module.exports = async function({ LooperCli }) {
  const args = LooperCli.Schema.create({
    file: {
      alias: "f",
      type: [
        LooperCli.type.String(),
        LooperCli.type.Null()
      ],
      default: null,
    },
    list: {
      alias: "l",
      type: [
        LooperCli.type.Array(),
      ],
      default: [],
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
  }).parse(["command", "--list", "f1", "f2", "f3"]);

  LooperCli.assert(typeof args === "object", "LooperCli.Schema.prototype.parse should return object");
  LooperCli.assert(typeof args._ === "object", "args._ should be object");
  LooperCli.assert(args._[0] === "command", "args._[0] should be 'command'");
  LooperCli.assert(typeof args.list === "object", "args.list should be object");
  LooperCli.assert(args.list[0] === "f1", "args.list[0] should be 'f1'");
  LooperCli.assert(args.list[1] === "f2", "args.list[0] should be 'f2'");
  LooperCli.assert(args.list[2] === "f3", "args.list[0] should be 'f3'");

  const args2 = LooperCli.Schema.create({
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
  }).parse(["comando", "--bool", "true", "false", "--string", "testo", "testo2", "--array", "v1", "v2", "-n", "800"]);

  LooperCli.assert(typeof args2 === "object", "LooperCli.Schema.prototype.parse should return object");
  LooperCli.assert(typeof args2._ === "object", "args2._ should be object");
  LooperCli.assert(args2._[0] === "comando", "args2._[0] should be 'comando'");
  LooperCli.assert(args2.bool === false, "args2.bool should be false");
  LooperCli.assert(args2.string === "testo2", "args2.string should be 'testo2'");
  LooperCli.assert(args2.array.length === 2, "args2.array.length should be 2");

};