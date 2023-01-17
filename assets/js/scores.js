// Save the score to localStorage (the scores will be displayed from highest to lowest) - allow the user to clear high score
// data with a click of a button

var highscoreList = document.querySelector("#highscores");
var clearBtn = document.querySelector("#clear");


// When clear highscore button is pressed, it clears the local storage and refreshes the page
clearBtn.addEventListener("click", () => {
  window.localStorage.removeItem("highscore");
  window.location.reload();
});

function showHighScores() {
    var scoreParse = JSON.parse(window.localStorage.getItem("highscore")) || [];
    // sort the scores from highest to lowest
    scoreParse.sort((num1, num2) => {
        return num2.hScore - num1.hScore;
    })
    // for each user (their score + initials) in the local storage, append their details onto the high score list
    scoreParse.forEach(points => {
        var scoreLi = document.createElement("li");
        scoreLi.textContent = `${points.initials}: ${points.hScore}`;
        highscoreList.appendChild(scoreLi);
        scoreLi.style.backgroundColor = "black";
    })
}

//execute the function when the page loads (allow highscores to show)
showHighScores();
