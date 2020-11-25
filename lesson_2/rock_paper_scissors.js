const readline = require('readline-sync');
const VALID_CHOICES = ['r', 'p', 's', 'l', 'k'];
const MESSAGE = require('./rock_paper_scissors.json');

function letterToWord(letter) {
  if (letter === 'r') {
    return 'rock';
  } else if (letter === 'p') {
    return 'paper';
  } else if (letter === 's') {
    return 'scissors';
  } else if (letter === 'l') {
    return 'lizard';
  } else {
    return 'spock';
  }
}

function isPlayerWinner(choice, computerChoice) {
  if ((choice === 'r' && (computerChoice === 's' || computerChoice === 'l')) ||
    (choice === 'p' && (computerChoice === 'r' || computerChoice === 'k')) ||
    (choice === 's' && (computerChoice === 'p' || computerChoice === 'l')) ||
    (choice === 'k' && (computerChoice === 's' || computerChoice === 'r')) ||
    (choice === 'l' && (computerChoice === 'k' || computerChoice === 'p'))) {
    return true;
  } else {
    return false;
  }
}

function isComputerWinner(choice,computerChoice) {
  if ((computerChoice === 'r' && (choice === 's' || choice === 'l')) ||
    (computerChoice === 'p' && (choice === 'r' || choice === 'k')) ||
    (computerChoice === 's' && (choice === 'p' || choice === 'l')) ||
    (computerChoice === 'k' && (choice === 's' || choice === 'r')) ||
    (computerChoice === 'l' && (choice === 'k' || choice === 'p'))) {
    return true;
  } else {
    return false;
  }
}

function isPlayerOrComputerWinner(playerWinnerResult, computerWinnerResult) {
  if (playerWinnerResult === true) {
    return "You win!";
  } else if (computerWinnerResult === true) {
    return "The computer wins!";
  } else {
    return "It's a tie!";
  }
}

function prompt(message) {
  console.log(`--> ${message}\n`);
}

function countWins(winnerMessage, personWinsArray, computerWinsArray) {
  if (winnerMessage === "You win!") {
    personWinsArray.push('1');
  } else if (winnerMessage === "The computer wins!") {
    computerWinsArray.push('1');
  }
}

function whoIsGrandWinner(personWinsArray, computerWinsArray) {
  if (personWinsArray.length === 3) {
    console.log(MESSAGE["PlayerGrandWins"]);
  } else if (computerWinsArray.length === 3) {
    console.log(MESSAGE["ComputerGrandWins"]);
  } else {
    console.log(MESSAGE["FirstToWin"]);
  }
}

function playQuestion() {
  prompt(MESSAGE["Question"]);
  let answer = readline.question().toLowerCase();

  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt(MESSAGE["YesOrNo"]);
    answer = readline.question().toLowerCase();
  }

  if (answer[0] === 'n') {
    return false;
  } else {
    return true;
  }
}

let personWinsArray = [];
let computerWinsArray = [];

console.log(MESSAGE["Welcome"]);
console.log(MESSAGE["Instructions"]);

let start = playQuestion();

while (start) {
  prompt(MESSAGE["Choose"]);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt(MESSAGE["Invalid"]);
    choice = readline.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  let myWord = letterToWord(choice);
  let computerWord = letterToWord(computerChoice);

  console.log('');
  prompt(`You chose '${myWord}' and the computer chose '${computerWord}'`);

  let didPlayerWin = isPlayerWinner(choice, computerChoice);
  let didComputerWin = isComputerWinner(choice, computerChoice);
  let winner = isPlayerOrComputerWinner(didPlayerWin, didComputerWin);
  prompt(winner);

  countWins(winner, personWinsArray, computerWinsArray);
  prompt(`Player Score: ${personWinsArray.length}`);
  prompt(`Computer Score: ${computerWinsArray.length}`);
  whoIsGrandWinner(personWinsArray,computerWinsArray);

  if (personWinsArray.length === 3) {
    start = false;
  } else if (computerWinsArray.length === 3) {
    start = false;
  }
}
