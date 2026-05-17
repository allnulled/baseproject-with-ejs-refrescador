module.exports = async function ({ ModulerV3 }) {
  const moduler1 = ModulerV3.create(__dirname + "/modules-1");
  const r1 = await moduler1.mean({ file: "injections-1.js", as: "i1" });
  const r2 = await moduler1.mean({ file: "injections-2.js", as: "i2" });
  const r3 = await moduler1.mean({ file: "injections-3.js", as: "i3" });
  const r4 = await moduler1.mean({ file: "injections-4.js", as: "i4" });
  const r5 = await moduler1.mean({ file: "injections-5.js", as: "i5" });
  moduler1.assert(r1 === "aa", "mean tipo file no está inyectando el código o algo más genérico (punto 1)");
  moduler1.assert(r2 === "bb", "mean tipo file no está inyectando el código o algo más genérico (punto 2)");
  moduler1.assert(r3 === "cc", "mean tipo file no está inyectando el código o algo más genérico (punto 3)");
  moduler1.assert(r4 === "ff", "mean tipo file no está inyectando el código o algo más genérico (punto 4)");
  moduler1.assert(r5 === "gg", "mean tipo file no está inyectando el código o algo más genérico (punto 5)");
  const moduler2 = ModulerV3.create(__dirname + "/modules-1");
  const output2 = await moduler2.mean({
    uses: [
      { file: "injections-1.js" },
      { file: "injections-2.js" },
      { file: "injections-3.js" },
      { file: "injections-4.js" },
      { file: "injections-5.js" },
    ],
    factory(injections_1, injections_2, injections_3, injections_4, injections_5) {
      return {
        injections_1,
        injections_2,
        injections_3,
        injections_4,
        injections_5,
      };
    }
  });
  moduler1.assert(output2.injections_1 === "aa", "mean tipo file con uses + remote returns + factory no está funcionando como se espera (punto 1)");
  moduler1.assert(output2.injections_2 === "bb", "mean tipo file con uses + remote returns + factory no está funcionando como se espera (punto 2)");
  moduler1.assert(output2.injections_3 === "cc", "mean tipo file con uses + remote returns + factory no está funcionando como se espera (punto 3)");
  moduler1.assert(output2.injections_4 === "ff", "mean tipo file con uses + remote returns + factory no está funcionando como se espera (punto 4)");
  moduler1.assert(output2.injections_5 === "gg", "mean tipo file con uses + remote returns + factory no está funcionando como se espera (punto 5)");
  
}