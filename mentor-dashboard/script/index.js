const fs = require('fs');
const sortBy = require('lodash').sortBy;

const sheetOptionsHub = require('./modules/sheetOptionsHub');

const tasks = sheetOptionsHub.getTasks();

const records = sheetOptionsHub.getRecords();

const fullNames = sheetOptionsHub.getFullNames();

const results = sortBy(sheetOptionsHub.joinData(records, tasks, fullNames), 'mentorFullName');

const json = JSON.stringify(results, 0, 1);

fs.writeFile('script/data/data.json', json, 'utf8', () => {
  console.log('writing is done!');
});
