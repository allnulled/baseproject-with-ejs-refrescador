module.exports = async function({ ModulerV3, SpeedObserver, Colors, settings, DevUtils }) {
  const moduler = ModulerV3.create(__dirname);
  const expectations = [
    ["defining module only with id and module can be used as cache", async () => {
      await moduler.define({ id: "some-module", module: 5 });
      const val1 = await moduler.mean({ id: "some-module" });
      moduler.assert(val1 === 5, "combo «define + module + id and then mean + id» should behave like a basic cache map");
    }, false],
  ];
  for(let index=0; index<expectations.length; index++) {
    const [reason, callback, isSafe = false] = expectations[index];
    if(!isSafe) await DevUtils.expect.because(reason).toThrowAsync(callback);
    else await DevUtils.expect.because(reason).toNotThrowAsync(callback);
  }
};