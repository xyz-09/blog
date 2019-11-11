"use strict";

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function scrollToY(scrollTargetY, speed, easing) {
  // https://stackoverflow.com/questions/8917921/cross-browser-javascript-not-jquery-scroll-to-top-animation
  var scrollY = window.scrollY || document.documentElement.scrollTop,
    scrollTargetY = scrollTargetY || 0,
    speed = speed || 2000,
    easing = easing || 'easeOutSine',
    currentTime = 0;

  var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));

  // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
  var easingEquations = {
    easeOutSine: function (pos) {
      return Math.sin(pos * (Math.PI / 2));
    },
    easeInOutSine: function (pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },
    easeInOutQuint: function (pos) {
      if ((pos /= 0.5) < 1) {
        return 0.5 * Math.pow(pos, 5);
      }
      return 0.5 * (Math.pow((pos - 2), 5) + 2);
    }
  };


  function tick() {
    currentTime += 1 / 60;

    var p = currentTime / time;
    var t = easingEquations[easing](p);

    if (p < 1) {
      requestAnimFrame(tick);

      window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
    } else {
      window.scrollTo(0, scrollTargetY);
    }
  }

  tick();
}

function copyToClipBoard(text) {
  if (window.clipboardData && window.clipboardData.setData) {
    return clipboardData.setData("Text", text)
  } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
    let textarea = document.createElement('textarea');
    textarea.textContent = text
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy")
    } catch (error) {
      console.warn("Nie można skopiować do schowka", error)
      return false;
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

function launch_toast(text) {
  let toast = document.getElementById("toast")
  toast.className = "show";
  let desc = toast.querySelector('#desc');
  desc.innerHTML = text;
  setTimeout(function () {
    toast.className = toast.className.replace("show", "");
  }, 5000);
}

let classname = document.getElementsByClassName("archive-top-link");
let topEl = document.getElementById('top');

for (let i = 0; i < classname.length; i++) {
  classname[i].addEventListener('click', () => {
    scrollToY(topEl.offsetTop, 1500, 'easeInOutQuint');
  });
}


let codeBlock = document.querySelectorAll("div.highlighter-rouge")

for (let i = 0; i < codeBlock.length; i++) {
  let lang = codeBlock[i].className.split(' ')[0].replace('language-', '');
  let div = document.createElement('div');
  div.className = "lang";
   if (lang == 'highlighter-rouge') continue;
  div.innerHTML = lang;
  codeBlock[i].appendChild(div);
  const copyText = "Kopiuj"
  let copy = document.createElement('div');
  copy.className = "copy"
  copy.innerHTML = copyText;

  let text = codeBlock[i].querySelector('.rouge-code pre');

  copy.addEventListener('click', () => {
    if(copyToClipBoard(text.innerHTML.replace(/<\/?span[^>]*>/g, ""))){
      copy.innerHTML = copyText + ' &#10004;'
      setTimeout(()=>{
        copy.innerHTML = copyText
      },1200)
     // launch_toast("Ko")
    }
  });
  codeBlock[i].appendChild(copy);

}