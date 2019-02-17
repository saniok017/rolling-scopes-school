const fs = require('fs');
const { sortBy } = require('lodash');

const sheetOptionsHub = require('./modules/sheetOptionsHub');

const tasks = sheetOptionsHub.getTasks();

const records = sheetOptionsHub.getRecords();

const fullNames = sheetOptionsHub.getFullNames();

const results = sortBy(sheetOptionsHub.joinData(records, tasks, fullNames), 'mentorFullName');

const data = JSON.stringify(results, 0, 1);
const tasksJson = JSON.stringify(tasks, 0, 1);

fs.writeFile('script/data/data.json', data, 'utf8', () => {
  console.log('writing data is done!');
});
fs.writeFile('script/data/tasks.json', tasksJson, 'utf8', () => {
  console.log('writing tasks is done!');
});
