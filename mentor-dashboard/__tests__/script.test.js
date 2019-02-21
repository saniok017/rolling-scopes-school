const { sortBy, sortedUniqBy } = require('lodash');

const sheetOptionsHub = require('../script/modules/sheetOptionsHub');
const dataJson = require('../script/data/data.json');
const tasksJson = require('../script/data/tasks.json');

const tasks = sheetOptionsHub.getTasks();
const records = sheetOptionsHub.getRecords();
const fullNames = sheetOptionsHub.getFullNames();

describe('script merge functions', () => {
  it('getTasks working', () => {
    expect(tasks).toBeDefined();
  });

  it('getRecords working', () => {
    expect(records).toBeDefined();
  });

  it('getFullNames working', () => {
    expect(fullNames).toBeDefined();
  });

  it('Tasks correct length', () => {
    expect(tasks.length).toBe(10);
  });

  it('Records correct length', () => {
    expect(records.length).toBe(1864);
  });

  it('fullNames correct length', () => {
    expect(fullNames.length).toBe(149);
  });

  it('merge data correctly', () => {
    const results = sortBy(sheetOptionsHub.joinData(records, tasks, fullNames), 'mentorFullName');
    expect(results.length).toBe(1864);
  });
});

describe('Json correctness', () => {
  it('there is data', () => {
    expect(dataJson).toBeDefined();
  });

  it('there is tasks', () => {
    expect(tasksJson).toBeDefined();
  });

  it('check for deep equality', () => {
    // eslint-disable-next-line no-useless-escape
    expect(tasks).toContainEqual({ name: 'Code Jam \"CV\"', taskStatus: 'Checked' });
  });

  it('active mentors', () => {
    const results = sortBy(sheetOptionsHub.joinData(records, tasks, fullNames), 'mentorFullName');
    const mentors = sortedUniqBy(results, 'mentorFullName');
    expect(mentors.length).toBe(135);
  });

  it('matches if the result tasks file does contain the expected elements', () => {
    expect(tasksJson).toEqual(
      expect.arrayContaining(tasks),
    );
  });

  it('matches if the result tasks file does contain the expected elements', () => {
    expect(dataJson[0]).toEqual(expect.objectContaining({ score: 66 }));
  });
});
