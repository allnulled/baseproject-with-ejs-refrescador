module.exports = async function ({ ModulerV3 }) {
  const moduler = ModulerV3.create(__dirname + "/modules-3").globalize();
  const bundle = await moduler.bundle({
    uses: [
      { file: "defs-1.js" },
      { file: "defs-2.js" },
      { file: "defs-3.js" },
      { file: "defs-4.js" },
      { file: "defs-5.js" },
    ],
    factory(defs_1, defs_2, defs_3, defs_4, defs_5) {
      return define({
        module: {
          defs_1,
          defs_2,
          defs_3,
          defs_4,
          defs_5
        }
      });
    },
  });
  moduler.unglobalize();
  // console.log(bundle);
  // console.log(bundle.moduler.definitions);
  console.log(bundle.moduler.definitions);
  moduler.assert(Object.keys(bundle.moduler.definitions).length === 5, "bundler no ha registrado los módulos en test de «concat files on compile time» (punto 1)");
  await bundle.write({
    outFile: "case.003.output-1.dist.js"
  })
  /*
  console.log(bundle);
  console.log(bundle);
  console.log(bundle);
  console.log(bundle);
  console.log(bundle);
  moduler.assert(r1 === "aa", "mean tipo file no está inyectando el código o algo más genérico (punto 1)");
  moduler.assert(r2 === "bb", "mean tipo file no está inyectando el código o algo más genérico (punto 2)");
  moduler.assert(r3 === "cc", "mean tipo file no está inyectando el código o algo más genérico (punto 3)");
  moduler.assert(r4 === "ff", "mean tipo file no está inyectando el código o algo más genérico (punto 4)");
  moduler.assert(r5 === "gg", "mean tipo file no está inyectando el código o algo más genérico (punto 5)");
  //*/
}