import translate from './engToRu';

describe('engToRu', () => {
  it('give back some word', () => {
    document.body.innerHTML = '<div><span id="taskText">Test1</span></div>';
    const string = translate();
    expect(string).toBeTruthy();
  });
});
