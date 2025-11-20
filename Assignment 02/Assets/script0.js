// Game parameters
const PATH_LENGTH = 13; //total steps

const winSound  = new Audio("Assets/Audio/Win.mp3");
const failSound = new Audio("Assets/Audio/Gameover.wav");

// Game status variables
let squareSequences = [] 
let currPos = 1; // Player position (outside the path)
let dice = 0; // Dice number

const diceNumber = document.getElementById('dice-result');
const pathContainer = document.getElementById('path-container');
const banner = document.getElementById('popup-banner');
const gameOutcome = document.getElementById('game-outcome');
const buttonCloserBanner = document.getElementById('close-banner-btn');

const tiles = pathContainer.querySelectorAll('li'); // all the squares

// Event listners

// Keyboard

// Set avatar

function setAvatar(){
    console.log('set avatar')
}
setAvatar()

// Dice roll

function rollDice() {
    dice = Math.floor(Math.random() * 6) + 1;
    diceNumber.textContent = dice; // Update the text

    movePlayer(dice);
}

diceNumber.addEventListener('click', function(e){
    console.log('dice')
    rollDice() 
})

function movePlayer(dice){
    currPos += dice
    console.log(currPos)

    for (tile of tiles){
        tile.style.backgroundColor = 'rgb(245, 240, 220)'
    }

    if (currPos == PATH_LENGTH){
        console.log('you won')
    }
    else if (currPos > PATH_LENGTH ) {
        currPos -=  dice
    }
    
    newTile = document.getElementById(`${currPos}`);
    newTile.classList.add('active');

    setTimeout(function() {
        checkSquare(currPos);
    }, 3000);

}

function checkSquare(currPos) {

    let newCurrPos = currPos

    if (currPos == 4 || currPos == 8 || currPos == 12){ // Plus one
        newCurrPos = currPos += 1
        console.log(newCurrPos)
    }
    else if (currPos == 1) { // Plus two
        newCurrPos = currPos += 2
        console.log(newCurrPos)
    }
    else if (currPos == 2 || currPos == 5 || currPos == 9 || currPos == 11) { // Stop
        newCurrPos = currPos
        console.log(newCurrPos)
    }
     else if (currPos == 3) { // Minus one
        newCurrPos = currPos -= 1
        console.log(newCurrPos)
    }
    else if (currPos == 3) { // Minus two
        newCurrPos = currPos -= 2
        console.log(newCurrPos)
    }
    else if (currPos == 6 || currPos == 10) { // Rip
        newCurrPos = currPos = 1
        console.log(newCurrPos)
    }

    for (tile of tiles){
        tile.style.backgroundColor = 'rgb(245, 240, 220)'
    }

    newTile = document.getElementById(`${currPos}`);
    newTile.classList.add('active');

}



// Button close banner

buttonCloserBanner.addEventListener('click', () => {
    banner.ClassName = ''; // Remove all the classes
})

// Logic flow

function newAttempt () {
    console.log("New attempt!");
    currPos = -1 // Player is at the starting position
}

function updatePlayerPosition () {
    const allTiles = pathContainer.querySelectorAll('li'); // returns a node list
    allTiles.forEach((tile) => {
        if(tile.dataset.id == currPos) {
            tile.classList.add('player', 'active');
        }
        else {
            tile.classList.remove('player');
        }
    })
    checkEndOfPath();
}

function checkEndOfPath() {
    // End of path
    if(currPos < PATH_LENGTH) { // No, still on the path
        checkForRip();
    }
    else { // Yes, you won
        winSound.play().then(() => {
            popupOutcomeBanner("Winner", "win");
        })
        updateDice();
        newAttempt();
    }
}

function checkForRip() {
    // On a Rip
    if(squareSequences[currPos] == rip) { // Yes, on the rip
        // Game over
        failSound.play().then(() => {
            popupOutcomeBanner("Game<br>over", "fail");
        })
        updateDice();
        newAttempt();
    }
}

function popupOutcomeBanner (message, result) {
    gameOutcome.Outcome.innerHTML = message;
    banner.classlist.add('active', result);
}

function updateDice() {
    dice = 0;
    diceNumber.innerHTML = dice;
}

//STARTTT :)

newAttempt();