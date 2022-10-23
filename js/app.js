/* --------------------------------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------------------------------*/

import {
    justOneWords
}
    from './words.js';

/* --------------------------------------------------------------------------------------------------
Variables
---------------------------------------------------------------------------------------------------*/
var button = document.querySelector("button");

/* --------------------------------------------------------------------------------------------------
functions
---------------------------------------------------------------------------------------------------*/
Array.prototype.shuffle = function () {
    var i = this.length;
    while (i) {
        var j = Math.floor(Math.random() * i);
        var t = this[--i];
        this[i] = this[j];
        this[j] = t;
    }
    return this;
};

function loadWords() {
    button.removeEventListener("click", loadWords, false);
    const listElements = document.querySelectorAll("div span:nth-of-type(2)");

    for (const li of listElements) {
        li.textContent = justOneWords[0];
        li.classList.add("animate");
        li.previousElementSibling.classList.add("animate");
        li.addEventListener("animationend", slideUp, false);
        justOneWords.push(justOneWords.shift());
    }
}

function slideUp(ev) {
    ev.target.previousElementSibling.textContent = ev.target.textContent;
    ev.target.classList.remove("animate");
    ev.target.previousElementSibling.classList.remove("animate");
    button.addEventListener("click", loadWords, false);
    ev.target.removeEventListener("animationend", slideUp, false);
}

function init() {
    document.addEventListener("touchstart", function () { }, false);
    justOneWords.shuffle();
    loadWords();
}

/* --------------------------------------------------------------------------------------------------
public members, exposed with return statement
---------------------------------------------------------------------------------------------------*/
window.app = {
    init
};

app.init();
