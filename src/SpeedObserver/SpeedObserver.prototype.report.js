function() {
  const minPad = 13;
  const minStyle = "underline,bold,greenBright";
  const minStyleName = "greenBright";
  const maxStyle = "underline,bold,redBright";
  const maxStyleName = "redBright";
  let max = 0;
  let min = Infinity;
  let maxOpLength = 0;
  for (let index = 0; index < this.records.length; index++) {
    const { op, ms } = this.records[index];
    if (ms > max) max = ms;
    if (ms < min) min = ms;
    if (op.length > maxOpLength) maxOpLength = op.length;
  }
  for (let index = 0; index < this.records.length; index++) {
    const record = this.records[index];
    const { op, ms } = record;
    record.percentageMin = (((ms / min) * 100)).toFixed(2);
    record.percentageMax = (((ms / max) * 100)).toFixed(2);
    let opColumn = `  [*] Operation «${op}»:`.padEnd(maxOpLength + 22);
    let msColumn = `${ms} ms`.padStart(minPad);
    const isMin = record.percentageMin === "100.00";
    const isMax = record.percentageMax === "100.00";
    if(isMin) {
      const minColumn = SpeedObserver.colors.style(minStyleName).text(` ${record.percentageMin} %`.padStart(minPad));
      const maxColumn = ` ${record.percentageMax} %`.padStart(minPad);
      opColumn = SpeedObserver.colors.style(minStyle).text(opColumn);
      msColumn = SpeedObserver.colors.style(minStyle).text(msColumn);
      const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn} │`;
      const formatted = msg;
      console.log(formatted);
    } else if(isMax) {
      const minColumn = ` ${record.percentageMin} %`.padStart(minPad);
      const maxColumn = SpeedObserver.colors.style(maxStyleName).text(` ${record.percentageMax} %`.padStart(minPad));
      opColumn = SpeedObserver.colors.style(maxStyle).text(opColumn);
      msColumn = SpeedObserver.colors.style(maxStyle).text(msColumn);
      const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn} │`;
      const formatted = msg;
      console.log(formatted);
    } else {
      const maxColumn = ` ${record.percentageMax} %`.padStart(minPad);
      const minColumn = ` ${record.percentageMin} %`.padStart(minPad);
      const msg = `${opColumn} │ ${msColumn} │ ${minColumn} │ ${maxColumn} │`;
      console.log(msg);
    }
  }
}