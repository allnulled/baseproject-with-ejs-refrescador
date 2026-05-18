constructor(basedirInput = null, settings = {}) {
  const basedir = basedirInput === null ? typeof require !== "undefined" ? process.cwd() : `${window.location.protocol}://${window.location.host}:${window.location.port}/${window.location.path}` : basedirInput;
  this.assert(typeof basedir === "string", "basedir must be string");
  this.basedir = basedir;
  this.definitions = {};
  this.settings = settings;
  this.counter = 0;
}