const XLSX = require('xlsx');

const scoreWorkbook = XLSX.readFile('src/data/Mentor score.xlsx');
const sheetTitle = 'Form Responses 1';
const sheet = scoreWorkbook.Sheets[sheetTitle];
const scoreRowsQuantity = 1865;
const firstScoreRowNumber = 2;

const getRecord = (currentRow) => {
  const fieldMapping = {
    mentor: 'B',
    student: 'C',
    taskName: 'D',
  };

  const record = {
    mentor: sheet[fieldMapping.mentor + currentRow].v,
    student: sheet[fieldMapping.student + currentRow].v,
    taskName: sheet[fieldMapping.taskName + currentRow].w,
  };

  return record;
};

exports.getRecords = () => {
  const rows = [];
  for (let i = firstScoreRowNumber; i <= scoreRowsQuantity; i++) {
    rows.push(i);
  }

  return rows.map(row => getRecord(row));
};
