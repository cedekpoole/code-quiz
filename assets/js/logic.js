var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var timeEl = document.querySelector("#time");
var questionContainerEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices")

// create button elements for the multiple choice options
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");

// create a countdown function
function countdown() {
  timeLeft = questions.length * 10;
  var timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timeInterval);
      timeEl.textContent = "";
    }
  }, 1000);
}

startBtn.addEventListener("click", function () {
  startScreen.setAttribute("style", "display: none");
  renderQ();
});

var runningQ = 0;
var lastQ = questions.length - 1;


function renderQ() {
  var q = questions[runningQ];
  questionContainerEl.setAttribute("style", "display: block");
  questionEl.textContent = q.question;
  choicesEl.appendChild(btn1);
  choicesEl.appendChild(btn2);
  choicesEl.appendChild(btn3);
  choicesEl.appendChild(btn4);
  btn1.textContent = q.options[0];
  btn2.textContent = q.options[1];
  btn3.textContent = q.options[2];
  btn4.textContent = q.options[3];
  runningQ++;
  countdown();
}


// When I press the start button, the welcome page is hidden,
// the first question and potential answers to said question become visible
// + the countdown starts (from 60 seconds)

// If the user gets the question wrong, time is deducted from the countdown (15 seconds)

// When the user completes all questions, the remaining time becomes their score
// If the user reaches 0 seconds, it is the end of the quiz (they score a 0)

// Save the score to localStorage (the scores will be displayed from highest to lowest) - allow the user to clear high score
// data with a click of a button
