module.exports = async function({ ModulerV3, SpeedObserver, Colors, settings, testUtils }) {
  const moduler = ModulerV3.create(__dirname);
  const expectations = [
    ["defining module only with id should throw", async () => { return await moduler.define({ id: "some-module" }); }, false],
    ["defining module only with path should not throw", async () => { return await moduler.define({ path: "some-module" }); }, true],
    ["defining module only with file should not throw", async () => { return await moduler.define({ file: "some-module" }); }, true],
    ["defining module only with module should not throw", async () => { return await moduler.define({ module: "some-module" }); }, true],
    ["defining module only with url should not throw", async () => { return await moduler.define({ url: "some-module" }); }, true],
    ["defining module only with factory should not throw", async () => { return await moduler.define({ factory: function() {} }); }, true],
    ["defining module only with factory as non-function should throw", async () => { return await moduler.define({ factory: "some-module" }); }, false],
    ["defining module only with path as non-string should throw", async () => { return await moduler.define({ path: function() {} }); }, false],
    ["defining module only with file as non-string should throw", async () => { return await moduler.define({ file: function() {} }); }, false],
    ["defining module only with url as non-string should throw", async () => { return await moduler.define({ url: function() {} }); }, false],
  ];
  for(let index=0; index<expectations.length; index++) {
    const [reason, callback, isSafe = false] = expectations[index];
    if(!isSafe) await testUtils.expect.because(reason).toThrowAsync(callback);
    else await testUtils.expect.because(reason).toNotThrowAsync(callback);
  }
};