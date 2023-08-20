const Table = require("cli-table");

// function generateView will generate cli table ui

const generateView = (tableContructor, tableContent, tableTitle) => {
  const mainTable = new Table(tableContructor);
  tableContent.forEach((item) => {
    mainTable.push(item);
  });
  console.log("");
  console.log(" " + tableTitle);
  console.log(mainTable.toString());
};

module.exports = {
  generateView,
};
