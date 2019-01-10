import utils from './utils';

describe('Utils', () => {
  test('the data is peanut butter', () => {
    expect.assertions(1);
    return expect(utils()).resolves.toBeUndefined();
  });
});
