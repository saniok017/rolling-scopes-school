import getResults from './fetch';

test('the state is Truthy', async () => {
  expect.assertions(0);
  const state = await getResults('state', 'test');
  expect(state).toBeTruthy();
});
