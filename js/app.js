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
    justOneWords.shuffle();

    for (const li of listElements) {
        li.textContent = justOneWords[0];
        justOneWords.push(justOneWords.shift());
    }
}

/* --------------------------------------------------------------------------------------------------
functions
---------------------------------------------------------------------------------------------------*/

function init() {
    document.addEventListener("touchstart", function() {}, false);
    loadWords();
}

/* --------------------------------------------------------------------------------------------------
public members, exposed with return statement
---------------------------------------------------------------------------------------------------*/
window.app = {
    init
};

app.init();
