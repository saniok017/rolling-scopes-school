const XLSX = require('xlsx');

const TasksWorkBook = XLSX.readFile('src/data/Tasks.xlsx');
const sheet = TasksWorkBook.Sheets.Sheet1;
const tasksRowsQuantity = 10;
const firstTaskRowNumber = 2;

const getTask = (currentRow) => {
  const fieldMapping = {
    taskName: 'A',
    taskStatus: 'C',
  };

  const task = {
    name: sheet[fieldMapping.taskName + currentRow].v,
    taskStatus: sheet[fieldMapping.taskStatus + currentRow].v,
  };

  return task;
};

exports.getTasks = () => {
  const rows = [];
  for (let i = firstTaskRowNumber; i <= tasksRowsQuantity; i++) {
    rows.push(i);
  }

  return rows.map(row => getTask(row));
};
