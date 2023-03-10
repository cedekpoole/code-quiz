// Select elements within the start screen
var startBtn = document.querySelector("#start");
var startScreen = document.querySelector("#start-screen");

// Select span with the ID of 'time'
var timeEl = document.querySelector("#time");

// Select HTML elements for the question screen
var questionContainerEl = document.querySelector("#questions");
var questionEl = document.querySelector("#question-title");
var choicesEl = document.querySelector("#choices");
var feedbackEl = document.querySelector("#feedback");

// HTML elements concerning the end screen
var endScreenEl = document.querySelector("#end-screen");
var finalScoreEl = document.querySelector("#final-score");
var submitBtn = document.querySelector("#submit");
var initialsInput = document.querySelector("#initials");

// Place audio wav files into variables
var correctAudio = new Audio("assets/sfx/correct.wav");
var wrongAudio = new Audio("assets/sfx/incorrect.wav");
var startAudio = new Audio("assets/sfx/start.wav");

// time = 80 seconds (8 questions)
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
  startAudio.play();
  renderQuestion();
  countdown();
});

// Create a variable that picks a specific question object from the array of question objects
var runningQ = 0;
var q = questions[runningQ];

// Create a function that renders the question screen
var renderQuestion = () => {
  questionEl.textContent = q.question;
  var optionBtn = "";
  // use a loop to render the options as buttons
  for (var key in q.options) {
    optionBtn += `<button>${q.options[key]}</button>`;
    choicesEl.innerHTML = optionBtn;
  }
};

// create an event listener for when an option is clicked
choicesEl.addEventListener("click", (e) => {
  e.preventDefault();
  // get user answer by placing what is clicked into a variable
  var usrAnswer = e.target.textContent;
  if (timeLeft > 0 && runningQ < questions.length) {
    if (usrAnswer === questions[runningQ].answerIndex) {
      feedbackEl.textContent = "Correct Answer!";
      feedbackEl.style.display = "block";
      feedbackEl.style.color = "#C1D37F";
      correctAudio.play();
    } else {
      // If the user gets the question wrong, time is deducted from the countdown (15 seconds)
      feedbackEl.textContent = "Wrong Answer!";
      feedbackEl.style.display = "block";
      feedbackEl.style.color = "#89023E";
      timeLeft -= 15;
      wrongAudio.play();
    }
    // have it so the feedback element is only visible for one second
    setTimeout(function () {
      feedbackEl.style.display = "none";
    }, 1000);
    // increment index of the question object
    runningQ++;
    q = questions[runningQ];
    // render new question
    renderQuestion();
  }
});

// create function that executes when quiz has ended
function EndQuiz() {
  // show the end screen
  endScreenEl.removeAttribute("class");
  // remove timer content
  timeEl.textContent = "";
  // hide question container
  questionContainerEl.classList = "hide";
  // When the user completes all questions, the remaining time becomes their score
  finalScoreEl.textContent = timeLeft;
}

submitBtn.addEventListener("click", () => {
    //If the text input is empty, prompt the user to retry
    if (initialsInput.value === "") {
      alert("Please put in your initials!");
    } else {
      // If there has been previous high scores, make 'scoreParse' equal to that
      // If there has been no previous high scores, make the variable equal to an empty array
      // JSON.parse converts a string back into an object
      var scoreParse = JSON.parse(window.localStorage.getItem("highscore")) || [];
      // create a new object for the most recent player
      var scoreObject = {
        hScore: timeLeft,
        initials: initialsInput.value,
      };
  
      // add the new user details into local storage - place it into the scoreParse array
      scoreParse.push(scoreObject);
      // convert object back into a string
      window.localStorage.setItem("highscore", JSON.stringify(scoreParse));
  
      // once the button has been pressed, redirect the user to the highscores HTML page
      window.location.href = "highscores.html";
    }
  });
