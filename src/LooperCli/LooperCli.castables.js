{
  "String": text => text,
  "Number": text => {
    const n = Number(text);
    if(Number.isNaN(n)) {
      throw new Error(`Cannot cast "${text}" to Number`);
    }
    return n;
  },
  "Boolean": text => {
    if(text === "true") return true;
    if(text === "false") return false;
    throw new Error(`Cannot cast "${text}" to Boolean`);
  },
  "Array": text => text,
  "Object": text => text,
  "Null": text => null,
  "Constant": text => text,
}