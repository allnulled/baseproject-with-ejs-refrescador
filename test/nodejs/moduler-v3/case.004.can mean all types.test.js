module.exports = async function({ ModulerV3 }) {
  const moduler = ModulerV3.create(__dirname + "/modules", { defaultMode:"file" });
  const r1 = await moduler.mean({ module: 1, as: "i1" });
  const r2 = await moduler.mean({ factory: () => 2, as: "i2" });
  moduler.assert(r1 === 1, "ModulerV3.prototype.mean tipo module no está funcionando como se espera (punto 1)")
  moduler.assert(r2 === 2, "ModulerV3.prototype.mean tipo factory no está funcionando como se espera (punto 1)")
  const r3 = await moduler.mean({ file: "case.004/ret-3.js", as: "i3" });
  const r4 = await moduler.mean({ path: "case.004/ret-4.js", as: "i4" });
  //console.log(r3);
  moduler.assert(r3 === 3, "ModulerV3.prototype.mean tipo file no está funcionando como se espera (punto 1)")
  moduler.assert(r4 === 4, "ModulerV3.prototype.mean tipo path no está funcionando como se espera (punto 1)")
  /*
  await moduler.mean({ path: "injections-4.js", as: "i4" });
  await moduler.mean({ url: "injections-4.js", as: "i4" });
  //*/
}