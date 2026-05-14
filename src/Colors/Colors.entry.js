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
  
  return Object.assign(<%-await inc("src/Colors/Colors.original.js") %>, {
    table: <%-await inc("src/Colors/Colors.prototype.table.js") %>,
    borderlessTable: <%-await inc("src/Colors/Colors.prototype.borderlessTable.js") %>,
    padLinesToMax: <%-await inc("src/Colors/Colors.prototype.padLinesToMax.js") %>,
  });

});