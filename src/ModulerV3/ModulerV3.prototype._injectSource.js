(original) {
  const injections = ModulerV3.InjectionParser.create(original).parse();
  if(!injections.length) {
    return original;
  }
  let source = original;
  for(let indexInjection = injections.length-1; indexInjection >= 0; indexInjection--) {
    const injection = injections[indexInjection];
    const options = injection.options;
    const suboriginal = await this._readPath(injection.path);
    const subsource = await this._injectSource(suboriginal, options);
    let recomposition = "";
    recomposition += source.substr(0, injection.start);
    recomposition += subsource;
    recomposition += source.substr(injection.end);
    source = recomposition;
  }
  return source;
}