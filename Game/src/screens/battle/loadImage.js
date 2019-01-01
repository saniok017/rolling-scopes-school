function loadImage(path) {
  const image = document.createElement('img');

  const result = {
    dom: image,
    width: 0,
    height: 0,
    count: 5,
    loaded: false,
    num: 1,
  };

  image.onload = () => {
    result.loaded = true;
  };
  image.src = path;
  result.width = image.width / result.count;
  result.height = image.height;

  return result;
}
export default loadImage;
