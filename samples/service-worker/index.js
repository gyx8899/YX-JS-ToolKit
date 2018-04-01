'use strict';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}

document.querySelector('#show').addEventListener('click', function () {
  var iconUrl = window.location.origin + window.location.pathname.replace('index.html', '') + document.querySelector('select').selectedOptions[0].value;
  var imgElement = document.createElement('img');
  imgElement.src = iconUrl;
  document.querySelector('#container').appendChild(imgElement);
});

//# sourceMappingURL=index.js.map