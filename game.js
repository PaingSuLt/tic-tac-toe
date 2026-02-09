function gameBoard() {

    const board = Array(9).fill("");

    const getBoard = () => [...board];

    const getIndex = (index) => board[index]; 

    const addToken = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
        }
    };

    return {getBoard, getIndex, addToken};

}


function Control(player1 = "Player1", player2 = "Player2") {

    const board = gameBoard();
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const players = [
        {name: player1, mark: "X"},
        {name: player2, mark: "O"}
    ];
    let activePlayer = players[0];
    let gameOver = false;

    const isWinner = () => {
        return winConditions.some((conditions) => {
            return conditions.every((index) => {
                return board.getIndex(index) === activePlayer.mark;
                });
            });
    };

    const switchTurn = (index) => {
        //check board[index] if occupied or not
        if(board.getIndex(index) !=="" || gameOver) return;

        //add activePlayer's mark to board[index];
        const mark = activePlayer.mark;
        board.addToken(index,mark);

        if (isWinner()) {
            gameOver = true;
            return {mark, winner: activePlayer.name};
        }

        if (!board.getBoard().includes("")) {
            gameOver = true;
            return {mark, winner: "Draw"};
        }

        //switch players
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        return {mark, winner: null};
        
    };

    return {
        switchTurn,
        getBoard: board.getBoard
    };
    
}

function Display() {
    const game = Control();
    const boardId = document.getElementById('board');
    const displayResult = document.getElementById('displayResult');

    boardId.addEventListener('click', e => {
        const id = e.target.id;

        const result = game.switchTurn(Number(id));

        if (result) {
            e.target.textContent = result.mark;

            if(result.winner === "Draw") {
                displayResult.textContent = "A Tie!";
            }else if(result.winner) {
                displayResult.textContent = `${result.winner} Won!`;
            }
        }
    });
}

Display();
////test and debug here
