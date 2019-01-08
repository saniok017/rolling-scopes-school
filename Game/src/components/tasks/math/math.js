import $ from 'jquery';
import _ from 'lodash';

function calculate() {
  let result = 0;
  const integer1 = _.random(0, 999);
  const integer2 = _.random(0, 999);
  if ((_.random(0, 1)) === 0) {
    result = integer1 + integer2;
    $('#taskText')[0].innerText = `${integer1} + ${integer2} ${result}`;
  } else {
    result = integer1 - integer2;
    $('#taskText')[0].innerText = `${integer1} - ${integer2} ${result}`;
  }
  return result;
}

export default calculate;
