import _ from 'lodash.template';

function showSnippet(obj) {
  const template = '<div class="title"><p><%= title %></p><p>description: <span class="description"><%= description %></span></p><p>publishedAt: <span class="publishedAt"><%= publishedAt %></span></p><p>img: <img class="img" src="<%= thumbnails.medium.url %>" alt="<%= description %> + image" width="<%= thumbnails.medium.width %>" height="<%= thumbnails.medium.height %>"></p><p>channelTitle: <span class="channelTitle"><%= channelTitle %></span></p><p>view rate: <span class="viewRate"></span></p></div>';
  const templateFn = _(template);
  const templateHTML = templateFn(obj);
  const element = document.createElement('figure');
  element.innerHTML = templateHTML;
  document.getElementById('screen').appendChild(element);
}

export default showSnippet;
