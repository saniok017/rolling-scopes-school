function addRate(arr) {
  const viewarr = document.querySelectorAll('.viewRate');
  arr.forEach((currentValue, index) => {
    viewarr[index].innerHTML = currentValue.viewCount;
    viewarr[index].classList.remove('viewRate');
  });
}

export default addRate;
