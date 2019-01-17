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
const fullNameRowsQuantity = 147;
const firstfullNameRowNumber = 2;
const fullNameSheetTitle = 'second_name-to_github_account';

const getFullName = (sheet, currentRow) => {
  const fieldMapping = {
    name: 'A',
    surname: 'B',
    gitHub: 'E',
  };

  const fullName = {
    name: sheet[fieldMapping.name + currentRow].v,
    surname: sheet[fieldMapping.surname + currentRow].v,
    gitHub: sheet[fieldMapping.gitHub + currentRow].v,
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
// const mentors = _.uniqBy(FullNames, 'fullName');
// console.log(mentors.length);

// =============================== results ====================
const gitHub = 'https://github.com/';
const results = records
  .map((record) => {
    const studentNickName = record.student.split('/').slice(-1)[0];
    const mentorNickName = record.mentor.split('/').slice(-1)[0];

    let task = tasks.find(currentTask => (_.words(currentTask.name.toUpperCase())).join('')
      === (_.words(record.taskName.toUpperCase())).join(''));

    let mentor = FullNames.find(currentmentor => _.lowerCase(currentmentor.gitHub.split('/').slice(-1)[0])
      === _.lowerCase(mentorNickName));

    if (!mentor) { mentor = {}; }
    if (!task) {
      task = {};
      if (record.taskName === 'Presentation') {
        task.name = 'Presentation';
        task.taskStatus = 'Not Defined';
      }
    }

    // eslint-disable-next-line consistent-return
    return {
      taskName: task.name,
      taskStatus: task.taskStatus,
      recordTaskName: record.taskName,
      mentorGitHub: gitHub + mentorNickName,
      studentGitHub: gitHub + studentNickName,
      studentNickName,
      mentorFullName: `${mentor.name} ${mentor.surname}`,
    };
  });

const json = JSON.stringify(results, 0, 1);

fs.writeFile('src/data/data.json', json, 'utf8', () => {
  console.log('writing is done!');
});
