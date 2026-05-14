{
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
}