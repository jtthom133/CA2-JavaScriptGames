let squares = document.getElementsByClassName('box');
let timeElement = document.getElementById('timer');
let scoreElement = document.getElementById('score');
let gameOverElement = document.getElementById('gameOver');
let timer = 30;
let timerID = null;
let interID = 0;
let score = 0;
let interval = 700;
winOrLost = 2;

function countdown () {
    if (timer == 0) {
        // win is 1
        winOrLost = 1;
        gameOver();
    }
    timeElement.innerHTML = timer;
    timer--;
}

function randPosition() {
    // generate random square from the collection
    randSquare = squares[Math.floor(Math.random() * 9)]
    console.log(randSquare)
    // add the bear to the square
    randSquare.classList.add('Kenny');

    // track all the squares for clicks
    Array.from(squares).forEach(calcSquares => {
        calcSquares.addEventListener('click', () => {
        // if the right square (the one with the mole) is right, increment score
        if (calcSquares.classList.contains('Kenny')) {
            score += 1;
            scoreElement.innerHTML = score;
            calcSquares.classList.remove('Kenny');
        }
    })
        let checkLose = document.querySelectorAll('.Kenny');
        if (checkLose.length == 9) {
            // lose is 0
            winOrLost = 0;
            gameOver()
        }
    })
}

// dynamically speed the amount of Kennys that pop up
function popupSpeed() {
    interval -= 7.5;
    randPosition();
    interID = setTimeout(popupSpeed, interval)
}

function houseKeeping() {
    Array.from(squares).forEach(square => {
        square.classList.remove('Kenny');
    })
    gameOverElement.style.display = "none";
    interval = 700;
    timer = 30;
    score = 0;
    scoreElement.innerText = score;
    clearInterval(interID);
    clearInterval(timerID);
    return 1;
}

function startGame(){
    let success = houseKeeping();
    if (success == 1) {
        timerID = setInterval(countdown, 1000);
        popupSpeed();
    }
}

function gameOver() {
    timeElement.innerText = timer;
    clearInterval(interID);
    clearInterval(timerID);
    if (winOrLost == 0) {
        gameOverElement.innerText = "You lost! (kenny is mad)"
        gameOverElement.classList.add('lost');
    } else {
        gameOverElement.innerText = "You won! (kenny approves)"
        gameOverElement.classList.add('won');
    }
    gameOverElement.style.display = "block";
    window.stop;
}
