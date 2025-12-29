/* --------------------------------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------------------------------*/

import { justOneWords } from "./words.js";

/* --------------------------------------------------------------------------------------------------
Variables
---------------------------------------------------------------------------------------------------*/
const button = document.querySelector("button");
const rollSteps = 12;
let fillerPool = [];

/* --------------------------------------------------------------------------------------------------
functions
---------------------------------------------------------------------------------------------------*/
Array.prototype.shuffle = function () {
	let i = this.length;
	while (i) {
		const j = Math.floor(Math.random() * i);
		const t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	return this;
};

function loadWords() {
	const listElements = document.querySelectorAll("div span:nth-of-type(2)");
	const finalWords = justOneWords.slice(0, listElements.length);
	fillerPool = justOneWords.slice(listElements.length);

	fillerPool.shuffle();

	for (let i = 0; i < listElements.length; i += 1) {
		startRoll(listElements[i], finalWords[i] || "");
	}

	const movedWords = justOneWords.splice(0, listElements.length);
	justOneWords.push(...movedWords);
}

function startRoll(target, finalWord) {
	target.dataset.rollsLeft = String(rollSteps);
	target.dataset.finalWord = finalWord;
	target.removeEventListener("animationend", slideUp, false);
	setNextWord(target);
	target.addEventListener("animationend", slideUp, false);
	restartAnimation(target);
}

function slideUp(ev) {
	const target = ev.target;
	const previous = target.previousElementSibling;

	previous.textContent = target.textContent;

	let rollsLeft = Number(target.dataset.rollsLeft);
	rollsLeft -= 1;

	if (rollsLeft > 0) {
		target.dataset.rollsLeft = String(rollsLeft);
		setNextWord(target);
		restartAnimation(target);
		return;
	}

	target.dataset.rollsLeft = "0";
	target.classList.remove("animate");
	previous.classList.remove("animate");
	target.removeEventListener("animationend", slideUp, false);
}

function setNextWord(target) {
	const rollsLeft = Number(target.dataset.rollsLeft);
	const finalWord = target.dataset.finalWord || "";

	if (rollsLeft > 1) {
		target.textContent = fillerPool.shift() || "";
		return;
	}

	target.textContent = finalWord;
}

function restartAnimation(target) {
	const previous = target.previousElementSibling;

	target.classList.remove("animate");
	previous.classList.remove("animate");
	// Force reflow so the animation restarts.
	void target.offsetHeight;
	target.classList.add("animate");
	previous.classList.add("animate");
}

function init() {
	document.addEventListener("touchstart", function () {}, false);
	justOneWords.shuffle();
	loadWords();
	button.addEventListener("click", loadWords, false);
}

/* --------------------------------------------------------------------------------------------------
public members, exposed with return statement
---------------------------------------------------------------------------------------------------*/
globalThis.app = {
	init,
};

app.init();
