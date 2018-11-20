function addRate(arr) {
  const viewarr = document.querySelectorAll('.viewRate');
  console.dir(viewarr);
  console.log(arr);
  arr.forEach((currentValue, index) => {
    viewarr[index].innerHTML = currentValue.viewCount;
  });
}

export default addRate;
