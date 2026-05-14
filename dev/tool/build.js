module.exports = async function (files = process.argv.splice(2)) {
  const makeSync = true;
  const [file] = files;
  if(typeof file !== "string") throw new Error("required file to be string");
  if(file.includes("/dist")) return false;
  const DevUtils = require(__dirname + "/../dev-utils.js");
  const { projectRoot, methods, settings } = DevUtils;
  const builders = settings.buildTargets.map(targets => methods.buildSource(...targets));
  if(makeSync) {
    for(let index=0; index<builders.length; index++) {
      await builders[index];
    }
  } else {
    await Promise.all(builders);
  }
  await methods.instrumentSources();
  await methods.startTests();
};
