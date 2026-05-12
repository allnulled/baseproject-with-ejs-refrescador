module.exports = async function({ ModulerV3, SpeedObserver, Colors, settings }) {
  const moduler = ModulerV3.create(__dirname);
  await moduler.mean("modules/case.001.can be a library.test.js");
};