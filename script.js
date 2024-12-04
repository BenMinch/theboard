const teamSetup = document.getElementById("team-setup");
const gameBoard = document.getElementById("game-board");
const board = document.getElementById("board");
const numTeams = document.getElementById("num-teams");
const team3Container = document.getElementById("team3-container");
const startGameButton = document.getElementById("start-game");
const currentTurn = document.getElementById("current-turn");
const diceResult = document.getElementById("dice-result");
const rollDiceButton = document.getElementById("roll-dice");

let teams = [];
let currentTeamIndex = 0;
let positions = [];

// Toggle 2 or 3 teams setup
numTeams.addEventListener("change", (e) => {
  if (e.target.value === "3") {
    team3Container.classList.remove("hidden");
  } else {
    team3Container.classList.add("hidden");
  }
});

// Initialize the game
startGameButton.addEventListener("click", () => {
  const team1 = {
    name: document.getElementById("team1-name").value || "Team 1",
    color: document.getElementById("team1-color").value,
  };
  const team2 = {
    name: document.getElementById("team2-name").value || "Team 2",
    color: document.getElementById("team2-color").value,
  };
  teams = [team1, team2];
  if (numTeams.value === "3") {
    const team3 = {
      name: document.getElementById("team3-name").value || "Team 3",
      color: document.getElementById("team3-color").value,
    };
    teams.push(team3);
  }
  positions = new Array(teams.length).fill(0);
  setupBoard();
  teamSetup.classList.add("hidden");
  gameBoard.classList.remove("hidden");
});

// Setup the board
function setupBoard() {
  board.innerHTML = "";
  for (let i = 0; i < 60; i++) {
    const square = document.createElement("div");
    square.className = "square";
    if (i === 0) square.classList.add("start");
    if (i === 59) square.classList.add("finish");
    square.id = `square-${i}`;
    board.appendChild(square);
  }
  placeGamePieces();
}

// Place game pieces
function placeGamePieces() {
  teams.forEach((team, index) => {
    const square = document.getElementById(`square-${positions[index]}`);
    const piece = document.createElement("div");
    piece.className = "game-piece";
    piece.style.backgroundColor = team.color;
    square.appendChild(piece);
  });
}

// Roll dice
rollDiceButton.addEventListener("click", () => {
  const dice = Math.ceil(Math.random() * 6);
  diceResult.textContent = `Dice: ${dice}`;
  movePiece(dice);
  currentTeamIndex = (currentTeamIndex + 1) % teams.length;
  currentTurn.textContent = `Turn: ${teams[currentTeamIndex].name}`;
});

// Move game piece
function movePiece(steps) {
  const teamIndex = currentTeamIndex;
  const oldPosition = positions[teamIndex];
  const newPosition = Math.min(oldPosition + steps, 59);
  positions[teamIndex] = newPosition;

  const oldSquare = document.getElementById(`square-${oldPosition}`);
  const newSquare = document.getElementById(`square-${newPosition}`);

  oldSquare.innerHTML = "";
  placeGamePieces();

  if (newPosition === 59) {
    alert(`${teams[teamIndex].name} wins!`);
    rollDiceButton.disabled = true;
  }
}
