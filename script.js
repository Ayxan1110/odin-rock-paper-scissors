let humanScore = 0;
let computerScore = 0;
const winningScore = 5;

const choiceButtons = document.querySelectorAll("#buttons button");
const humanScoreText = document.querySelector("#human-score");
const computerScoreText = document.querySelector("#computer-score");
const resultText = document.querySelector("#result");
const playAgainBtn = document.querySelector("#play-again");

// Math.random() gives a number from 0 to 1, so we split it in 3 parts
function getComputerChoice() {
  const random = Math.random();
  if (random < 1 / 3) {
    return "rock";
  } else if (random < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    resultText.textContent = `Tie! You both chose ${capitalize(humanChoice)}.`;
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    resultText.textContent = `You win! ${capitalize(humanChoice)} beats ${capitalize(computerChoice)}.`;
  } else {
    computerScore++;
    resultText.textContent = `You lose! ${capitalize(computerChoice)} beats ${capitalize(humanChoice)}.`;
  }

  humanScoreText.textContent = humanScore;
  computerScoreText.textContent = computerScore;
  checkGameOver();
}

function checkGameOver() {
  if (humanScore === winningScore || computerScore === winningScore) {
    const winner = humanScore === winningScore ? "You won the game! 🎉" : "The computer won the game.";
    resultText.textContent += ` ${winner}`;
    choiceButtons.forEach((button) => (button.disabled = true));
    playAgainBtn.style.display = "block";
  }
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  humanScoreText.textContent = 0;
  computerScoreText.textContent = 0;
  resultText.textContent = "Make your choice!";
  choiceButtons.forEach((button) => (button.disabled = false));
  playAgainBtn.style.display = "none";
}

choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    playRound(button.dataset.choice, getComputerChoice());
  });
});

playAgainBtn.addEventListener("click", resetGame);
