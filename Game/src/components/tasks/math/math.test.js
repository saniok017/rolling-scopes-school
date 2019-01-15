import calculate from './math';

describe('math', () => {
  it('give back some number', () => {
    document.body.innerHTML = '<div><span id="taskText">Test1</span></div>';
    const number = calculate();
    expect(number).toBeTruthy();
  });
});
