const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
let currentPlayer = 'x';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] !== '') return;

    gameState[index] = currentPlayer;
    e.target.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 100);
        resetGame();
    } else if (gameState.every(cell => cell !== '')) {
        setTimeout(() => alert('Draw!'), 100);
        resetGame();
    } else {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    }
}

function checkWin(player) {
    return winPatterns.some(pattern => {
        return pattern.every(index => {
            return gameState[index] === player;
        });
    });
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
    });
}


//* Adding an AI Opponent*//

function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] !== '' || !isHumanTurn()) return;

    gameState[index] = currentPlayer;
    e.target.classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 100);
        resetGame();
    } else if (gameState.every(cell => cell !== '')) {
        setTimeout(() => alert('Draw!'), 100);
        resetGame();
    } else {
        currentPlayer = 'o';
        setTimeout(aiMove, 500); // Delay AI move for better UX
    }
}

function isHumanTurn() {
    return currentPlayer === 'x';
}

function aiMove() {
    let availableMoves = gameState.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    
    gameState[move] = currentPlayer;
    cells[move].classList.add(currentPlayer);

    if (checkWin(currentPlayer)) {
        setTimeout(() => alert(`AI (${currentPlayer.toUpperCase()}) wins!`), 100);
        resetGame();
    } else if (gameState.every(cell => cell !== '')) {
        setTimeout(() => alert('Draw!'), 100);
        resetGame();
    } else {
        currentPlayer = 'x';
    }
}

//* Adding Sound  Effects*//

const moveSound = new Audio('move.mp3');
const winSound = new Audio('win.mp3');
const drawSound = new Audio('draw.mp3');

function handleClick(e) {
    const index = e.target.dataset.index;

    if (gameState[index] !== '' || !isHumanTurn()) return;

    gameState[index] = currentPlayer;
    e.target.classList.add(currentPlayer);
    moveSound.play();

    if (checkWin(currentPlayer)) {
        winSound.play();
        setTimeout(() => alert(`${currentPlayer.toUpperCase()} wins!`), 100);
        resetGame();
    } else if (gameState.every(cell => cell !== '')) {
        drawSound.play();
        setTimeout(() => alert('Draw!'), 100);
        resetGame();
    } else {
        currentPlayer = 'o';
        setTimeout(aiMove, 500);
    }
}

//* theme ToggleButton *//
const themeToggleButton = document.getElementById('theme-toggle');
themeToggleButton.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
