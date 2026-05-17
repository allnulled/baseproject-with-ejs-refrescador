module.exports = async function({ ModulerV3, SpeedObserver, Colors, settings, DevUtils }) {
  await DevUtils.expect.because("it cannot lazy load modules").toNotThrowAsync(async function() {
    const moduler = ModulerV3.create(__dirname);
    const m1 = await moduler.mean({ path: "modules/case.003/demo.1/entry.js" });
    // console.log(m1);
    const m2 = await moduler.mean({ module: 5000 });
    // console.log(m2);
  });
};