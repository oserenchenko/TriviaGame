var intervalId;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

var triviaQuestions = [{
    "q": "What is Denver's oldest block?",
    "aCorrect": "Larimer Square",
    "a1": "Wynkoop",
    "a2": "Writer Square",
    "a3": "Platte",
    "image": "assets/images/larimer_square.jpg"
  },
  {
    "q": "Back in 1906, just 25 years after opening, an arch is placed in front of Denver's Union Station featuring what word(s)?",
    "a1": "Mile High",
    "a2": "Denver",
    "aCorrect": "Mizpah",
    "a3": "Bienvenue",
    "image": "assets/images/mizpah.jpg"
  }
];

var triviaGame = {
  "questionIndex": 0,

  "timer": 15,

  "startGame": function () {
    $("#splashScreen").hide();
    $("#game").show();
    triviaGame.newRound();
  },

  "newRound": function () {
    $("#multipleChoice").empty();
    $("#timer").text("Time Remaining: 15 seconds");
    triviaGame.runTimer();
    $("#question").text(triviaQuestions[triviaGame.questionIndex].q);
    var questionProperties = Object.keys(triviaQuestions[triviaGame.questionIndex]);
    for (var i = 0; i < questionProperties.length; i++) {
      if (questionProperties[i].startsWith("a")) {
        var newButton = $("<button>");
        newButton.text(triviaQuestions[triviaGame.questionIndex][questionProperties[i]]);
        newButton.addClass("multipleChoiceAnswer btn btn-light");
        newButton.val(questionProperties[i])
        $("#multipleChoice").append(newButton);
      }
    }
    $(".multipleChoiceAnswer").on("click", function () {
      if (this.value == "aCorrect") {
        console.log("you guessed correctly!");
        clearInterval(intervalId);
        triviaGame.correctGuess();
      } else {
        console.log("you guessed incorrectly!");
        clearInterval(intervalId);
        triviaGame.incorrectGuess();
      }
    });
  },

  "runTimer": function () {
    if (triviaGame.timer > 0) {
      clearInterval(intervalId);
      intervalId = setInterval(triviaGame.decrement, 1000);
    }
  },

  "decrement": function () {
    triviaGame.timer--;
    $("#timer").text("Time Remaining: " + triviaGame.timer + " seconds");
    if (triviaGame.timer === 0) {
      unansweredCounter++;
      clearInterval(intervalId);
      $("#multipleChoice").empty();
      $("#timer").empty();
      $("#multipleChoice").append("<h4>Out of time! The answer is: " + triviaQuestions[triviaGame.questionIndex].aCorrect + "</h4>");
      $("#multipleChoice").append("<img class='answerImage' src=" + triviaQuestions[triviaGame.questionIndex].image + ">");
      triviaGame.questionIndex++;
      setTimeout(triviaGame.checkRound, 5000);
      triviaGame.timer = 15;
    }
  },

  "correctGuess": function () {
    correctCounter++;
    $("#multipleChoice").empty();
    $("#timer").empty();
    $("#multipleChoice").append("<h4>Correct! " + triviaQuestions[triviaGame.questionIndex].aCorrect + "!</h4>");
    $("#multipleChoice").append("<img class='answerImage' src=" + triviaQuestions[triviaGame.questionIndex].image + ">");
    triviaGame.questionIndex++;
    setTimeout(triviaGame.checkRound, 5000);
  },

  "incorrectGuess": function () {
    incorrectCounter++
    $("#multipleChoice").empty();
    $("#timer").empty();
    $("#multipleChoice").append("<h4>Incorrect! It's " + triviaQuestions[triviaGame.questionIndex].aCorrect + "</h4>");
    $("#multipleChoice").append("<img class='answerImage' src=" + triviaQuestions[triviaGame.questionIndex].image + ">");
    triviaGame.questionIndex++;
    setTimeout(triviaGame.checkRound, 5000);
  },

  "checkRound": function () {
    if (triviaGame.questionIndex < triviaQuestions.length) {
      triviaGame.newRound();
    } else {
      $("#question").empty();
      $("#multipleChoice").empty();
      $("#timer").empty();
      $("#multipleChoice").append("<h4>All Done! Here's how you did:</h4>");
      $("#multipleChoice").append("<h5>Correct Answers: " + correctCounter + "<!h5>");
      $("#multipleChoice").append("<h5>Incorrect Answers: " + incorrectCounter + "<!h5>");
      $("#multipleChoice").append("<h5>Unanswered: " + unansweredCounter + "<!h5>");
      $("#timer").append("<button class='playAgain'>Play Again</button>")
      $(".playAgain").on("click", function() {
        triviaGame.questionIndex = 0;
        triviaGame.newRound();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
      })

    }
  },

};


//on click events
$("document").ready(function () {
  $("#start").on("click", triviaGame.startGame);
})