var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress",function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click",function(){
    if(started){
        var userChosenColour  = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
    
        playSound(userChosenColour);
        animatePress(userChosenColour);
    
        checkAnswer(userClickedPattern.length-1);
    }
});

function checkAnswer(currentLevel){

    console.log(gamePattern.length+" : "+userClickedPattern.length);
    console.log("Ans : "+userClickedPattern);

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press A Key to Restart");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
    console.log("Level:"+ level +" Game :" + gamePattern);
    console.log("Level:"+ level +" Ans  :" + userClickedPattern)
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playSound(name){
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}