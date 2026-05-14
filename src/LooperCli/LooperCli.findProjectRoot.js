function (basedir = process.cwd()) {
  return this.findClosestDirectoryWithFile(basedir, "looper.settings.js");
};