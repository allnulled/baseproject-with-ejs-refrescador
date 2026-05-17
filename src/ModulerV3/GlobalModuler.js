if (typeof GlobalModuler === "undefined") {

  const GlobalModuler = class GlobalModuler {
    static instance = new ModulerV3();
    static set(newInstance) {
      GlobalModuler.instance = newInstance;
    }
    static define(...args) {
      return GlobalModuler.instance.define(...args);
    }
    static mean(...args) {
      return GlobalModuler.instance.mean(...args);
    }
  };

  if (typeof window !== 'undefined') {
    window.GlobalModuler = GlobalModuler;
    window.define = GlobalModuler.define;
    window.mean = GlobalModuler.mean;
  }
  if (typeof global !== 'undefined') {
    global.GlobalModuler = GlobalModuler;
    global.define = GlobalModuler.define;
    global.mean = GlobalModuler.mean;
  }
  

}