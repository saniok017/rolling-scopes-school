/* eslint-disable no-plusplus */
const fs = require('fs');
const _ = require('lodash');
const XLSX = require('xlsx');

// ===============================First doc =================

const TasksWorkBook = XLSX.readFile('src/data/Tasks.xlsx');
const tasksRowsQuantity = 10;
const firstTaskRowNumber = 2;

const getTask = (sheet, currentRow) => {
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

const getTasks = (sheet) => {
  const rows = [];
  for (let i = firstTaskRowNumber; i <= tasksRowsQuantity; i++) {
    rows.push(i);
  }

  return rows.map(row => getTask(sheet, row));
};

const tasks = getTasks(TasksWorkBook.Sheets.Sheet1);

// ===============================Second doc =================

const scoreWorkbook = XLSX.readFile('src/data/Mentor score.xlsx');
const scoreRowsQuantity = 1865;
const firstScoreRowNumber = 2;
const sheetTitle = 'Form Responses 1';

const getRecord = (sheet, currentRow) => {
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

const getRecords = (sheet) => {
  const rows = [];
  for (let i = firstScoreRowNumber; i <= scoreRowsQuantity; i++) {
    rows.push(i);
  }

  return rows.map(row => getRecord(sheet, row));
};
const records = getRecords(scoreWorkbook.Sheets[sheetTitle]);

// =============================== Third Doc ==================

const fullNameWorkBook = XLSX.readFile('src/data/Mentor-students pairs.xlsx');
const fullNameRowsQuantity = 791;
const firstfullNameRowNumber = 2;
const fullNameSheetTitle = 'pairs';

const getFullName = (sheet, currentRow) => {
  const fieldMapping = {
    fullName: 'A',
    studentNickName: 'B',
  };

  const fullName = {
    fullName: sheet[fieldMapping.fullName + currentRow].v,
    studentNickName: sheet[fieldMapping.studentNickName + currentRow].v,
  };

  return fullName;
};

const getFullNames = (sheet) => {
  const rows = [];
  for (let i = firstfullNameRowNumber; i <= fullNameRowsQuantity; i++) {
    rows.push(i);
  }

  return rows.map(row => getFullName(sheet, row));
};

const FullNames = getFullNames(fullNameWorkBook.Sheets[fullNameSheetTitle]);
// =========================================== WIP ================
// const set = new Set();
// const setNames = FullNames.map((name) => {
//   set.add(name);
// });
// console.log();

// =============================== results ====================
const gitHub = 'https://github.com/';
const results = records
  .map((record) => {
    let task = tasks.find(w => (_.words(w.name.toUpperCase())).join('')
      === (_.words(record.taskName.toUpperCase())).join(''));

    if (!task) {
      task = {};
      if (record.taskName === 'Presentation') {
        task.name = 'Presentation';
        task.taskStatus = 'Not Defined';
      }
    }
    const studentNickName = record.student.split('/').slice(-1)[0];
    const mentorNickName = record.mentor.split('/').slice(-1)[0];

    return {
      taskName: task.name,
      taskStatus: task.taskStatus,
      recordTaskName: record.taskName,
      mentorGitHub: gitHub + mentorNickName,
      studentGitHub: gitHub + studentNickName,
      studentNickName,
    };
  });

const json = JSON.stringify(results, 0, 1);

fs.writeFile('src/data/data.json', json, 'utf8', () => {
  console.log('writing is done!');
});
