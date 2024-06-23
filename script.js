document.addEventListener("DOMContentLoaded", () => {
  const choices = ["rock", "paper", "scissors"];
  let userScore = 0;
  let computerScore = 0;
  let roundsPlayed = 0;
  const maxRounds = 5;
  const results = [];

  const userOptions = document.querySelectorAll(".user-option");
  const resultDiv = document.getElementById("result");
  const resultsTable = document.getElementById("results-table");
  const resultsTableBody = resultsTable.querySelector("tbody");
  const finalWinnerDiv = document.getElementById("final-winner");

  userOptions.forEach((button) => {
    button.addEventListener("click", () => {
      if (roundsPlayed < maxRounds) {
        const userChoice = button.getAttribute("data-choice");
        playRound(userChoice);
      }
    });
  });

  function playRound(userChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = "";

    if (userChoice === computerChoice) {
      result = "It's a tie!";
    } else if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "paper" && computerChoice === "rock") ||
      (userChoice === "scissors" && computerChoice === "paper")
    ) {
      result = `You win! ${userChoice} beats ${computerChoice}.`;
      userScore++;
    } else {
      result = `You lose! ${computerChoice} beats ${userChoice}.`;
      computerScore++;
    }

    roundsPlayed++;
    results.push({
      round: roundsPlayed,
      userChoice,
      computerChoice,
      result,
    });

    if (roundsPlayed === maxRounds) {
      displayFinalResults();
    } else {
      resultDiv.innerText = `Round ${roundsPlayed}: ${result}`;
    }
  }

  function displayFinalResults() {
    resultDiv.innerText = `Final Score - You: ${userScore}, Computer: ${computerScore}`;

    results.forEach((play) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${play.round}</td>
                <td>${play.userChoice}</td>
                <td>${play.computerChoice}</td>
                <td>${play.result}</td>
            `;
      resultsTableBody.appendChild(row);
    });

    resultsTable.style.display = "block";

    let finalWinner = "";
    if (userScore > computerScore) {
      finalWinner = "Congratulations! You are the final winner!";
    } else if (userScore < computerScore) {
      finalWinner = "The computer is the final winner!";
    } else {
      finalWinner = "It's a tie!";
    }

    finalWinnerDiv.innerText = finalWinner;
    finalWinnerDiv.style.display = "block";
  }
});
