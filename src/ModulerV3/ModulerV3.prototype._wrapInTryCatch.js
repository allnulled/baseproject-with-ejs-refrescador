(code) {
  let js = "";
  js += `try {`;
  js += `  ${code}`;
  js += `} catch(error) {`;
  js += `  console.log("[!] Failed JavaScript live evaluation:", error);`;
  js += `  throw error;`;
  js += `}`;
  return js;
}