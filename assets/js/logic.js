var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");
var timeEl = document.querySelector("#time");
var questionContainerEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var endScreenEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");
var feedbackEl = document.querySelector("#feedback");

// create button elements for the multiple choice options
var btn1 = document.createElement("button");
var btn2 = document.createElement("button");
var btn3 = document.createElement("button");
var btn4 = document.createElement("button");
choicesEl.appendChild(btn1);
choicesEl.appendChild(btn2);
choicesEl.appendChild(btn3);
choicesEl.appendChild(btn4);

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
  startScreen.setAttribute("class", "hide");
  questionContainerEl.removeAttribute("class");
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


choicesEl.addEventListener("click", (e) => {
    var usrAnswer = e.target.textContent;
    if (timeLeft > 0 && runningQ < questions.length - 1) {
        if (usrAnswer === questions[runningQ].answerIndex) {
            feedbackEl.textContent = "Correct Answer!";
            feedbackEl.style.display = "block"
            feedbackEl.style.color = "green";
        } else {
            feedbackEl.textContent = "Wrong Answer!";
            feedbackEl.style.display = "block";
            feedbackEl.style.color = "red";
            timeLeft -= 10; 
        }
        setTimeout(function() {
            feedbackEl.style.display = "none";
        }, 1000)
        runningQ++
        renderQ();
    } 
});

function EndQuiz() {
    endScreenEl.removeAttribute("class");
    
}



// create an event listener for when the right answer is clicked 


// When I press the start button, the welcome page is hidden,
// the first question and potential answers to said question become visible
// + the countdown starts (from 60 seconds)

// If the user gets the question wrong, time is deducted from the countdown (15 seconds)

// When the user completes all questions, the remaining time becomes their score
// If the user reaches 0 seconds, it is the end of the quiz (they score a 0)

// Save the score to localStorage (the scores will be displayed from highest to lowest) - allow the user to clear high score
// data with a click of a button
