import _ from 'lodash.template';

function showSnippet(obj) {
  const template = '<div class="channelTitle"><p><%= channelTitle %></p><p>description: <span class="description"><%= description %></span></p></div>';
  const templateFn = _(template);
  const templateHTML = templateFn(obj);
  document.querySelector('main').innerHTML += templateHTML;
}

export default showSnippet;
