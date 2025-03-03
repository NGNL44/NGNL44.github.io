
var player1 = "R";
var player2 = "Y";
var current = player1

var playerIndex = 0

var gameOver = false;
var board;

var rows = 6;
var columns = 7;
var columnSpace = [];



window.onload = function () {
    setGame();
}

function setGame() {
    board = [];
    columnSpace = [5, 5, 5, 5, 5, 5, 5]; // represents how much space there is on a certain column

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {

            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString(); // every position has an id in the format of [r]-[c]. ie. 0-0, 5-4
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);

        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return;
    }


    let coordinate = this.id.split('-');
    let r = parseInt(coordinate[0]);
    let c = parseInt(coordinate[1]);

    //makes pieces go to the bottom
    r = columnSpace[c];

    if (r < 0) { //if there is no space in that column, do nothing
        return;
    }

    board[r][c] = current;

    let tile = document.getElementById(r.toString() + "-" + c.toString());
    if (current == player1) {
        tile.classList.add("red-piece");
        current = player2;
    }
    else {
        tile.classList.add("yellow-piece");
        current = player1;
    }
    r -= 1;
    columnSpace[c] = r;

    checkWin();
}

function checkWin() {

    //checking horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] != " ") {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // checking vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    //checking diagonally
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == player1) {
        window.alert("Player 1 wins")
    }
    else {
        window.alert("Player 2 wins")
    }
    gameOver = true;
}