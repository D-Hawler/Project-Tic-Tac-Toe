for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.id = `cell${i}`;
    cell.classList.add("cell");

    document.querySelector("#gameBoard").appendChild(cell);
};
//Creating the playing field

let systemGameBoard = [ , , , , , , , , ];
function getTurn(cell, currentPlayer) {
    let userMove = cell.id.slice(-1);

    if (userMove < 9) {
        if (systemGameBoard[userMove] === undefined) {
            systemGameBoard[userMove] = currentPlayer;
            checkWin();
        };
    };

    function checkWin() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        let winningConditionCheck = winningCombinations.some(comb =>
            comb.map(i => systemGameBoard[i]).every(cell => cell === currentPlayer && cell !== undefined)
        );

        if (winningConditionCheck) {
            console.log("win!");
        } else {
            console.log("No");
        };
    };

    return currentPlayer;
};
// Process of movement

let stup = 0;
document.querySelectorAll("#gameBoard .cell").forEach(cell => {
    cell.addEventListener("click", function() {
        stup++;

        let runningOrder = getTurn(cell, currentPlayer = stup % 2 === 0 ? "O" : "X");
        cell.textContent = runningOrder;
    });
});
// Initializing a move