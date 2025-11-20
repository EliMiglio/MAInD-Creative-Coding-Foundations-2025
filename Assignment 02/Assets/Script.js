// Game parameters
const PATH_LENGTH = 13;  // total steps

const winSound  = new Audio("Assets/Audio/Win.mp3");
const failSound = new Audio("Assets/Audio/Gameover.wav");
const diceSound = new Audio("Assets/Audio/diceroll.mp3");
diceSound.volume = 0.1; // volume at 30%

// Game status variables
let currPos = 0; // start on square 0
let dice = 0;    // dice value

const diceButton = document.getElementById("dice-result");
const diceDisplay = document.getElementById("dice");  
const pathContainer = document.getElementById("path-container");
const banner = document.getElementById("popup-banner");
const gameOutcome = document.getElementById("game-outcome");
const buttonCloserBanner = document.getElementById("close-banner-btn");
const tiles = pathContainer.querySelectorAll("li"); // all the squares
const avatarScreen = document.getElementById("avatar-screen");
const avatarImages = document.querySelectorAll(".avatar");
let selectedAvatar = null;

// Special squares as array

const SPECIAL_SQUARES = [
  0,  // 0: start
  6,  // 1 go to 6
  0,  // 2 none
  0,  // 3 none
  5,  // 4 go to 5
  0,  // 5 none
  -1, // 6 RIP :(
  6,  // 7 go to 6
  0,  // 8 none
  0,  // 9 none
  0,  // 10 none
  9,  // 11 go to 9
  0,  // 12 none
  0   // 13 WINN! managed with PATH_LENGTH
];

// Choose an avatar

function setAvatar() {
  avatarImages.forEach((img) => {
    img.addEventListener("click", () => {
      selectedAvatar = img.dataset.avatar; 
      document.body.classList.remove("avatar-tamarra", "avatar-street", "avatar-elegant");
      document.body.classList.add("avatar-" + selectedAvatar);

      avatarScreen.style.display = "none"; // Hide this avatar screen
      newAttempt();
    })
  })
}

setAvatar();

// New attempt
function newAttempt() {
  console.log("New attempt");
  currPos = 0;
  dice = 0;
  updateDice();
  resetPath();
  updatePlayerPosition();
}

function resetPath() {
  tiles.forEach((tile) => {
    
    tile.classList.remove("active");
  })
}

function updateDice() {
  if (dice === 0) {
    diceDisplay.textContent = "-";
  } else {
    diceDisplay.textContent = dice;
  }
}

// 4) Click dice button


function rollDice() {
  dice = Math.floor(Math.random() * 6) + 1;
  updateDice();
  movePlayer(dice);
}

diceButton.addEventListener("click", () => {
  diceSound.play().catch(() => {});
  rollDice();
})

// 5) MovePlayer

function movePlayer(step) {
  const nextPos = currPos + step;

  // If you pass the last one, you don't move
  if (nextPos > PATH_LENGTH) {
    return;
  }

  currPos = nextPos;
  updatePlayerPosition();
  checkSpecialSquare();
}

function updatePlayerPosition() {
  resetPath();

  const currentTile = document.getElementById(String(currPos));
  if (currentTile) {
    currentTile.classList.add("active");
  }
}

// Check special square

function checkSpecialSquare() {


  // WIN

  if (currPos === PATH_LENGTH) {
    handleWin();
    return;
  }

  const effect = SPECIAL_SQUARES[currPos] ?? 0;

  // 0, None

  if (effect === 0) return;

  // -1, RIP game over

  if (effect === -1) {
    handleRip();
    return;
  }

  // > 0, Go to (square X)

  currPos = effect;
  updatePlayerPosition();

  // If you are on the last square, Win

  if (currPos === PATH_LENGTH) {
    handleWin();
    return;
  }

  // If is rip, Game over

  if (SPECIAL_SQUARES[currPos] === -1) {
    handleRip();
  }
}

// WIN 

function handleWin() {
  winSound.play().catch(() => {});
  popupOutcomeBanner("You win!", "win");
}

// RIP (game over)

function handleRip() {
  failSound.play().catch(() => {});
  popupOutcomeBanner("Game over", "fail");
}

// Popup (status)

function popupOutcomeBanner(message, result) {
  gameOutcome.innerHTML = message;
  banner.className = "";
  banner.classList.add("active", result);
}

// 7) Click Continue

buttonCloserBanner.addEventListener("click", () => {
  banner.className = ""; // close popup
  newAttempt();          
})

// STARTTT :)

newAttempt();