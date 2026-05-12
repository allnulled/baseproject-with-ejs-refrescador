function(defineContext) {
  const possibleRequired = ["module", "factory", "url", "file", "path"];
  const { userOptions } = defineContext;
  if(typeof userOptions === "string") {
    defineContext.options = { id: userOptions };
  } else if(typeof userOptions === "object") {
    defineContext.options = { ...userOptions };
  } else throw new Error(`Invalid define options type «${typeof userOptions}»`);
  this.assert(typeof options.id === "string", "define requires property id");
  let hasType = false;
  Ierating_props:
  for(let prop in options) {
    if(possibleRequired.includes(prop)) {
      hasType = prop;
      break Ierating_props;
    }
  }
  this.assert(typeof hasType === "string", `define required type through any property of «${possibleRequired.join(",")}»`);
}