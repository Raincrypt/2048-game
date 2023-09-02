let board;
let score = 0;
const maxRow = 4, maxColumn = 4;

const tileContainer = document.querySelector('#board');
const tileTemplate = document.querySelector('template');
const gameOver = document.querySelector(".game-over-container")
const finalScore = document.querySelector('#score');

window.onload = () => {
    setGame();
}

const setGame = () => {
    if(gameOver) gameOver.classList.remove("game-over");
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    
    for (let r = 0; r < maxRow; r++) {
        for (let c = 0; c < maxColumn; c++) {
            const num = board[r][c];

            const tileClone = tileTemplate.content.cloneNode(true);
            const newTile = tileClone.querySelector('.tile');
            newTile.id = `t${r}-${c}`;
            setTile(newTile, num);
            tileContainer.appendChild(tileClone);
        }
    }
    finalScore.innerText = 2;

    generateTwo(board);
    generateTwo(board);
}

const resetGame = () => {
    gameOver.classList.remove("game-over");

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]

    for (let r = 0; r < maxRow; r++) {
        for (let c = 0; c < maxColumn; c++) {
            let tile = document.querySelector(`#t${r}-${c}`)
            setTile(tile, 0);
        }
    }

    generateTwo(board);
    generateTwo(board);
}

// Creates Tile
const setTile = (newTile, value) => {
    newTile.innerText = "";
    newTile.classList.value = "";
    newTile.classList.add(`tile`);
    
    if(value > 0) {
        newTile.innerText = value;
        if(value <= 4096) newTile.classList.add(`x${value}`);
        else newTile.classList.add(`x8192`);
    }
}

// ======================== GAME LOGIC ==============================

const isGameOver = (board) => {
    for (let r = 0; r < maxRow; r++) {
        for (let c = 0; c < maxColumn; c++) {
            let currNum = board[r][c];
            
        }
    }
    return true;
}

const generateTwo = (board) =>{
    let temp = board.flat().filter(num => num === 0)
    if(temp.length < 1) {
        if(isGameOver) {
            gameOver.classList.add("game-over");
        }
        return;
    }

    let found = false;
    while(!found){
        let r = Math.floor(Math.random() * maxRow);
        let c = Math.floor(Math.random() * maxColumn);
        if(board[r][c] === 0){
            board[r][c] = 2
            let tile = document.querySelector(`#t${r}-${c}`)
            setTile(tile, 2);
            found = true;
        }
    }
}

const filterZeros = (nums) => nums.filter(num => num !== 0)
const slide = (row) => {

    // remove all the zeros from the row
    row = filterZeros(row);
    
    //update left tile
    for(let i = 0; i < row.length; i++){
        if(row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
        }
        row = filterZeros(row);
    }

    // Updating score
    finalScore.innerText = score;

    //append 0's from right
    while(row.length < maxRow){
        row.push(0);
    }
    
    return row;
}

const slideLeft = () => {
    for(let r = 0; r < maxRow; r++){
        board[r] = slide(board[r]);
        for(let c = 0; c < maxColumn; c++){
            let num = board[r][c];
            let tile = document.querySelector(`#t${r}-${c}`);
            setTile(tile, num);
        }
    }
    generateTwo(board)
}
const slideRight = () => {
    for(let r = 0; r < maxRow; r++){
        let num = board[r]
        num.reverse()
        num = slide(num);
        num.reverse()
        board[r] = num;
        for(let c = 0; c < maxColumn; c++){
            let num = board[r][c];
            let tile = document.querySelector(`#t${r}-${c}`);
            setTile(tile, num);
        }
    }
    generateTwo(board)
}
const slideUp = () => {
    for(let c = 0; c < maxColumn; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row = slide(row);
        [board[0][c], board[1][c], board[2][c], board[3][c]] = row;
        for(let r = 0; r < maxRow; r++){
            let num = board[r][c];
            let tile = document.querySelector(`#t${r}-${c}`);
            setTile(tile, num);
        }
    }
    generateTwo(board)
}
const slideDown = () => {
    for(let c = 0; c < maxColumn; c++){
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]
        row.reverse();
        row = slide(row);
        row.reverse();
        [board[0][c], board[1][c], board[2][c], board[3][c]] = row;
        for(let r = 0; r < maxRow; r++){
            let num = board[r][c];
            let tile = document.querySelector(`#t${r}-${c}`);
            setTile(tile, num);
        }
    }
    generateTwo(board)
}

// ==================================================================


document.addEventListener('keyup', (e) => {
    switch(e.code){
        case "ArrowRight":
            slideRight();
            break;
        case "ArrowLeft":
            slideLeft();
            break;
        case "ArrowUp":
            slideUp();
            break;
        case "ArrowDown":
            slideDown();
            break;
        default:
            break;
    }
})