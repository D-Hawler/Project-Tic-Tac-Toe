const startGameButton = document.querySelector("#startGame");
startGameButton.addEventListener("click", function () {
    startGameButton.remove();

    fetch('dialogWindow.html')
        .then(response => response.text())
        .then(html => {
            document.body.insertAdjacentHTML('beforeend', html);
            document.querySelector("#dialogForCreatePlayer").showModal();

            document.querySelector("#dialogForCreatePlayer").addEventListener('cancel', (e) => {
                    e.preventDefault();
                });
                document.querySelector("#dialogForCreatePlayer").addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                });

            function createColorGrid() {
                const colors = [
                    "#D32F2F", // насыщенно-красный
                    "#F57C00", // насыщенно-оранжевый
                    "#FBC02D", // насыщенно-желтый
                    "#F9A825", // золотисто-желтый

                    "#AEEA00", // ярко-лаймовый
                    "#388E3C", // насыщенно-зеленый
                    "#43A047", // зеленый
                    "#00BFAE", // бирюзовый

                    "#00B8D4", // голубой
                    "#1976D2", // насыщенно-синий
                    "#1565C0", // синий
                    "#283593", // сине-фиолетовый

                    "#512DA8", // фиолетовый
                    "#7B1FA2", // пурпурно-фиолетовый
                    "#C2185B", // насыщенно-розовый
                    "#D81B60"  // розово-фиолетовый
                ];

                const colorGrid = document.querySelector("#colorGrid");
                for (let i = 0; i < 16; i++) {
                    const colorBlock = document.createElement("div");
                    colorBlock.style.backgroundColor = colors[i];
                    colorGrid.appendChild(colorBlock);
                };
            };
            createColorGrid();

            let playerOne = false;
            function isPlayerNumber() {
                const playerPlaceholder = ["player one", "player two"];

                if (playerOne === false) {
                    document.querySelector("#dialogForCreatePlayer h1").textContent = playerPlaceholder[0].charAt(0).toUpperCase() + playerPlaceholder[0].slice(1);
                    document.querySelector("#dialogForCreatePlayer label").textContent = `Enter ${playerPlaceholder[0]}'s name:`;
                } else {
                    document.querySelector("#dialogForCreatePlayer h1").textContent = playerPlaceholder[1].charAt(0).toUpperCase() + playerPlaceholder[1].slice(1);
                    document.querySelector("#dialogForCreatePlayer label").textContent = `Enter ${playerPlaceholder[1]}'s name:`;
                };
            };
            isPlayerNumber();

            let playerColor = "rgb(0, 0, 0)";
            const getElementColorGrid = colorGrid.querySelectorAll("div");
            const namePlaer = document.querySelector("#name");
            getElementColorGrid.forEach(block => {
                block.addEventListener("click", function () {
                    namePlaer.style.color = this.style.backgroundColor;
                    playerColor = this.style.backgroundColor;
                });
            });

            let players = [];
            document.querySelector("#create").addEventListener("click", function(event) {
                event.preventDefault();

                const namePlaer = document.querySelector("#name");
                if (namePlaer.value.trim().length > 3) {
                    players.push({ namePlaer: namePlaer.value.trim(), playerColor });

                    namePlaer.value = "";
                    playerColor = "rgb(0, 0, 0)";
                    namePlaer.style.color = "rgb(0, 0, 0)";

                    if (playerOne === false) {
                        playerOne = true;
                        isPlayerNumber();
                    } else {
                        document.querySelector("#dialogForCreatePlayer").close();

                        const items = document.querySelectorAll("#controlPanel li");
                        const arrayItems = [items[0], items[1]];
                        const currentPlayer = ["X", "O"];
                        for (let i = 0; i < 2; i++) {
                            arrayItems[i].textContent = `${players[i].namePlaer} (${currentPlayer[i]}): 000`;
                            arrayItems[i].style.color = players[i].playerColor;
                        };
                    };
                };
            });
        });

    fetch('gameBord.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('#gameArea').insertAdjacentHTML('beforeend', html);

            function createGameBoard() {
                for (let i = 0; i < 9; i++) {
                    const cell = document.createElement("div");
                    cell.id = `cell${i}`;
                    cell.classList.add("cell");
                    document.querySelector("#gameBoard").appendChild(cell);
                };
            };
            createGameBoard();
            // Creating the playing field

            let stup = 0;
            document.querySelectorAll("#gameBoard .cell").forEach(cell => {
                cell.addEventListener("click", function () {
                    if (gameOver === false) {
                        if (systemGameBoard[cell.id.slice(-1)] === undefined) {
                            stup++;
                            let runningOrder = getTurn(cell, currentPlayer = stup % 2 === 0 ? "O" : "X");
                            checkWin(runningOrder);

                            cell.textContent = runningOrder;
                        };
                    };
                });
            });
            // Initializing a move

            document.querySelector("#reset").addEventListener("click", function () {
                systemGameBoard = Array(9).fill(undefined);
                gameOver = false;

                stup = 0;

                document.querySelectorAll("#gameBoard .cell").forEach(cell => {
                    cell.textContent = "";
                    cell.removeAttribute("style", "background-color");
                });

                document.querySelector("#gameArea > h1").textContent = "";
            });
            // Restarting the game
        });
});


let systemGameBoard = Array(9).fill(undefined);
let gameOver = false;
function getTurn(cell, currentPlayer) {
    let userMove = cell.id.slice(-1);

    if (userMove < 9) {
        if (systemGameBoard[userMove] === undefined) {
            systemGameBoard[userMove] = currentPlayer;
        };
    };

    return currentPlayer;
};
// Process of movement

let playersScore = [0, 0];
function checkWin(runningOrder) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    let winningConditionCheck = winningCombinations.findIndex(comb =>
        comb.map(i => systemGameBoard[i]).every(cell => cell === currentPlayer && cell !== undefined)
    );

    if (winningConditionCheck !== -1) {
        const arrayIndex = winningCombinations[winningConditionCheck];
        for (let i = 0; i < 3; i++) {
            document.querySelector(`#cell${arrayIndex[i]}`).style.backgroundColor = "rgba(0, 255, 0, 0.5)";
        };

        runningOrder = runningOrder === "X" ? 0 : 1;

        const items = document.querySelectorAll("#controlPanel li");
        const arrayItems = [items[0], items[1]];
        const textItems = [arrayItems[0].textContent, arrayItems[1].textContent];
 
        playersScore[runningOrder]++;
        for (i = 0; i < 2; i++) {
            if (playersScore[i] >= 10) {
                sliceNumber = -2;
                if (playersScore[i] >= 100) {
                    sliceNumber = -3;
                };
            } else {
                sliceNumber = -1;
            };
            arrayItems[i].textContent = `${textItems[i].slice(0, sliceNumber)}${playersScore[i]}`
            if (playersScore[0] === 999 || playersScore[1] === 999) {
                Object.freeze(playersScore);

                const secretMessage = document.createElement("dialog");

                const secretText = document.createElement("h1");
                secretText.textContent = "You found the secret message, you must have worked very hard to reach it.";

                secretMessage.appendChild(secretText);
                secretMessage.addEventListener('cancel', (e) => {
                    e.preventDefault();
                });
                secretMessage.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                    }
                });

                document.body.appendChild(secretMessage);

                secretMessage.showModal();
            };
        };

        gameOver = true;
    };

    if (winningConditionCheck === -1 && systemGameBoard.every(cell => cell !== undefined)) {
        document.querySelector("#gameArea > h1").textContent = "DRAW";
    };
};
// Checking for victory