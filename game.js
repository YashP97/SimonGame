var buttoncolours = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextsequence(){
    userClickedPattern = []; 

    $("h1").text("Level 0");

    level = level + 1;

    $("h1").text("Level " + level);
    
    var number = Math.random()*4;
    var randnum = Math.floor(number);
    var randchosencolor;

    // switch(randnum){
    //     case 0:
    //         randchosencolor = buttoncolours[0];
    //         break;
    //     case 1:
    //         randchosencolor = buttoncolours[1];
    //         break;
    //     case 2:
    //         randchosencolor = buttoncolours[2];
    //         break;
    //     case 3:
    //         randchosencolor = buttoncolours[3];
    //         break;
    // }

    randchosencolor = buttoncolours[randnum];

    gamePattern.push(randchosencolor);
    
    $("#" + randchosencolor).fadeOut(50).fadeIn(50);

    sound(randchosencolor);
}

function sound(text){
    var audio = new Audio("sounds/" + text + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAns(curlev){
    if(gamePattern[curlev] === userClickedPattern[curlev]){
        
        if(gamePattern.length === userClickedPattern.length){
            
            setTimeout(function(){
                nextsequence();
            }, 1000);
        }      
    }
    else{
        sound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}

$(document).keypress(function(){
    if(!started){
        $("h1").text("Level " + level);
        nextsequence();
        started = true;
    }
});

$(".button").on("click",function(event){
    var userchosencolor = $(this).attr("id");
    userClickedPattern.push(userchosencolor);

    sound(userchosencolor);
    animatePress(userchosencolor);
    checkAns(userClickedPattern.length - 1);
});