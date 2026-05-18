(obj, id) {
  let js = "";
  for(let prop in obj) {
    js += `const ${prop} = ${id}.${prop};\n`;
  }
  return js;
}