

const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');

const winningMessageTextElement = document.querySelector('[data-winning-messsage-text]');
const winningMessage = document.getElementById('winningMessage');

const restartButton = document.getElementById('restartButtom');
restartButton.addEventListener('click', startGame);


console.log(winningMessageTextElement);
//console.log(winningMessage);
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let circleTurn;


startGame();
function startGame(){
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click',handleClick, {once:true});
    }) 
    setHoverClass()
    winningMessage.classList.remove('show');

}

function handleClick(e) {
    console.log('Clicked on ' + e.target)

    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    // Mark the cell
    markCell(e.target, currentClass);

    // Check for Win
    if (checkWin(currentClass)){
        endGame(false);
    }
    // Check for draw
    else if (checkDraw()){
        endGame(true);
    }


    // Change turn
    circleTurn = !circleTurn;

    // Set the appropriate hover state
    setHoverClass()

}

function endGame(isDraw){
    if (isDraw){
        winningMessageTextElement.innerText =`Draw!`
    }
    else{
        //win
        winningMessageTextElement.innerText =`${circleTurn ? "O" : "X"} Wins!`
    }

    winningMessage.classList.add('show');


}
function markCell(cell, currentClass) {
    cell.classList.add(currentClass);
}

function setHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);

    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    }
    else {
        board.classList.add(X_CLASS);
    }
}


function checkWin(currentClass) {
    console.log(currentClass);
   return WINNING_COMBINATIONS.some(
    combination => {
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function checkDraw() {
    console.log('in checkDraw')
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}