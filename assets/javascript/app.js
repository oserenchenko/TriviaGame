var intervalId;

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
    "a2": "Welcome",
    "aCorrect": "Mizpah",
    "a3": "Bienvenue"
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
    $("#question").text(triviaQuestions[triviaGame.questionIndex].q);
    var questionProperties = Object.keys(triviaQuestions[triviaGame.questionIndex]);
    for (var i = 0; i < questionProperties.length; i++) {
      if (questionProperties[i].startsWith("a")) {
        var newButton = $("<button>");
        newButton.text(triviaQuestions[triviaGame.questionIndex][questionProperties[i]]);
        newButton.addClass("multipleChoiceAnswer");
        newButton.val(questionProperties[i])
        $("#multipleChoice").append(newButton);
      }
    }
    triviaGame.runTimer();
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
      clearInterval(intervalId);
      console.log("Time Up!");
    }
  },

  "correctGuess": function() {
    $("#multipleChoice").empty();
    $("#timer").empty();
    $("#multipleChoice").append("<h4>Correct!</h4>");
    $("#multipleChoice").append("<img class='answerImage' src=" + triviaQuestions[triviaGame.questionIndex].image + ">");
  },

  "incorrectGuess": function() {
    $("#multipleChoice").empty();
    $("#timer").empty();
    $("#multipleChoice").append("<h4>Incorrect! It's " + triviaQuestions[triviaGame.questionIndex].aCorrect +  "</h4>");
    $("#multipleChoice").append("<img class='answerImage' src=" + triviaQuestions[triviaGame.questionIndex].image + ">");
  },
};


//on click events
$("document").ready(function () {
  $("#start").on("click", triviaGame.startGame);
  // $(".multipleChoiceAnswer").on("click", function() {
  //   console.log(true);
  //   if (this.value == "aCorrect") {
  //     console.log("you guessed correctly!");
  //   }
  // })

})