module.exports = async function({ ModulerV3, SpeedObserver, Colors, settings, DevUtils }) {
  const moduler = ModulerV3.create(__dirname);
  await DevUtils.expect.because("define + mean can work with module + as").toNotThrowAsync(async () => {
    await moduler.define({ as: "some-module", module: 5 });
    const val1 = await moduler.mean({ name: "some-module" });
    moduler.assert(val1 === 5, "combo «define + module + name and then mean + name» should behave like a basic cache map");
  });
};