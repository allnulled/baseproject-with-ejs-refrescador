(method, args = [], debug = 0) {
  if(this._isTracing) {
    if(debug <= 0 || typeof debug !== "number") {
      console.log(`[trace]<%-typeof owner === "string" ? "[" + owner + "]" : ""%> ${method} args=${args.length}`);
    } else if(debug === 1) {
      console.log(`[trace]<%-typeof owner === "string" ? "[" + owner + "]" : ""%> ${method} args=[${[...args].map((arg,i) => (i+1) + "=" + typeof arg).join(",")}]`);
    } else if(debug === 2) {
      console.log(`[trace]<%-typeof owner === "string" ? "[" + owner + "]" : ""%> ${method} args=`,Object.assign({}, [...args]));
    } else if(debug > 2) {
      console.log(`[trace]<%-typeof owner === "string" ? "[" + owner + "]" : ""%> ${method} args=`,JSON.stringify(Object.assign([...args]), null, 2));
    }
  }
}