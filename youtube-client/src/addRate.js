function addRate(arr) {
  const elements = document.querySelectorAll('viewRate');
  console.dir(elements);
  arr.forEach((currentValue, index, elements) => {
    currentValue.innerHTML = elements[index];
  });
  elements.innerHTML = arr;
  document.getElementById('screen').appendChild(elements);
}

export default addRate;
