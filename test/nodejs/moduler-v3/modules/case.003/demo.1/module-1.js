define({
  as: "demo.1/module-1",
  uses: [
    { path: "modules/case.003/demo.1/module-1.js" },
    { path: "modules/case.003/demo.1/module-2.js" },
  ],
  factory: function(module1, module2) {
    return module1 + "." + module2;
  }
});