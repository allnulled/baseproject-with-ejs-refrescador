(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['SpeedObserver'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['SpeedObserver'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {

  

  const SpeedObserver = class SpeedObserver {
    static create = <%-await inc("src/SpeedObserver/SpeedObserver.create.js")%>;
    <%-await inc("src/SpeedObserver/SpeedObserver.constructor.js")%>
    start = <%-await inc("src/SpeedObserver/SpeedObserver.prototype.start.js")%>;
    stop = <%-await inc("src/SpeedObserver/SpeedObserver.prototype.stop.js")%>;
    print = <%-await inc("src/SpeedObserver/SpeedObserver.prototype.print.js")%>;
    save = <%-await inc("src/SpeedObserver/SpeedObserver.prototype.save.js")%>;
    report = <%-await inc("src/SpeedObserver/SpeedObserver.prototype.report.js")%>;
    static colors = Colors;
    static reportCollection = <%-await inc("src/SpeedObserver/SpeedObserver.reportCollection.js")%>;
  };

  return SpeedObserver;

});