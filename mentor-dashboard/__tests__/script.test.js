const { sortBy, sortedUniqBy } = require('lodash');

const sheetOptionsHub = require('../script/modules/sheetOptionsHub');
const dataJson = require('../script/data/data.json');
const tasksJson = require('../script/data/tasks.json');

const tasks = sheetOptionsHub.getTasks();
const records = sheetOptionsHub.getRecords();
const fullNames = sheetOptionsHub.getFullNames();

describe('script', () => {
  it('there is data', () => {
    expect(dataJson).toBeDefined();
  });
  it('there is tasks', () => {
    expect(tasksJson).toBeDefined();
  });
  it('getTasks working', () => {
    expect(tasks).toBeDefined();
  });
  it('getRecords working', () => {
    expect(records).toBeDefined();
  });
  it('getFullNames working', () => {
    expect(fullNames).toBeDefined();
  });
  it('getTasks currect length', () => {
    expect(tasks.length).toBe(9);
  });
  it('getRecords currect length', () => {
    expect(records.length).toBe(1864);
  });
  it('fullNames currect length', () => {
    expect(fullNames.length).toBe(146);
  });
  it('merge data currectly', () => {
    const results = sortBy(sheetOptionsHub.joinData(records, tasks, fullNames), 'mentorFullName');
    expect(results.length).toBe(1864);
  });
  it('check for deep equality', () => {
    expect(tasks).toContainEqual({ name: 'Code Jam \"CV\"', taskStatus: 'Checked' });
  });
  it('merge data currectly', () => {
    const results = sortBy(sheetOptionsHub.joinData(records, tasks, fullNames), 'mentorFullName');
    const mentors = sortedUniqBy(results, 'mentorFullName');
    expect(mentors.length).toBe(132);
  });
});
