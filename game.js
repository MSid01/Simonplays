var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  sleep(100).then(() => {
    $("." + currentColor).removeClass("pressed");
  });
}

function startOver() {
  $("#result").text("");
  gamePattern = [];
  level = 0;
  started = false;
  nextSequence();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("correct!");
    if (userClickedPattern.length === gamePattern.length)
      setTimeout(() => {
        nextSequence();
      }, 1000);
  } else {
    $("#level-title").text("Game Over, Press restart to play again");
    $(".control").text("restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    playSound("wrong");
    $("#result").text("Your score: "+(level-1));
  }
}

$(document).keypress(function(event) {
    switch (event.key) {
        case 'q':
            pressedKey("green");
            break;
    
        case 'w':
            pressedKey("red")
            break;
    
        case 'a':
            pressedKey("yellow")
            break;
    
        case 's':
            pressedKey("blue");
            break;
        default:
            break;
    }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  pressedKey(userChosenColour);
});

function pressedKey(userChosenColour){
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

// nextSequence();
// console.log(randomChosenColour);
