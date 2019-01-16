const fs = require('fs');

if (typeof require !== "undefined") XLSX = require("xlsx");

// ===============================First doc =================

const TasksWorkBook = XLSX.readFile(
  "src/data/Tasks.xlsx"
);
const tasksRowsQuantity = 10;
const firstTaskRowNumber = 2;

const fieldMapping = {
  taskName: "A",
  taskStatus: "C"
};

const getTask = (sheet, currentRow) => {
  const task = {
    name: sheet[fieldMapping.taskName + currentRow].v,
    taskStatus: sheet[fieldMapping.taskStatus + currentRow].v
  };

  return task;
};

const getTasks = sheet => {
  const rows = [];
  for (i = firstTaskRowNumber; i <= tasksRowsQuantity; i++) {
    rows.push(i)
  };

  return rows.map(row => {
    return getTask(sheet, row);
  });
};

const sheet = TasksWorkBook.Sheets["Sheet1"];
const tasks = getTasks(sheet);

// ===============================Second doc =================

var scoreWorkbook = XLSX.readFile("src/data/Mentor score.xlsx");

const scoreRowsQuantity = 1865;
const firstScoreRowNumber = 2;
const sheetTitle = 'Form Responses 1';

const getRecord = (sheet, currentRow) => {
  const fieldMapping = {
    mentor: "B",
    student: "C",
    taskName: "D"
  };

  const record = {
    mentor: sheet[fieldMapping.mentor + currentRow].v,
    student: sheet[fieldMapping.student + currentRow].v,
    taskName: sheet[fieldMapping.taskName + currentRow].w
  };

  return record;
};

const getRecords = sheet => {
  const rows = [];
  for (i = firstScoreRowNumber; i <= scoreRowsQuantity; i++) {
    rows.push(i)
  };

  return rows.map(row => {
    return getRecord(sheet, row);
  });
};
const records = getRecords(scoreWorkbook.Sheets[sheetTitle]);

const results = records
  .map(record => {

    const task = tasks.find(w => w.name === record.taskName);
// need to repair bug with task names!
    if (!task) return;

    return {
      taskName: task.name,
      recordTaskName: record.taskName,
      taskStatus: task.taskStatus,
      mentor: record.mentor,
      student: record.student
    };
  })
  .filter(r => r);

const json = JSON.stringify(results, 0, 1);

fs.writeFile("src/data/data.json", json, "utf8", () => {
  console.log("writing is done!");
});

