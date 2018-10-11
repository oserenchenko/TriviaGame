//defining global variables: the interval id for the timer, the counters for the number of correct, incorrect, and unanswered questions
var intervalId;
var correctCounter = 0;
var incorrectCounter = 0;
var unansweredCounter = 0;

//trivia questions array that holds each questions as an object. Each question has q for question, aCorrect for the correct answer, a1-a3 for the other multiple choice options, and the image 
var triviaQuestions = [{
    "q": "What is Denver's oldest block?",
    "aCorrect": "Larimer Square",
    "a1": "Wynkoop",
    "a2": "Writer Square",
    "a3": "Platte",
    "image": "assets/images/larimer_square.jpg"
  },
  {
    "q": "In 1906 an arch is placed in front of Denver's Union Station featuring the following word(s):",
    "a1": "Mile High",
    "a2": "Denver",
    "aCorrect": "Mizpah",
    "a3": "Bienvenue",
    "image": "assets/images/mizpah.jpg"
  },
  {
    "q": "The DIA is the largest airport in the U.S.",
    "aCorrect": "True",
    "a1": "False",
    "image": "assets/images/dia.jpg"
  },
  {
    "q": "The inside of the top of Denver's Capitol uses the entire world's supply of which stone?",
    "a1": "Boulder Opal",
    "aCorrect": "Colorado Rose Onyx",
    "a2": "Almandine Garnet",
    "a3": "Blue Quartz",
    "image": "assets/images/capitol.jpg"
  },
  {
    "q": "Which beer company was founded in Golden, CO?",
    "a1": "Budweiser",
    "a2": "Heinken",
    "a3": "Kokopelli",
    "aCorrect": "Coors",
    "image": "assets/images/coors.jpg"
  },
  {
    "q": "Which peak is highest in Colorado?",
    "aCorrect": "Mount Evans",
    "a1": "Longs Peak",
    "a2": "Mount Elbert",
    "a3": "Mount Massive",
    "image": "assets/images/evans.jpg"
  },
  {
    "q": "Which animal is the large blue scultpture looking into the lobby of the Convention Center?",
    "a1": "Lion",
    "a2": "Monkey",
    "aCorrect": "Bear",
    "a3": "Elk",
    "image": "assets/images/blue_bear.jpg"
  },
  {
    "q": "Lakeside, the small, historical amusement park Northwest of Denver, was opened in:",
    "a1": "1920",
    "a2": "1954",
    "a3": "1901",
    "aCorrect": "1908",
    "image": "assets/images/lakeside.jpg"
  },
];

//trivia game object that is full of functions that run the entire trivia game
var triviaGame = {
  //question index starts at 0 and increases with every round
  "questionIndex": 0,

  //timer variable, the user has 15 seconds to answer the question
  "timer": 15,

  //the function that runs when the start button is clicked in the very beginning page, when the game is refreshed
  "startGame": function () {
    //the splash screen is hidden, the game div is shown, and the new round function is run
    $("#splashScreen").hide();
    $("#game").show();
    triviaGame.newRound();
  },

  //the new round function, runs with every round
  "newRound": function () {
    //empties the multiple choice options from the previous round
    $("#multipleChoice").empty();
    $("#mainGame").css("background-image", "url(assets/images/denver_skyline.jpg)");
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
      triviaGame.timer = 15;
      intervalId = setInterval(triviaGame.decrement, 1000);
    }
  },

  "decrement": function () {
    triviaGame.timer--;
    $("#timer").text("Time Remaining: " + triviaGame.timer + " seconds");
    if (triviaGame.timer === 0) {
      unansweredCounter++;
      clearInterval(intervalId);
      $("#question").empty();
      $("#multipleChoice").empty();
      $("#timer").empty();
      $("#multipleChoice").append("<h4 class='feedback'>Out of time! The answer is: " + triviaQuestions[triviaGame.questionIndex].aCorrect + "</h4>");
      $("#multipleChoice").append("<img class='answerImage' src=" + triviaQuestions[triviaGame.questionIndex].image + ">");
      $("#mainGame").css("background-image", "none");
      triviaGame.questionIndex++;
      setTimeout(triviaGame.checkRound, 5000);
    }
  },

  "correctGuess": function () {
    correctCounter++;
    $("#question").empty();
    $("#multipleChoice").empty();
    $("#timer").empty();
    $("#multipleChoice").append("<h4 class='feedback'>Correct! " + triviaQuestions[triviaGame.questionIndex].aCorrect + "!</h4>");
    $("#multipleChoice").append("<img class='answerImage' src=" + triviaQuestions[triviaGame.questionIndex].image + ">");
    $("#mainGame").css("background-image", "none");
    triviaGame.questionIndex++;
    setTimeout(triviaGame.checkRound, 5000);
  },

  "incorrectGuess": function () {
    incorrectCounter++
    $("#question").empty();
    $("#multipleChoice").empty();
    $("#timer").empty();
    $("#multipleChoice").append("<h4 class='feedback'>Incorrect! It's " + triviaQuestions[triviaGame.questionIndex].aCorrect + "</h4>");
    $("#multipleChoice").append("<img class='answerImage' src=" + triviaQuestions[triviaGame.questionIndex].image + ">");
    $("#mainGame").css("background-image", "none");
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
      $("#multipleChoice").append("<h4 class='feedback'>All Done! Here's how you did:</h4>");
      $("#multipleChoice").append("<h5>Correct Answers: " + correctCounter + "<!h5>");
      $("#multipleChoice").append("<h5>Incorrect Answers: " + incorrectCounter + "<!h5>");
      $("#multipleChoice").append("<h5>Unanswered: " + unansweredCounter + "<!h5>");
      $("#timer").append("<button class='playAgain btn btn-light'>Play Again</button>")
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