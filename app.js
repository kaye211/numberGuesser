// Game variables

var min = 1,
	max = 10,
	winningNum = setWinningNum(min, max),
	guessLeft = 3;

const game = document.getElementById('game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const button = document.getElementById('guess-btn');
const guessInput = document.getElementById('guess-input');
const message = document.querySelector('.message');

// Listener for play again
game.addEventListener('mousedown', function(e) {
	if (e.target.className === 'button-primaryplay-again') {
		window.location.reload();
	}
});

minNum.textContent = min;
maxNum.textContent = max;

// Button event listenener
button.addEventListener('click', function() {
	var playerGuess = parseInt(guessInput.value);
	//Validate Input
	if (isNaN(playerGuess) || playerGuess < min || playerGuess > max) {
		return alert('Incorrect Input!');
	}

	//Check for win
	if (playerGuess === winningNum) {
		//Print win message
		gameOver(true, `${winningNum} is correct, YOU WIN!`);
	} else {
		guessLeft -= 1;
		if (guessLeft === 0) {
			//Game over lose
			gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
		} else {
			//Clear input
			guessInput.value = '';
			// Continue Game
			guessInput.style.borderColor = 'red';
			setMessage(`${playerGuess} is incorrect, you have ${guessLeft} guesses remaining`, 'red');
		}
	}
});

// Set Message
function setMessage(msg, color) {
	message.textContent = msg;
	message.style.color = color;
}

// Game over
function gameOver(won, msg) {
	var color;
	won === true ? (color = 'green') : (color = 'red');
	guessInput.disabled = true;
	guessInput.style.borderColor = color;
	// Set text color
	message.style.color = color;
	setMessage(msg);

	// Ask user if they want to play again
	button.value = 'Play Again?';
	button.style.color = 'red';
	button.className += 'play-again';
}
// Winning number
function setWinningNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
