// Selecting DOM elements
const display = document.querySelector(".display");
const startBtn = document.querySelector(".start");
const stopBtn = document.querySelector(".stop");
const resetBtn = document.querySelector(".reset");
const countdownBtn = document.querySelector(".countdown");
const countdownCount = document.querySelector(".countdownCount");

// Initial values
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isResumed = false;
let intervalId;

// Audio element for sound
const sound = new Audio("sound.mp3");

// Function to display time
function displayTime() {
    milliseconds++;
    if (milliseconds >= 100) {
        milliseconds = 0;
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }
    }
    sound.play();
    display.textContent = `${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${milliseconds
    .toString()
    .padStart(2, "0")}`;
}

// Functiion to start countdown timer

var timer = 3;
async function countdownTimer() {
    timer = 3;
    countdownBtn.style.visibility = "visible";
    //countdownBtn.textContent = `${timer}`;
    countdownCount.textContent = `${timer}`;
    let intervelTimerId = setInterval(function() {
        if (timer > 1) {
            //countdownBtn.textContent = `${--timer}`;
            countdownCount.textContent = `${--timer}`;
        } else {
            clearTimerInterval(intervelTimerId);
            isResumed = true;
        }

    }, 1000);

    function clearTimerInterval(intervelTimerId) {
        clearInterval(intervelTimerId);
        countdownBtn.style.visibility = "hidden";
    }


}
// Function to start timer
async function startTimer() {

    //let res = await countdownTimer();

    if (!isResumed) {
        countdownTimer();
        setTimeout(startTimer, 3000);
    } else {
        intervalId = setInterval(displayTime, 10);
        sound.play();
        startBtn.disabled = true;
    }

}

// Function to stop timer
function stopTimer() {
    clearInterval(intervalId);
    sound.pause();
    startBtn.disabled = false;
    isResumed = true;
}

// Function to reset timer
function resetTimer() {
    clearInterval(intervalId);
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    display.textContent = "00:00:00";
    startBtn.disabled = false;
    //countdownBtn.style.display = '';
    countdownCount.textContent = '3'
    timer = 3;
    isResumed = false;
    sound.pause();
}

// Event listeners
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);