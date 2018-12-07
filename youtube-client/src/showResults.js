import _ from 'lodash.template';

function showSnippet(obj) {
  const template = '<span class="title"><%= title %></span><img class="img" src="<%= thumbnails.medium.url %>" alt="<%= description %> image" width="<%= thumbnails.medium.width %>" height="<%= thumbnails.medium.height %>"><div class="stat"><p>description: <span class="description"><%= description %></span></p><p>publishedAt: <span class="publishedAt"><%= publishedAt %></span></p><p>channelTitle: <span class="channelTitle"><%= channelTitle %></span></p><p>view rate: <span class="viewRate"></span></p></div>';
  const templateFn = _(template);
  const templateHTML = templateFn(obj);
  const element = document.createElement('figure');
  element.innerHTML = templateHTML;
  document.getElementById('screen').insertAdjacentElement('beforeend', element);
}

export default showSnippet;
