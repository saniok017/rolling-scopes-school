function loadImage(path, horisontalPosition, verticalPosition) {
  const image = document.createElement('img');

  const result = {
    dom: image,
    width: 0,
    height: 0,
    count: 5,
    loaded: false,
    num: 1,
    x: horisontalPosition,
    y: verticalPosition,
  };

  image.onload = () => {
    result.loaded = true;
  };
  image.src = path;
  result.width = image.width;
  result.height = image.height;

  return result;
}
export default loadImage;
