import playSound from './engToRuAudio';

describe('engToRuAudio', () => {
  it('give back some word', () => {
    document.body.innerHTML = '<div><span id="taskText">Test1</span></div>';
    const string = playSound();
    expect(string).toBeTruthy();
  });
});
