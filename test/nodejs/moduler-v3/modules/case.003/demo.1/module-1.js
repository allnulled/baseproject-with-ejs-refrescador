define({
  name: "demo.1",
  uses: [
    "case.003/demo.1/module-1.js",
    "case.003/demo.1/module-2.js",
  ],
  factory: function(module1, module2) {
    return module1 + "." + module2;
  }
});