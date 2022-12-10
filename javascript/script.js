const choices = document.querySelectorAll('.choices > *');
const playerScore = document.querySelector(
	'.scores-container .player-score .score'
);
const computerScore = document.querySelector(
	'.scores-container .computer-score .score'
);
const keepPlaying = document.querySelector('.keep-playing');
const tryAgain = document.querySelector('.try-again');
const resultDisplay = document.querySelector('.game-result .result');
const rulesDisplay = document.querySelector('.game-result .description');
const gameLogic = {
	rock: {
		rock: null,
		scissors: true,
		paper: false,
	},

	paper: {
		paper: null,
		rock: true,
		scissors: false,
	},

	scissors: {
		scissors: null,
		paper: true,
		rock: false,
	},
};

choices.forEach((choice) => {
	choice.addEventListener('click', () => playRock(choice.dataset.name));
});

keepPlaying.addEventListener('click', () => toggleClass(false));
function computerPlay() {
	const randomNumber = Math.floor(Math.random() * 3);
	const computerChoice = Object.keys(gameLogic)[randomNumber];
	return computerChoice;
}

function playRock(playerChoice, computerChoice = computerPlay()) {
	let result = gameLogic[playerChoice][computerChoice];
	let rules;
	resultDisplay.textContent =
		result === true
			? ((rulesDisplay.textContent = `${playerChoice} beats ${computerChoice}`),
			  `You win!`)
			: result === false
			? ((rulesDisplay.textContent = `${computerChoice} beats ${playerChoice}`),
			  `You lose!`)
			: ((rulesDisplay.textContent = ''), `It's a draw`);
	displayResults(playerChoice, computerChoice, result);
}

function toggleClass(gameOver = false) {
	const elements = document.querySelectorAll(
		'.choices, .choices>*, .result-display'
	);
	gameOver ||
		elements.forEach((elem) => {
			elem.classList.toggle('hidden');
		});
	gameOver
		? elements.forEach((elem) => {
				elem.classList.add('hidden');
		  })
		: '';
}

function displayResults(playerChoice, computerChoice, result) {
	const playerIcon = document.querySelector('.icons .player-choice');
	const computerIcon = document.querySelector('.icons .computer-choice');
	playerIcon.firstElementChild.setAttribute(
		'src',
		`images/icon-${playerChoice}.svg`
	);
	computerIcon.firstElementChild.setAttribute(
		'src',
		`images/icon-${computerChoice}.svg`
	);

	if (result === true) {
		playerIcon.classList.remove('lost');
		computerIcon.classList.add('lost');
		playerScore.textContent = Number(playerScore.textContent) + 1;
	} else if (result === false) {
		computerIcon.classList.remove('lost');
		playerIcon.classList.add('lost');
		computerScore.textContent = Number(computerScore.textContent) + 1;
	} else {
		computerIcon.classList.remove('lost');
		playerIcon.classList.remove('lost');
	}
	toggleClass(false);
	determineWinner();
}

function determineWinner() {
	if (playerScore.textContent === '5' || computerScore.textContent === '5') {
		toggleClass(true);
		document.querySelector('.game-over').classList.remove('hidden');
		document.querySelector('.game-over .result').textContent =
			playerScore.textContent === '5'
				? 'You reached 5 first. You win'
				: 'Computer reached 5 first. You lost';
	}
}
tryAgain.addEventListener('click', resetGame);
function resetGame() {
	document
		.querySelectorAll('.choices, .choices>*, .game-over')
		.forEach((elem) => {
			elem.classList.toggle('hidden');
		});
	playerScore.textContent = '0';
	computerScore.textContent = '0';
}
