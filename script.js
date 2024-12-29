// Section for variables, objects, arrays for game logic.
const _GAMEBOARD = ['', '', '', '', '', '', '', '', ''];
const _PLAYER1 = { name: 'Player 1', marker: 'X' };
const _PLAYER2 = { name: 'Player 2', marker: 'O' };
const _WINNING_PATTERNS = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];
const cells = document.querySelectorAll('.cell');

let currentPlayer = _PLAYER1;
let isGameOver = false;
let player1Score = 0;
let player2Score = 0;

document.getElementById('startup-form').addEventListener('submit', (e) => {
    e.preventDefault()

    _PLAYER1.name = document.getElementById('player1').value;
    _PLAYER2.name = document.getElementById('player2').value;

    document.getElementById('player1Name').textContent = _PLAYER1.name;
    document.getElementById('player2Name').textContent = _PLAYER2.name;

    // Hide the form container
    document.getElementById('startup-form-container').style.display = 'none';

    console.log('Player 1: ' + _PLAYER1);
    console.log('Player 2: ' + _PLAYER2);
});

if (!isGameOver) {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {

            if (isGameOver) return;

            if (_GAMEBOARD[index] == '') {
                _GAMEBOARD[index] = currentPlayer.marker;
                cell.textContent = currentPlayer.marker;
                const winner = winCheck();

                if (winner) {
                    alert(`${winner} wins!`);
                    if (winner === _PLAYER1.name) {
                        player1Score++;
                        console.log(player1Score);
                        document.getElementById('player1-score').textContent = player1Score;
                    } else if (winner === _PLAYER2.name) {
                        player2Score++;
                        document.getElementById('player2-score').textContent = player2Score;
                    }
                    isGameOver = true;
                    cleanUpLogic();
                } else {
                    const isBoardFull = _GAMEBOARD.every(cell => cell !== '');
                    if (isBoardFull) {
                        alert('It\'s a draw!');
                        isGameOver = true;
                        cleanUpLogic();
                    } else {
                    // Switch to the next player
                    currentPlayer = currentPlayer === _PLAYER1 ? _PLAYER2 : _PLAYER1;
                    }
                }
            }
        });
    });
}

// A function to check win patterns
function winCheck() {
    // Iterate through the pre-defined winning patterns
    for (let pattern of _WINNING_PATTERNS) {
        const [a, b, c] = pattern; // Destructure the pattern to get the indices. 

        // Check if the values in these indices are the same and not empty
        if (_GAMEBOARD[a] && _GAMEBOARD[a] === _GAMEBOARD[b] && _GAMEBOARD[a] === _GAMEBOARD[c]) {
            //return _GAMEBOARD[a];  // Return the winner ('X' or 'O')
            if(_GAMEBOARD[a] === _PLAYER1.marker) {
                return _PLAYER1.name;
            } else if (_GAMEBOARD[a] === _PLAYER2.marker) {
                return _PLAYER2.name;
            }
        }
    }

    // If no winner is found, return null (indicating no win)
    return null;
}

// Logic to clean up when there's a winner
function cleanUpLogic() {
 if (isGameOver === true) {
    alert('Game over!');
    // Reset the gameboard array
    _GAMEBOARD.fill('');

    // Reset the gameboard cells
    cells.forEach(cell => {
        cell.textContent = '';
    });

    // Reset the game state variables
    currentPlayer = _PLAYER1;  // Start with Player 1 again
    isGameOver = false;        // Set the game status to active

    // Optionally, you could reset scores here if you want the game to reset scores on each round
    //player1Score = 0;
    //player2Score = 0;
    //document.getElementById('player1-score').textContent = player1Score;
    //document.getElementById('player2-score').textContent = player2Score;
     
    console.log('Game has been reset!');
 }
}