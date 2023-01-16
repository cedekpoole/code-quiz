var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var timeEl = document.querySelector("#time");
var questionContainerEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var endScreenEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");
var feedbackEl = document.querySelector("#feedback");

var timeLeft = questions.length * 10;
// create a countdown function
let countdown = () => {
  var timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0 || runningQ === questions.length) {
      clearInterval(timeInterval);
      // If the user reaches 0 seconds, it is the end of the quiz (they score a 0)
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      EndQuiz();
    }
  }, 1000);
};

// When I press the start button, the welcome page is hidden,
// the first question and potential answers to said question become visible
// + the countdown starts (from 80 seconds)

// When the start button is clicked, hide the start screen display and render the first question
startBtn.addEventListener("click", () => {
  startScreen.setAttribute("class", "hide");
  questionContainerEl.removeAttribute("class");
  runningQ = 0;
  renderQuestion();
  countdown();
});

// Create a variable that picks a specific question from the array of questions
var runningQ = 0;
var q = questions[runningQ];

var renderQuestion = () => {
  questionEl.textContent = q.question;
  var optionBtn = "";
  // use a loop to render the options as buttons 
  for (var key in q.options) {
    optionBtn += `<button>${q.options[key]}</button>`;
    choicesEl.innerHTML = optionBtn;
  }
};
// create an event listener for when an answer is clicked
choicesEl.addEventListener("click", (e) => {
  e.preventDefault();
  // get user answer by placing what is clicked into a variable 
  var usrAnswer = e.target.textContent;
  if (timeLeft > 0 && runningQ <= questions.length) {
    if (usrAnswer === questions[runningQ].answerIndex) {
      feedbackEl.textContent = "Correct Answer!";
      feedbackEl.style.display = "block";
      feedbackEl.style.color = "green";
    } else {
    // If the user gets the question wrong, time is deducted from the countdown (15 seconds)
      feedbackEl.textContent = "Wrong Answer!";
      feedbackEl.style.display = "block";
      feedbackEl.style.color = "red";
      timeLeft -= 15;
    }
    // have it so the feedback element is only visible for one second
    setTimeout(function () {
      feedbackEl.style.display = "none";
    }, 1000);
    // increment index of the question object 
    runningQ++;
    q = questions[runningQ];
    renderQuestion();
  }
});

function EndQuiz() {
  endScreenEl.removeAttribute("class");
  timeEl.textContent = "";
  questionContainerEl.classList = "hide";
  // When the user completes all questions, the remaining time becomes their score
  finalScoreEl.textContent = timeLeft;
}

// Save the score to localStorage (the scores will be displayed from highest to lowest) - allow the user to clear high score
// data with a click of a button
