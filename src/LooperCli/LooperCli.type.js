{
  classes: {
    String: class extends this.Type {
      static cast = (text) => text;
    },
    Null: class extends this.Type {
      static cast = (text) => null;
    },
    Boolean: class extends this.Type {
      static cast = (text) => {
        if(text === "true") return true;
        if(text === "false") return false;
        throw new Error(`Cannot cast "${text}" to Boolean`);
      }
    },
    Number: class extends this.Type {
      static cast = (text) => {
        const n = Number(text);
        if(Number.isNaN(n)) {
          throw new Error(`Cannot cast "${text}" to Number`);
        }
        return n;
      }
    },
    Array: class extends this.Type {
      static cast = (text) => text;
    },
    Object: class extends this.Type {
      static cast = (text) => text; 
    },
    Constant: class extends this.Type {
      static cast = (text) => text;
    },
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