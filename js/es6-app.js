/*
* Game Function:
* - Player must guess a number between a min and max
* - Player gets a certain amount of guesses
* - Notify player of guesses remaining
* - Notify the player of the correct answer if lost
* - Let player choose to play again
*/

// Get winning number
const getRandomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Game values
let min = 1,
    max = 10,
    winningNum  = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Functions
const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
}

const gameOver = (won, msg) => {
  let color;
  won === true ? color = 'green' : color = 'red';

  // Disable input
  guessInput.disabled = true;
  // Change border color
  guessInput.style.borderColor = color;
  // Set text color
  message.style.color = color;
  // Set message
  setMessage(msg);

  // Play again
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}

// Assign UI min anx max
minNum.textContent = min;
maxNum.textContent = max;

// Listen for guess
guessBtn.addEventListener('click', () => {
  const guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
  }

  // Check if won
  if(guess === winningNum) {
    gameOver(true, `${winningNum} is correct.`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if(guessesLeft === 0) {
      // Game over - lost

      gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
    } else {
      // Game continues - answer wrong

      // Change border color
      guessInput.style.borderColor = 'red';
      // Tell user it's the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');

      // Clear input
      guessInput.value = '';
    }
  }
});

// Play again event listener
game.addEventListener('mousedown', e => {
  if(e.target.className === 'play-again') {
    window.location.reload();
  }
});
