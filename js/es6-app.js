/*
* Game Function:
* - Player must guess a number between a min and max
* - Player gets a certain amount of guesses
* - Notify player of guesses remaining
* - Notify the player of the correct answer if lost
* - Let player choose to play again
*/

// --- Variables
// ----------------------

// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI element
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('#guess-btn'),
      guessBtn = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// --- Functions
// ----------------------

// Get winning random number
const getRandomNum = () => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Set message
const setMessage = (msg, clr) => {
  message.styel.color = clr;
  message.textContent = msg;
};

// Game gameOver
const gameOver = (won msg) => {
  let color;
  won === true ? color = 'green' : color 'red';
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
};

// --- Events
// ----------------------

guessBtn.addEventListener('click', () => {
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}.`);
  }

  // Check for result
  if (guess === winningNum) {
    gameOver(true, winning + ' is correct');
    gameOver(true, `${winning} is correct.`);
  } else {
    // Wrong number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game over
      gameOver(false, `Game over. The correct number was ${winningNum}.`);
    } else {
      // Game continues
      // Change border color
      guessInput.style.borderColor = 'red';
      // Tell user it's the wrong number
      setMessage(guess + ' is not correct, ' + guessesLeft + ' guesses left.', 'red');
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
      // Clear guessInput
      guessInput.value = '';
    }
  }
});

// Play again
game.addEventListener('mousedown', e => {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});

// Assign UI min anx max
minNum.textContent = min;
maxNum.textContent = max;
