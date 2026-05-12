module.exports = async function ({ ModulerV3, SpeedObserver }, { inc, abs }) {
  const fs = require("fs");
  const cr1 = SpeedObserver.create();
  const ciclos = 5000;
  const intentos = 4;
  for (let index = 0; index < intentos; index++) {
    cr1.start();
    for (let index = 0; index < ciclos; index++) {
      await fs.promises.readdir("/");
    }
    cr1.save(`Lectura de directorio en vuelta ${index}`);
    cr1.start();
    for (let index = 0; index < ciclos; index++) {
      await fs.promises.readFile(__filename, "utf8");
    }
    cr1.save(`Lectura de fichero utf8 en vuelta ${index}`);
    cr1.start();
    for (let index = 0; index < ciclos; index++) {
      await fs.promises.readFile(__filename);
    }
    cr1.save(`Lectura de fichero binario en vuelta ${index}`);
  }
  cr1.report();
}