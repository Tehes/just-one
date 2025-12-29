/* --------------------------------------------------------------------------------------------------
Imports
---------------------------------------------------------------------------------------------------*/

import { justOneWords } from "./words.js";

/* --------------------------------------------------------------------------------------------------
Variables
---------------------------------------------------------------------------------------------------*/
const button = document.querySelector("button");
const rollSteps = 12;
let roundStartIndex = 0;
let rollQueues = [];
let rollIndex = 0;

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

	rollQueues = [];

	for (let i = 0; i < listElements.length; i += 1) {
		const finalWord = justOneWords[(roundStartIndex + i) % justOneWords.length];
		rollQueues.push(buildRollQueue(finalWord));
	}

	for (let i = 0; i < listElements.length; i += 1) {
		startRoll(listElements[i], i);
	}

	roundStartIndex = (roundStartIndex + listElements.length) % justOneWords.length;
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
	const queueId = Number(target.dataset.queueId) || 0;
	const idx = Number(target.dataset.queueIndex) || 0;
	const queue = rollQueues[queueId];

	target.textContent = queue ? queue[idx % queue.length] : "";
	target.dataset.queueIndex = String(idx + 1);
}

function buildRollQueue(finalWord) {
	const queue = [];

	for (let i = 0; i < rollSteps - 1; i += 1) {
		queue.push(justOneWords[rollIndex % justOneWords.length]);
		rollIndex += 1;
	}

	queue.push(finalWord);

	return queue;
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

function startRoll(target, queueId) {
	target.dataset.rollsLeft = String(rollSteps);
	target.dataset.queueIndex = "0";
	target.dataset.queueId = String(queueId);
	target.removeEventListener("animationend", slideUp, false);
	setNextWord(target);
	target.addEventListener("animationend", slideUp, false);
	restartAnimation(target);
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
