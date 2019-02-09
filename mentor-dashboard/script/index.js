const fs = require('fs');
const sheetOptionsHub = require('./modules/sheetOptionsHub');

const tasks = sheetOptionsHub.getTasks();

const records = sheetOptionsHub.getRecords();

const fullNames = sheetOptionsHub.getFullNames();

const results = sheetOptionsHub.joinData(records, tasks, fullNames);

const json = JSON.stringify(results, 0, 1);

fs.writeFile('script/data/data.json', json, 'utf8', () => {
  console.log('writing is done!');
});
