var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var timeEl = document.querySelector("#time");
var questionContainerEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var endScreenEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");

// create button elements for the multiple choice options
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");
var rightOrWrong = document.createElement("p");
choicesEl.appendChild(btn1);
choicesEl.appendChild(btn2);
choicesEl.appendChild(btn3);
choicesEl.appendChild(btn4);
questionContainerEl.appendChild(rightOrWrong);

var timeLeft = questions.length * 10;
// create a countdown function
let countdown = () => {
  var timeInterval = setInterval(function () {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0 || runningQ === questions.length) {
      clearInterval(timeInterval);
      timeEl.textContent = "";
      questionContainerEl.style.display = "none";
      endScreenEl.style.display = "block";
      finalScoreEl.textContent = timeLeft;
    }
  }, 1000);
}
// When the start button is clicked, hide the start screen display and render the first question
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  questionContainerEl.style.display = "block";
  runningQ = 0;
  renderQ();
  countdown();
});

// Create a variable that picks a specific question from the array of questions
var runningQ = 0;
var q = questions[runningQ];

var renderQ = () => {
  questionEl.textContent = q.question;
  btn1.textContent = q.options[0];
  btn2.textContent = q.options[1];
  btn3.textContent = q.options[2];
  btn4.textContent = q.options[3];
}

var checkOption = (e) => {
    e.preventDefault();
    // display the 'right' or 'wrong' p element for a limited amount of time
    setTimeout(function() {
        rightOrWrong.style.display = "none";
    }, 1200);
    if (questions[runningQ].answer === e.target.value) {
        rightOrWrong.textContent = "Correct Answer!"
    } else {
        rightOrWrong.textContent = "Wrong Answer!"
        timeLeft -= 10;
    }
}

choicesEl.addEventListener("click", checkOption)


// create an event listener for when the right answer is clicked 


// When I press the start button, the welcome page is hidden,
// the first question and potential answers to said question become visible
// + the countdown starts (from 60 seconds)

// If the user gets the question wrong, time is deducted from the countdown (15 seconds)

// When the user completes all questions, the remaining time becomes their score
// If the user reaches 0 seconds, it is the end of the quiz (they score a 0)

// Save the score to localStorage (the scores will be displayed from highest to lowest) - allow the user to clear high score
// data with a click of a button
