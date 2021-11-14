"use strict";

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
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
        easeOutSine: function(pos) {
            return Math.sin(pos * (Math.PI / 2));
        },
        easeInOutSine: function(pos) {
            return (-0.5 * (Math.cos(Math.PI * pos) - 1));
        },
        easeInOutQuint: function(pos) {
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
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 5000);
}
const table = document.getElementsByTagName('table');
if (table) {

    for (let i = 0; i < table.length; i++) {
        if (table[i].classList.contains('rouge-table')) continue;
        let th = table[i].getElementsByTagName('th');

        let tr = table[i].getElementsByTagName('tr');

        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName('td');

            for (let z = 0; z < td.length; z++) {
                td[z].dataset.name = th[z].innerHTML

            }

        }
    }
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
        if (copyToClipBoard(text.innerHTML.replace(/<\/?span[^>]*>/g, ""))) {
            copy.innerHTML = copyText + ' &#10004;'
            setTimeout(() => {
                    copy.innerHTML = copyText
                }, 1200)
                // launch_toast("Ko")
        }
    });
    codeBlock[i].appendChild(copy);

}

var images = document.getElementsByClassName('glightbox');
for (let item of images) {
    item.innerHTML = item.innerHTML + '<div class="animIcon"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 38 32"><title>Zoom image</title><path fill="#282a36" stroke-linejoin="miter" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="1.0199" stroke="#fff" d="M4.165 0.265h29.209c1.867 0 3.381 1.514 3.381 3.381v24.712c0 1.867-1.514 3.381-3.381 3.381h-29.209c-1.867 0-3.381-1.514-3.381-3.381v-24.712c0-1.867 1.514-3.381 3.381-3.381z"></path><path fill="none" stroke-linejoin="miter" class="sun"  stroke-linecap="butt" stroke-miterlimit="4" stroke-width="1.0199" stroke="#fff" d="M31.853 8.166c0 1.505-1.251 2.726-2.794 2.726s-2.794-1.22-2.794-2.726c0-1.505 1.251-2.726 2.794-2.726s2.794 1.22 2.794 2.726z"></path><path fill="none" stroke-linejoin="miter" class="mountain" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="1.0199" stroke="#fff" d="M2.824 19.815s5.232-5.402 7.905-8.177c0.252-0.262 0.828-0.252 1.090 0 6.356 6.117 17.513 17.649 17.513 17.649"></path><path fill="none" stroke-linejoin="miter" class="mountain" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="1.0199" stroke="#fff" d="M21.631 21.317s3.555-3.925 5.315-5.86c0.321-0.353 1.092-0.336 1.431 0 2.3 2.28 6.61 6.746 6.61 6.746"></path><path fill="none" stroke-linejoin="miter" class="innerlineBox1" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="1.0277" stroke="#fff" d="M31.114 2.572h-25.676c-1.776 0-2.673 1.191-2.673 2.385 0 6.829-0.055 15.119 0 21.875 0.010 1.241 0.894 2.59 2.673 2.59h25.676c3.104 0 3.682-1.090 3.682-2.59v-14.015"></path><path fill="none" stroke-linejoin="miter" class="innerlineBox2" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="1.0277" stroke="#fff" d="M34.796 12.24v-2.429"></path><path fill="none" stroke-linejoin="miter" class="innerlineBox3" stroke-linecap="butt" stroke-miterlimit="4" stroke-width="1.0277" stroke="#fff" d="M34.796 9.335v-2.191"></path></svg></div>';
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const id = decodeURI(this.getAttribute('href').split('#')[1]).toLowerCase();
        const yOffset = -30;
        const element = document.getElementById(id);
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        location.hash = id;
        window.scrollTo({ top: y, behavior: 'smooth' });
    });
});