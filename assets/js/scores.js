// Save the score to localStorage (the scores will be displayed from highest to lowest) - allow the user to clear high score
// data with a click of a button

submitBtn = document.querySelector("#submit");
initialsInput = document.querySelector("#initials");

// Add an event listener to the submit button
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //If the text input is empty, prompt the user to retry
  if (initialsInput === "") {
    prompt("Please put in your initials!");
  } else {
    // If there has been previous high scores, make 'scoreParse' equal to that
    // If there has been no previous high scores, make the variable equal to an empty array
    var scoreParse = JSON.parse(window.localStorage.getItem("highscore")) || [];

    // create a new object for the most recent player
    var scoreObject = {
      hScore: timeLeft,
      initials: initialsInput.value,
    };

    // add the new user details into local storage - place it into the scoreParse array
    scoreParse.push(scoreObject);
    console.log(scoreParse);
    window.localStorage.setItem("highscore", JSON.stringify(scoreParse));
    console.log(JSON.stringify(scoreParse));

    // once the button has been pressed, redirect the user to the highscores HTML page
    window.location.href = "highscores.html";
  }
});
