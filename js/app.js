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
Array.prototype.shuffle = function() {
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
    const listElements = document.querySelectorAll("li");

    for (const li of listElements) {
        li.textContent = justOneWords[0];
        justOneWords.push(justOneWords.shift());
    }
}

function init() {
    document.addEventListener("touchstart", function() {}, false);
    button.addEventListener("click", loadWords, false);
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
