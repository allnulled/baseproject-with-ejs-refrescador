function borderlessTable(listOfColumns, optionsObject = {}) {
  return this.alignTable(listOfColumns, 2, optionsObject);
},
visibleLength(str) {
  return require('strip-ansi').default(str).length;
},
alignTable(rows, gap = 2, max = {}) {
  for(let indexRow=0; indexRow<rows.length; indexRow++) {
    const row = rows[indexRow];
    for(let indexCol=0; indexCol<row.length; indexCol++) {
      const cell = row[indexCol];
      const cellLen = this.visibleLength(cell);
      if(!(indexCol in max)) {
        max[indexCol] = 5;
      }
      if(max[indexCol] < cellLen) {
        max[indexCol] = cellLen;
      }
    }
  }
  let out = "";
  for(let indexRow=0; indexRow<rows.length; indexRow++) {
    const row = rows[indexRow];
    for(let indexCol=0; indexCol<row.length; indexCol++) {
      const cell = row[indexCol];
      const currCellLen = this.visibleLength(cell);
      const cellLen = max[indexCol];
      const col = cell + " ".repeat(cellLen - currCellLen);
      if(indexCol !== 0) {
        out += " │ ";
      }
      out += col;
    }
    out += "\n";
  }
  return out.trimEnd();
}