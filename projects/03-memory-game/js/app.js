// -----------------------------------------------------------------------------------
// Preset
// -----------------------------------------------------------------------------------

/*jshint esversion: 6 */

// icons list
const icons = [
	'fa-diamond',
	'fa-paper-plane-o',
	'fa-anchor',
	'fa-bolt',
	'fa-cube',
	'fa-leaf',
	'fa-bicycle',
	'fa-bomb',
	'fa-heart',
	'fa-scissors',
	'fa-eye',
	'fa-gift',
	'fa-flag-checkered',
	'fa-car'
];

const gameContainer = document.querySelector('.game-container');

let time = '00:00';
let timer;
let cardElements;
let timerFlag;
let selected = [];

// Score parameters
let score;
const cutStarScore = 6;
const maxWrong = 18;
const winScore = 8;
let modal;

// -----------------------------------------------------------------------------------
// Utilities
// -----------------------------------------------------------------------------------

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array)
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue 		= array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] 	= temporaryValue;
    }

    return array;
}

// Timer: count up & down
function setTimer(seconds, count)
{
	function pad(val)
	{
		let str = val + '';
		return (str.length < 2) ? 0 + str : str;
	}

	timer = setInterval(function() {

	if (count === 'up') {
		seconds++;
	} else {
		seconds--;
	}

	let min = pad(parseInt(seconds / 60));
	let sec = pad(seconds % 60);
	time = min + ':' + sec;

	document.querySelector('.timer').innerHTML = time;

	}, 1000);

}

function resetTimer()
{
	clearInterval(timer);
}

// -----------------------------------------------------------------------------------
// Return an array of X pairs of icons, randomly selected and shuffled, ready to use.
// -----------------------------------------------------------------------------------

function getIcons(iconsArray)
{
	let numberOfPairs = 8;
	let iconsSelected  = shuffle(iconsArray).slice(0, numberOfPairs);
	let iconsList = iconsSelected.concat(iconsSelected);
	return shuffle(iconsList);
}

// -----------------------------------------------------------------------------------
// Generate the game board.
// -----------------------------------------------------------------------------------

function getGameboard()
{
	const container = document.createElement('ul');
	container.className = 'deck';
	const cards = getIcons(icons);

	for (let i = 0; i < cards.length; i++) {

		const content = document.createElement('li');
		content.className = 'card';
		container.appendChild(content);

	// i/icon elements
		const icon = document.createElement('i');
		icon.classList.add('fa', cards[i]);
		content.appendChild(icon);

	}

	gameContainer.appendChild(container);

// Add Event Listener
	cardElements = document.getElementsByClassName('card');

	for (let i = 0; i < cardElements.length; i++) {
		cardElements[i].addEventListener('click', cardClicked(i));
	}

// Preset start up.
	timerFlag = false;

	score = {
		'right' : 0,
		'wrong' : 0,
		'stars' : 3,
		'status': 'nd'
	};

}

// -----------------------------------------------------------------------------------
// click / play / compare / get score
// -----------------------------------------------------------------------------------

function cardClicked(i)
{
	return function()
	{
		let classesList = cardElements[i].childNodes[0].className.split(' ');
		let cardName	= classesList[1];
		play(cardElements[i], cardName);
	};
}


function play(cardElement, cardName)
{
	if (timerFlag === false) {
		setTimer(0, 'up');
		document.querySelector('.restart').addEventListener('click', gameRestart, true);
		timerFlag = true;
	}

	cardElement.classList.add('click-off', 'open', 'show');
	selected.push([cardElement, cardName]);

	if (selected.length === 2) {
		gameContainer.classList.add('click-off');
		compareCards(selected);
		selected = [];
	}

}


function compareCards(selected)
{
	if (selected[0][1] === selected[1][1]) {

		score.right++;

		selected[0][0].classList.add('ok', 'match');
		selected[1][0].classList.add('ok', 'match');
		gameContainer.classList.remove('click-off');

		if (score.right === winScore) {
			score.status = 'win';
		}

	} else {

		score.wrong++;

		selected[0][0].classList.add('ko');
		selected[1][0].classList.add('ko');

		setTimeout(function() {

			selected[0][0].classList.remove('open', 'show', 'ko', 'click-off');
			selected[1][0].classList.remove('open', 'show', 'ko', 'click-off');

		// Remove click block
			if (score.wrong < maxWrong) {
				gameContainer.classList.remove('click-off');
			}

		}, 500);

	// Cut one star
		if ((score.wrong % cutStarScore) === 0) {
			let starObj = document.querySelector('.fa-star');
			starObj.classList.remove('fa-star');
			starObj.classList.add('fa-star-o');
			score.stars--;
		}

	// Game Over
		if (score.wrong == maxWrong) {
			score.status = 'lose';
		}

	}

	getScore(score);

}


function getScore(score)
{
	let totMoves = score.right + score.wrong;
	let scoreReport = time + ' | Tot moves: ' + totMoves + ' | Right: ' + score.right + ' | Wrong: ' + score.wrong + ' | Stars left: ' + score.stars;

	document.querySelector('.moves').innerHTML = totMoves;

	//console.log(scoreReport);

	if (score.status !== 'nd') {
		resetTimer();
		setTimeout(function() {
			modal = window.confirm('You '+ score.status +' in: ' + scoreReport + ' | Play again ?') ? gameRestart() : false;
		}, 600);
	}

}

// -----------------------------------------------------------------------------------
// Game Start / Restart
// -----------------------------------------------------------------------------------

function gameRestart()
{
	gameContainer.removeChild(gameContainer.firstChild);

// Reset stars icon.
	let starsIconList = document.querySelectorAll('.fa-star-o');
	starsIconList.forEach(function(el) {
	  el.classList.remove('fa-star-o');
	  el.classList.add('fa-star');
	});

// Reset timer / clock.
	resetTimer();
	document.querySelector('.timer').innerHTML = '00:00';

// Reset moves counter.
	document.querySelector('.moves').innerHTML = 0;

// Reset click block
	gameContainer.classList.remove('click-off');

// Go!
	getGameboard();
}


document.addEventListener('DOMContentLoaded', function gameStart() {
	getGameboard();
});

// -----------------------------------------------------------------------------------
