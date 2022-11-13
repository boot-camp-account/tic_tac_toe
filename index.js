const form = document.getElementById("addPlayer");
const playerButtons = document.getElementById("playerButtons");
const player1Button = document.getElementById("player1Button");
const player2Button = document.getElementById("player2Button");
const playerList = document.getElementById("players");
const playerNames = document.getElementById("player-names");
const play1Name = document.getElementById("player1Name");
const playerInstructions = document.getElementById("playerInstructions");
const twoPlayerInstructions = document.getElementById("twoPlayerInstructions");
const gameContainer = document.getElementById("gameContainer");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const playerSelection = document.querySelector("#playerSelection");
const buttonDing = new Audio("toy-button.mp3");
const uiClick = new Audio("button-pressed.mp3");
const victory = new Audio("victory.mp3");
const draw = new Audio("draw.mp3");
const refresh = new Audio("rustle.mp3");
const camera = new Audio("camera.mp3");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

form.addEventListener("submit", addPlayer);
form.addEventListener("submit", playSound2);
player1Button.addEventListener("click", start1PlayerGame);
player2Button.addEventListener("click", start2PlayerGame);
playerSelection.addEventListener("click", initializeGame);
playerSelection.addEventListener("click", playSound);

initializeGame();

function playSound () {
    uiClick.play();
}

function playSound2 () {
    camera.play();
}

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;

    playerInstructions.classList.add("hidden");
    gameContainer.classList.add("hidden");
    playerButtons.classList.remove("hidden");
}

function addPlayer(e) {
    e.preventDefault();

    let newPlayer = document.getElementById("playerName").value;
    let li = document.createElement("li");
    li.className = "list-group-item";
    li.appendChild(document.createTextNode(newPlayer));

    playerList.appendChild(li);
    playerNames.classList.remove("player-names");
}

function start1PlayerGame () {
    uiClick.play();

    let li = document.createElement("li");
    li.appendChild(document.createTextNode("Computer"));
    playerList.appendChild(li);
    playerList.classList.remove("hidden");

    gameContainer.classList.remove("hidden");
    playerInstructions.classList.remove("hidden");
    twoPlayerInstructions.classList.add("hidden");
    playerButtons.classList.add("hidden");
}

function start2PlayerGame () {
    uiClick.play();
    gameContainer.classList.remove("hidden");
    playerInstructions.classList.remove("hidden");
    playerButtons.classList.add("hidden");
    play1Name.classList.add("hidden");
}

function cellClicked() {
    buttonDing.play();
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        victory.play();
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        draw.play();
        statusText.textContent = `Draw!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame() {
    refresh.play();
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}