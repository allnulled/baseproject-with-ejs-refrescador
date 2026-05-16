module.exports = async function (files = process.argv.splice(2)) {
  const makeSync = true;
  const DevUtils = require(__dirname + "/../dev-utils.js");
  const { projectRoot, methods, settings } = DevUtils;
  const builders = settings.buildTargets.map(([input, output]) => methods.buildSource(input, output));
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
