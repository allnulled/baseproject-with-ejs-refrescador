(function (factory) {
  const mod = factory();
  if (typeof window !== 'undefined') {
    window['Colors'] = mod;
  }
  if (typeof global !== 'undefined') {
    global['Colors'] = mod;
  }
  if (typeof module !== 'undefined') {
    module.exports = mod;
  }
})(function () {
  
  return <%-await inc("src/SpeedObserver/SpeedObserver.colors.js") %>

});