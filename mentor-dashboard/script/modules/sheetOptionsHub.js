const XLSX = require('xlsx');
const _ = require('lodash');
const excelConverter = require('./excelConverter');

module.exports.getFullNames = () => {
  const WorkBook = XLSX.readFile('script/data/Mentor-students pairs.xlsx');
  const lastRowNumber = 147;
  const firstRowNumber = 2;
  const sheetTitle = 'second_name-to_github_account';
  const sheet = WorkBook.Sheets[sheetTitle];

  const fieldMap = {
    name: 'A',
    surname: 'B',
    gitHub: 'E',
  };

  const fullNamesArray = excelConverter.getArrayFromExcelSheet(
    sheet,
    firstRowNumber,
    lastRowNumber,
    fieldMap,
  );
  return fullNamesArray;
};

module.exports.getRecords = () => {
  const WorkBook = XLSX.readFile('script/data/Mentor score.xlsx');
  const lastRowNumber = 1865;
  const firstRowNumber = 2;
  const sheetTitle = 'Form Responses 1';
  const sheet = WorkBook.Sheets[sheetTitle];

  const fieldMap = {
    mentor: 'B',
    student: 'C',
    taskName: 'D',
    pullRequest: 'E',
    score: 'F',
    comment: 'G',
  };

  const recordsArray = excelConverter.getArrayFromExcelSheet(
    sheet,
    firstRowNumber,
    lastRowNumber,
    fieldMap,
  );
  return recordsArray;
};

module.exports.getTasks = () => {
  const WorkBook = XLSX.readFile('script/data/Tasks.xlsx');
  const lastRowNumber = 10;
  const firstRowNumber = 2;
  const sheetTitle = 'Sheet1';
  const sheet = WorkBook.Sheets[sheetTitle];

  const fieldMap = {
    name: 'A',
    taskStatus: 'C',
  };

  const tasksArray = excelConverter.getArrayFromExcelSheet(
    sheet,
    firstRowNumber,
    lastRowNumber,
    fieldMap,
  );
  return tasksArray;
};

module.exports.joinData = (records, tasks, fullNames) => records
  .map((record) => {
    let studentNickName = record.student.split('/').slice(-1)[0];
    let mentorNickName = record.mentor.split('/').slice(-1)[0];
    const gitHub = 'https://github.com/';

    switch (mentorNickName) {
      case 'aliakseibabko-2018Q3':
        mentorNickName = 'Shutya';
        studentNickName = 'aliakseibabko-2018Q3';
        break;
      case 'Nemkev':
        mentorNickName = 'Shank111';
        studentNickName = 'Nemkev';
        break;
      default:
        break;
    }

    let task = tasks.find(currentTask => (_.words(currentTask.name.toUpperCase())).join('')
      === (_.words(record.taskName.toUpperCase())).join(''));

    let mentor = fullNames.find(currentmentor => _.words(currentmentor.gitHub.toUpperCase())
      .slice(-1)[0] === _.words(mentorNickName.toUpperCase()).slice(-1)[0]);

    if (!mentor) { mentor = {}; }
    if (!task) {
      task = {
        name: record.taskName,
        taskStatus: 'Not Defined',
      };
    }

    return {
      taskName: task.name,
      taskStatus: task.taskStatus,
      recordTaskName: record.taskName,
      mentorGitHub: gitHub + mentorNickName,
      studentGitHub: gitHub + studentNickName,
      studentNickName,
      mentorFullName: `${mentor.name} ${mentor.surname}`,
      pullRequest: record.pullRequest,
      score: record.score,
      comment: record.comment,
    };
  });
