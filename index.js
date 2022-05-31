var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
  }
}

function nextSequence() {
  level++;

  $("#title").text("Level" + level);

  var randomNumber = Math.floor(Math.random * 3 + 1);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeout(100)
    .fadein(100)
    .fadeout(100)
    .fadein(100);

  playSound(randomChosenColour);
}

function playSound(n) {
  var audio = new Audio("sounds/" + n + ".mp3");
  audio.play();
}

function animatePress(chosenColour) {
  $("#" + chosenColour).addClass("pressed");
  setTimeout(function () {
    $("#" + chosenColour).removeClass("pressed");
  }, 100);
}

// $(document).keypress(nextSequence());
// setTimeout(function () {
//   $(document).unbind("keyperss");
// }, 10);
