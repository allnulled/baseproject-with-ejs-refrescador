function padLinesToMax(text) {
  const lines = text.split("\n");
  let out = "";
  let max = 0;
  for(let index=0; index<lines.length; index++) {
    const line = lines[index];
    if(max < line.length) {
      max = line.length;
    }
  }
  for(let index=0; index<lines.length; index++) {
    const line = lines[index];
    const padded = line.padEnd(max, " ");
    if(index !== 0) out += "\n";
    out += padded;
  }
  return out;
}