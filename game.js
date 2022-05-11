$(document).ready(() => {
  let level = 0;
  let buttonColours = ["red", "blue", "green", "yellow"];
  let gamePattern = [];
  let userPattern = [];
  buttonAction = (colour) => {
    let selectColor = "." + colour;
    $(selectColor).fadeOut(100).fadeIn(100);
    let audiopath = "./sounds/" + colour + ".mp3";
    var music = new Audio(audiopath);
    music.play();
  };
  animatePress = (colour) => {
    let selectColor = "." + colour;
    $(selectColor).addClass("pressed");
    userPattern.push(colour);
    console.log(userPattern);
    buttonAction(colour);
    setTimeout(() => {
      $(selectColor).removeClass("pressed");
    }, 100);
    if (level != 0) checkAnswer(level);
  };
  $(".blue").on("click", () => {
    animatePress("blue");
  });
  $(".green").on("click", () => {
    animatePress("green");
  });
  $(".red").on("click", () => {
    animatePress("red");
  });
  $(".yellow").on("click", () => {
    animatePress("yellow");
  });
  nextSequence = () => {
    if (level == 0) level++;
    if (level > 0) {
      $("h1#level-title").text("Level " + level);
    }

    let randomNumber = parseInt(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    buttonAction(randomChosenColour);
    gamePattern.push(randomChosenColour);
  };
  checkAnswer = (currentLevel) => {
    let cnt1 = 0;
    while (cnt1 <= currentLevel - 1 && userPattern[cnt1] == gamePattern[cnt1]) {
      cnt1++;
    }
    console.log(cnt1);
    if (cnt1 == currentLevel && userPattern.length == gamePattern.length) {
      level++;
      console.log("success");
      userPattern = [];
      setTimeout(() => {
        nextSequence();
      }, 1000);
    } else if (
      userPattern.length != gamePattern.length &&
      cnt1 < userPattern.length
    ) {
      failure();
    } else if (cnt1 == userPattern.length) {
    } else {
      failure();
    }
  };
  failure = () => {
    console.log("failure");
    var music = new Audio("./sounds/wrong.mp3");
    music.play();
    $("body").addClass("game-over");
    $("h1#level-title").text("Game Over, Press Any Key to Restart");
    $(document).keypress(() => {
      location.reload();
    });
  };
  $(document).keypress(() => {
    if (level == 0) nextSequence();
  });
});
