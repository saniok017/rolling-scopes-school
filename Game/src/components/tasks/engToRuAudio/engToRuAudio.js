import $ from 'jquery';
import _ from 'lodash';
import words from './words';
import loadAudio from '../../../screens/battle/loadAudio';

function playSound() {
  let result = 0;
  const wordObject = words[_.random(0, words.length - 1)];
  const currentSound = loadAudio(wordObject.sound);
  result = wordObject.translation;

  $('#taskText')[0].innerHTML = `<span>Translate to russian</span>
  <button type="button" class="btn btn-success">Play</button>`;

  $('.btn-success').on('click', () => {
    currentSound.play();
  });

  return result;
}

export default playSound;
