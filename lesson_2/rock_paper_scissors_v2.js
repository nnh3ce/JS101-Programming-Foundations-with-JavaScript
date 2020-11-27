const readline = require('readline-sync');
const VALID_CHOICES = ['r', 'p', 's', 'l', 'k'];
const MESSAGE = require('./rock_paper_scissors.json');
const ROUNDS = 3;
const WINNING_CHOICES = {
  r: ['s','l'],
  p: ['r', 'k'],
  s: ['p', 'l'],
  k: ['s', 'r'],
  l: ['k', 'p']
};

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

function isWon(choice1, choice2) {
  return WINNING_CHOICES[choice1].includes(choice2);
}

function prompt(message) {
  console.log(`--> ${message}\n`);
}

let personCounter = 0;
let computerCounter = 0;

let score = {
  person: 0,
  computer: 0
};

function countWins(winnerMessage) {
  if (winnerMessage === "You win!") {
    personCounter += 1;
    score["person"] = personCounter;
  } else if (winnerMessage === "The computer wins!") {
    computerCounter += 1;
    score["computer"] = computerCounter;
  }
}

function whoIsGrandWinner(scorePerson, scoreComputer) {
  if (scorePerson === ROUNDS) {
    console.log(MESSAGE["PlayerGrandWins"]);
  } else if (scoreComputer === ROUNDS) {
    console.log(MESSAGE["ComputerGrandWins"]);
  } else {
    console.log(MESSAGE["FirstToWin"]);
  }
}

function isInvalid(wrongAnswer) {
  return wrongAnswer.toLowerCase() !== 'yes' && wrongAnswer.toLowerCase() !==
  'no' && wrongAnswer.toLowerCase() !== 'y' && wrongAnswer.toLowerCase() !==
  'n';
}

function playQuestion() {
  prompt(MESSAGE["Question"]);
  let answer = readline.question().toLowerCase();

  while (isInvalid(answer)) {
    prompt(MESSAGE["YesOrNo"]);
    answer = readline.question().toLowerCase();
  }

  return !(answer[0] === "n");
}

function winner(choice, computerChoice) {
  if (isWon(choice, computerChoice)) {
    return "You win!";
  } else if (isWon(computerChoice, choice)) {
    return "The computer wins!";
  } else {
    return "It's a tie!";
  }
}

function chooseAnswer() {
  prompt(MESSAGE["Choose"]);
  let choice = readline.question();
  choice = choice.toLowerCase();

  while (!VALID_CHOICES.includes(choice)) {
    prompt(MESSAGE["Invalid"]);
    choice = readline.question();
    choice = choice.toLowerCase();
  }
  return choice;
}

console.log(MESSAGE["Welcome"]);
console.log(MESSAGE["Instructions"]);

let start = playQuestion();
console.log("");

while (start) {
  let choice = chooseAnswer();
  console.clear();
  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  let myWord = letterToWord(choice);
  let computerWord = letterToWord(computerChoice);

  console.log('');
  prompt(`You chose '${myWord}' and the computer chose '${computerWord}'`);

  //console.log(choice, computerChoice);
  //console.log(isWon(choice,computerChoice));

  countWins(winner(choice, computerChoice));

  prompt(`Player Score: ${score["person"]}`);
  prompt(`Computer Score: ${score["computer"]}`);
  whoIsGrandWinner(score["person"], score["computer"]);
  console.log("");

  if (score["person"] === ROUNDS) {
    start = false;
  } else if (score["computer"] === ROUNDS) {
    start = false;
  }
}

/*

Edits:

1. Case insensitivity - "y","Y", "YES",or "Yes"is valid input.
2. Case insensitivity - "r" or "R" is valid input.
3. Case insensitivity to validation while loop.
4. Used 'const' for number of rounds instead of magic number.
5. Used object to keep track of score instead of array. Added counters
   & updated function logic.
6. Created object with winning choices and function that returns true for
   winning choice.
7. Separated winning function messages from logic.
8. Created chooseAnswer() function that returns answer.
9. Edited playQuestion return statement.

*/