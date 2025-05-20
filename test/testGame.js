let gameBoard = ['X', , , , , , , , ];

console.log(gameBoard.length);





function getTurn(currentPlayer = "O") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    let userMove = prompt("Enter the cell number (1 to 9):") - 1;

    if (userMove < 9) {
        if (gameBoard[userMove] === undefined) {
            gameBoard[userMove] = currentPlayer;
            console.log(gameBoard);

            checkWin();
        } else {
            console.log("This cage is already occupied. Try again."); 
        };
    } else {
        console,log("This cage is already occupied. Try again.");
    };
};

function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4 ,8], [2, 4, 6]
  ] 
};