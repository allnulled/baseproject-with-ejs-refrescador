function (basedir = process.cwd()) {
  return this.findClosestWithFile(basedir, "looper.settings.js");
};