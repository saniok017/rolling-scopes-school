import $ from 'jquery';
import _ from 'lodash';
import words from './words';

function translate() {
  let result = 0;
  const wordObject = words[_.random(0, words.length - 1)];
  result = wordObject.translation;
  $('#taskText')[0].innerText = `Translate to russian word: "${wordObject.word}" ${result}`;

  return result;
}

export default translate;
