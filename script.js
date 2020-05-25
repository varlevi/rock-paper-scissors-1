// JS classes are weird tbh
class Score {
	constructor(player, computer) {
		this.player = player;
		this.computer = computer;
	}

	incrementPlayerScore() {
		return this.player += 1;
	}

	incrementComputerScore() {
		return this.computer += 1;
	}

	changePlayerScore() {
		let visual = document.getElementsByClassName('player-score')[0];
		let newScore = this.incrementPlayerScore();

		visual.textContent = newScore;
	}

	changeComputerScore() {
		let visual = document.getElementsByClassName('computer-score')[0];
		let newScore = this.incrementComputerScore();

		visual.textContent = newScore;
	}

	resetScore() {
		this.player = 0;
		this.computer = 0;
		// Grab node that stores the text and set them to 0
		let player = document.querySelector('.player-score');
		let robot = document.querySelector('.computer-score');
		robot.textContent = this.player;
		player.textContent = this.computer;
	}
}

// Function to return location of png image given computer choice
function computerImage(computerChoice) {
	if (computerChoice == "Rock") return "images/the-rock.png";
	else if (computerChoice == "Paper") return "images/paper-doodlebob.png";
	else if (computerChoice == "Scissors") return "images/scissors.png";
}

function addImages(playerImage, computerImage) {
	let firstImg = document.createElement("img");
	let secondImg = document.createElement("img");
	let parent = document.querySelector('.battle-box');
	let text = document.createElement("p");
	text.textContent = "vs";

	// Add CSS classes to new images and paragraph
	firstImg.classList.add("cool-image");
	secondImg.classList.add("cool-image");
	text.classList.add("compare");

	firstImg.src = playerImage;
	parent.appendChild(firstImg);
	parent.appendChild(text);
	secondImg.src = computerImage;
	parent.appendChild(secondImg);
}

function removeImages() {
	let firstImg = document.getElementsByClassName('cool-image')[0];
	let secondImg = document.getElementsByClassName('cool-image')[1];
	let text = document.getElementsByClassName('compare')[0];
	let parent = document.getElementsByClassName('battle-box')[0];

	parent.removeChild(firstImg);
	parent.removeChild(secondImg);
	parent.removeChild(text);
}

function imagesArePresent() {
	return document.getElementsByClassName('battle-box')[0].hasChildNodes();
}

// Function to dynamically add results to DOM
function compareHands(playerChoice, computerChoice, result) {
	let changeText = document.getElementsByClassName('text-result')[0];

	changeText.style.animation = 'none';
	setTimeout(function () {
		changeText.style.animation = '';
	}, 10);

	if (result == "draw") {
		changeText.textContent = `It's a draw!`;
	}
	else if (result == "win") {
		changeText.textContent = `${playerChoice} beats ${computerChoice}!`;
	}
	else if (result == "loss") {
		changeText.textContent = `${playerChoice} loses to ${computerChoice}!`;
	}
}

// Function to randomly choose computer hand choice
function computerPlay() {
	const gameChoices = ['Rock', 'Paper', 'Scissors'];
	let handShape = Math.floor(Math.random() * 3);
	return gameChoices[handShape];
}

// Function to determine the result between player and computer
function playRound(playerChoice, computerSelection) {
	if (playerChoice === computerSelection) return "draw";

	if (playerChoice === "Rock") {
		if (computerSelection === "Scissors") return "win";
		else if (computerSelection === "Paper") return "loss";
	}
	else if (playerChoice === "Paper") {
		if (computerSelection === "Rock") return "win";
		else if (computerSelection === "Scissors") return "loss";
	}
	else if (playerChoice === "Scissors") {
		if (computerSelection === "Paper") return "win";
		else if (computerSelection === "Rock") return "loss";
	}
}

function incrementScore(object, result) {
	if (result == "draw") return;

	if (result == "win") object.changePlayerScore();

	else if (result == "loss") object.changeComputerScore();
}

function decideWinner(playerWins, computerWins) {
	let changeText = document.getElementsByClassName('text-result')[0];

	if (playerWins > computerWins) { 
		changeText.textContent = 'You Won!';
		let soundClip = new Audio("sounds/poggers.mp3");
		soundClip.play();
	} else {
		changeText.textContent = 'Computer Wins!';
		let soundClip = new Audio("sounds/not-poggers.mp3");
		soundClip.play();
	} 
		
}

function pressButtonEvent(score, series, playerChoice, playerImage) {
	if (score.player == 5 || score.computer == 5) return;
	if (series.rounds > 0 && imagesArePresent()) removeImages();

	// Computer goes through RNG and returns hand shape.
	let computerChoice = computerPlay();
	// Compare player hand and computer hand to dermine win or loss
	let gameResult = playRound(playerChoice, computerChoice);

	// Writes down result in DOM
	compareHands(playerChoice, computerChoice, gameResult);

	// computerImage returns the src id of the image
	let computerImg = computerImage(computerChoice);

	// addImages doesn't get images deleted on draw in round 0,
	// so here's a bad fix
	if (gameResult == "draw" && series.rounds == 0) {
		series.incrementRounds();
		series.incrementMaxRounds();
	}
	addImages(playerImage, computerImg);

	if (gameResult == "draw") {
		series.incrementMaxRounds();
		return;
	}

	incrementScore(score, gameResult);
	series.incrementRounds();

	if (score.player == 5 || score.computer == 5) {
		decideWinner(score.player, score.computer);
	}
}

class Rounds {
	constructor(rounds, maxRounds) {
		this.rounds = rounds;
		this.maxRounds = maxRounds;
	}

	incrementRounds() {
		return this.rounds += 1;
	}

	incrementMaxRounds() {
		return this.maxRounds += 1;
	}

	resetRounds() {
		this.rounds = 0;
		this.maxRounds = 5;
	}

}

function game(score, series) {
	const gameChoices = ['Rock', 'Paper', 'Scissors'];

	const rockButton = document.getElementsByClassName('rock')[0];
	const paperButton = document.getElementsByClassName('paper')[0];
	const scissorButton = document.getElementsByClassName('scissors')[0];

	rockButton.addEventListener('click', function () {
		pressButtonEvent(score, series, gameChoices[0], "images/the-rock.png");
	});

	paperButton.addEventListener('click', function () {
		pressButtonEvent(score, series, gameChoices[1], "images/paper-doodlebob.png");
	});

	scissorButton.addEventListener('click', function () {
		pressButtonEvent(score, series, gameChoices[2], "images/scissors.png");
	});

}

// Function to set everthing to initial game state
function resetGame(score, series) {
	const resetButton = document.querySelector('.reset-button');
	let changeText = document.getElementsByClassName('text-result')[0];

	resetButton.addEventListener('click', () => {
		changeText.textContent = "Press a button to start";
		score.resetScore();
		series.resetRounds();
		if (imagesArePresent()) removeImages();
	});
}

function main() {
	// Objects to store values of score and rounds
	let gameScore = new Score(0, 0);
	let series = new Rounds(0, 5);

	// Play the game
	resetGame(gameScore, series);
	game(gameScore, series);
}

main();
