(function(factory) {
    const mod = factory();
    if (typeof window !== 'undefined') {
        window['ModulerV3'] = mod;
    }
    if (typeof global !== 'undefined') {
        global['ModulerV3'] = mod;
    }
    if (typeof module !== 'undefined') {
        module.exports = mod;
    }
})(function() {

    const ModulerV3 = class ModulerV3 {

    };

});