## Parsear argumentos de consola

```js
LooperCli.Schema.create({
  option1: {
    alias: "o1",
    default: "ok",
    type: [LooperCli.type.String()],
  }
}).parse(["command", "pos1", "pos2", "--opt1", "val1", "--opt2", "val2", "val3"]);
```

## Despachar comandos según directorio

```js
LooperCli.create(__dirname + "/home/of/commands").setSchema({
   option1: {
    alias: "o1",
    default: "ok",
    type: [LooperCli.type.String()],
  } 
}).parse(["command", "pos1", "pos2", "--opt1", "val1", "--opt2", "val2", "val3"]);
// enchufará: home/of/commands/command/pos1/pos2/command.js
```