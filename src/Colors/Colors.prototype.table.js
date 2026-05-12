function table(listOfColumns, options = {}) {
  const Table = require("cli-table3");
  const table = new Table(options);
  table.push(...listOfColumns);
  return table.toString();
}