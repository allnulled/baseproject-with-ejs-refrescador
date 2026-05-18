(code) {
  let js = "";
  js += `(async function() {\n`;
  js += `  ${code}`;
  js += `\n})()`;
  return js;
}