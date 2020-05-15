function computerPlay() {
    let handShape = Math.floor(Math.random() * 3);
  
    switch (handShape) {
      case 0:
        return "rock";
      case 1:
        return "paper";
      case 2:
        return "scissors";
    }
  }
  
  function playRound(playerSelection, computerSelection) {
    let playerChoice = playerSelection.toLowerCase();
    
    if (playerChoice === computerSelection) return "draw";
  
    if (playerChoice === "rock") {
      if (computerSelection === "scissors") return "win";
      else if (computerSelection === "paper") return "loss";
    }
    else if (playerChoice === "paper") {
      if (computerSelection === "rock") return "win";
      else if (computerSelection === "scissors") return "loss";
    }
    else if (playerChoice === "scissors") {
      if (computerSelection === "paper") return "win";
      else if (computerSelection === "rock") return "loss";
    }
  }
  
  function game() {
    let playerWinCount = 0;
    let computerWinCount = 0;
    let drawCount = 0;
    let rounds = 5;
  
    for (let i = 0; i < rounds; ++i) {
      let playerHand = prompt("Rock, Paper, or Scissors?");
      let result = playRound( playerHand, computerPlay() );
  
      if (result === "draw") {
        rounds++;
        drawCount++;
        continue;
      }
  
      if (result === "win") playerWinCount++;
      else if (result === "loss") computerWinCount++;
  
      // Draw count only updates in the console once a win or loss
      // occurs.
      console.log(`Score is: Player [${playerWinCount}] Computer 
                    [${computerWinCount}] Draws [${drawCount}]`);
    }
  
    console.log(`Final Scores: Player [${playerWinCount}] 
                        Computer [${computerWinCount}]`);
  
    return ( (playerWinCount > computerWinCount) ? "You Win!" : "Computer Wins!");
  }
  
  console.log( game() );