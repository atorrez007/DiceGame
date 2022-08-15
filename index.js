// Create variables for the game state
let player1Score = 0;
let player2Score = 0;
let player1Turn = true;
let dice = 0;
let otherDice = 0;
let alive = true;

// DOM Elements
let player1ScoreEl = document.querySelector("#player1ScoreBoard");
let player2ScoreEl = document.querySelector("#player2ScoreBoard");
let player1DiceEl = document.querySelector("#player1Dice");
const player2DiceEl = document.querySelector("#player2Dice");
const rollDiceBtn = document.querySelector("#rollBtn");
const resetBtn = document.querySelector("#resetBtn");
const doubleBtn = document.querySelector("#doubleBtn");
const messageEl = document.querySelector("#message");

// Randomization on the first player to roll

function randomStart() {
  let randomPlayer = Math.floor(Math.random() * 2) + 1;
  if (randomPlayer === 1) {
    player1Turn = true;
    messageEl.textContent = `Player 1 Turn`;
    player1Activate();
  } else {
    player1Turn = false;
    messageEl.textContent = `Player 2 Turn`;
    player2Activate();
  }
}

// Calling the randomization of the first roller
randomStart();

// Changes DOM elements for active player

function player1Activate() {
  player2DiceEl.classList.remove("active");
  player1DiceEl.classList.add("active");
}
function player2Activate() {
  player1DiceEl.classList.remove("active");
  player2DiceEl.classList.add("active");
}

// Game Logic

function game() {
  dice = Math.floor(Math.random() * 6) + 1;
  if (player1Turn) {
    player1DiceEl.textContent = dice;
    player1Score += dice;
    player1ScoreEl.textContent = player1Score;
    player2Activate();
    messageEl.textContent = `Player 2 Turn`;
  } else {
    player2DiceEl.textContent = dice;
    player1Activate();
    messageEl.textContent = `Player 1 Turn`;
    player2Score += dice;
    player2ScoreEl.textContent = player2Score;
  }

  if (player1Score >= 50) {
    messageEl.textContent = `Player 1 Has Won!`;
    resetButton();
    removeDouble();
  } else if (player2Score >= 50) {
    messageEl.textContent = `Player 2 Has Won!`;
    resetButton();
    removeDouble();
  }

  player1Turn = !player1Turn;
}

function doubleGame() {
  doubleDice();
  dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice);
  if (player1Turn && otherDice === 2) {
    player1DiceEl.textContent = dice;
    player1Score += dice * otherDice;
    player1ScoreEl.textContent = player1Score;
    player2Activate();
    messageEl.textContent = `Player 2 Turn`;
  } else if (player1Turn && otherDice === 1) {
    player1DiceEl.textContent = 0;
    player1Score = 0;
    player1ScoreEl.textContent = player1Score;
    player2Activate();
    messageEl.textContent = `Player 2 Turn`;
  } else {
    if (!player1Turn && otherDice === 2) {
      player2DiceEl.textContent = dice;
      player2Score += dice * otherDice;
      player2ScoreEl.textContent = player2Score;
      player1Activate();
      messageEl.textContent = `Player 1 Turn`;
    } else if (!player1Turn && otherDice === 1) {
      player2DiceEl.textContent = 0;
      player2Score = 0;
      player2ScoreEl.textContent = player2Score;
      player1Activate();
      messageEl.textContent = `Player 1 Turn`;
    }
  }

  if (player1Score >= 50) {
    messageEl.textContent = `Player 1 Has Won!`;
    resetButton();
    removeDouble();
  } else if (player2Score >= 50) {
    messageEl.textContent = `Player 2 Has Won!`;
    resetButton();
    removeDouble();
  }

  player1Turn = !player1Turn;
}

// This is the standard game logic into an event handler.
rollDiceBtn.addEventListener("click", game);

// This is the double roll game logic into an event handler.
doubleBtn.addEventListener("click", doubleGame);

function resetGame() {
  playerReset();
  rollButton();
  player1Score = 0;
  player2Score = 0;
  dice = 0;
  randomStart();
  addDouble();
}

resetBtn.addEventListener("click", resetGame);

function resetButton() {
  rollDiceBtn.style.display = "none";
  resetBtn.style.display = "inline-block";
}

function removeDouble() {
  doubleBtn.style.display = "none";
}

function addDouble() {
  doubleBtn.style.display = "inline-block";
}

function rollButton() {
  rollDiceBtn.style.display = "inline-block";
  resetBtn.style.display = "none";
}

function playerReset() {
  player1ScoreEl.textContent = 0;
  player1DiceEl.textContent = 0;
  player2ScoreEl.textContent = 0;
  player2DiceEl.textContent = 0;
}

function doubleDice() {
  otherDice = Math.floor(Math.random() * 2) + 1;
  console.log(otherDice);
}
