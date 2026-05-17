const fs = require("fs/promises");
const path = require("path");
const NYC = require("nyc");
const { createInstrumenter } = require("istanbul-lib-instrument");

async function walk(dir) {
  const result = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...await walk(full));
      continue;
    }
    result.push(full);
  }
  return result;
}

module.exports = async function main(options) {
  const DevUtils = require(__dirname + "/../dev-utils.js");
  const coverageRoot = DevUtils.abs("dev/coverage");
  try {
    await fs.mkdir(DevUtils.abs("dev/coverage/dist"), { recursive: true });
  } catch (error) {
    
  }
  const list = await fs.readdir(coverageRoot, { withFileTypes: true });
  Iterating_files:
  for(let index=0; index<list.length; index++) {
    const fileInfo = list[index];
    if(fileInfo === "dist") {
      continue Iterating_files;
    }
    const fullpath = fileInfo.path;
    const subpath = DevUtils.abs("dev/coverage") + "/";
    if(!fullpath.startsWith(subpath)) {
      continue Iterating_files;
    }
    if(fileInfo.isFile()) {
      await fs.unlink(fullpath, "utf8");
    } else if(fileInfo.isDirectory()) {
      await fs.rmdir(fullpath, { recursive: true });
    }
  }
  const nyc = new NYC({
    cwd: coverageRoot,
    tempDirectory: ".nyc_output",
    ...options
  });
  const instrumenter = createInstrumenter();
  const files = await walk("dist");
  Instrumenting_files:
  for (const file of files) {
    // ESTE es el filtro REAL
    const output = path.join("dev/coverage", file);
    const itShould = nyc.exclude.shouldInstrument(output);
    if (!itShould) {
      continue Instrumenting_files;
    }
    await fs.mkdir(path.dirname(output), { recursive: true });
    const source = await fs.readFile(file, "utf8");
    const instrumented = await instrumenter.instrumentSync(source, file);
    await fs.writeFile(output, instrumented);
  }
  console.log(" 🎷 Successfully instrumented files");
};