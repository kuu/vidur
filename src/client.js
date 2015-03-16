(function (global) {
  'use strict';

  function get(url) {
    return new Promise(function (fulfill, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', '/api/extract/?url=' + encodeURIComponent(url));
      xhr.onload = function() {
        if (xhr.status === 200) {
          fulfill(xhr.response);
        } else {
          reject(xhr.status);
        }
      };
      xhr.onerror = function(e) {
        reject(e);
      };
      xhr.send();
    });
  }

  function displayError() {
    var container = document.querySelector('.player');
    container.innerHTML = 'Invalid URL.';
  }

  function initPlayer(url) {
    var container = document.querySelector('.player'),
        video = document.createElement('video');

    video.setAttribute('controls', true);
    video.setAttribute('muted', true);
    video.src = url;
    container.appendChild(video);
  }

  var input = document.querySelector('input'),
      inputHandler = function (ev) {
        if (ev.type === 'keypress' && ev.keyCode !== 13) {
          return;
        }

        if (input.value) {
          get(input.value)
          .then(
            function (d) {
              input.disabled = true;
              input.removeEventListener('blur', inputHandler, false);
              input.removeEventListener('keypress', inputHandler, false);
              initPlayer(d);
            },
            function (e) {
              displayError();
            }
          );
        }
      };

  input.addEventListener('blur', inputHandler, false);
  input.addEventListener('keypress', inputHandler, false);

}(this));
