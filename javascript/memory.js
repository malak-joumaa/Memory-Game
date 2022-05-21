var green = document.getElementById("square1");
var red = document.getElementById("square2");
var yellow = document.getElementById("square3");
var blue = document.getElementById("square4");
var level = document.getElementById("instruction");
var conatiner = document.getElementById("container");
var soundR = new Audio("assets/sounds/sounds/red.mp3");
var soundG = new Audio("assets/sounds/sounds/green.mp3");
var soundY = new Audio("assets/sounds/sounds/yellow.mp3");
var soundB = new Audio("assets/sounds/sounds/blue.mp3");
var soundGO = new Audio("assets/sounds/sounds/wrong.mp3");

const downR = downListener(red,soundR)
const upR = upListener(red)
const downG = downListener(green,soundG)
const upG = upListener(green)
const downB = downListener(blue,soundB)
const upB = upListener(blue)
const downY = downListener(yellow,soundY)
const upY = upListener(yellow)

red.addEventListener('mousedown',downR);
red.addEventListener('mouseup',upR);

green.addEventListener('mousedown',downG);
green.addEventListener('mouseup',upG);

blue.addEventListener('mousedown',downB);
blue.addEventListener('mouseup',upB);

yellow.addEventListener('mousedown',downY);
yellow.addEventListener('mouseup',upY);

function downListener(color,sound){
    return function inner(event){
        console.log(event)
        color.style.backgroundColor= "#747474";
        color.style.boxShadow=" 0 0 10px #747474";
        sound.play();
    }
}

function upListener(color){
    return function inner(event){
        console.log(event)
        color.style.backgroundColor= null;
        color.style.boxShadow= null;
    }
}

let sequence=[]

let colors=[[downR,upR], [downG,upG], [downY,upY], [downB,upB]]
let divs = [red,green,yellow,blue];

document.addEventListener("keypress", startGame);

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

var score=1;
var count = 0;
var i = 0;
var j=0;
// START GAME
async function startGame(){
    j=0;
    count=0;
    console.log("Here we go again");
    
     if (score<15){
        level.innerText = "Level "+score;
        i=0;
        await delay(1000);
        sequence.push(Math.floor(Math.random() * 4));
        
        while(i<sequence.length) {
            setTimeout(colors[sequence[i]][0],0),
            setTimeout(colors[sequence[i]][1],250)
            await delay(700);
            i++;
        }
        score++;
    }
    else{
        level.innerText = "You Win! Press Any Key to Play Again";
        score=1;
        sequence=[];
        document.addEventListener("keypress", startGame);
    }
}
    const clickR = isCorrect(red);
    const clickG = isCorrect(green);
    const clickB = isCorrect(blue);
    const clickY = isCorrect(yellow);

    red.onclick= clickR;
    green.onclick= clickG;
    yellow.onclick= clickY;
    blue.onclick= clickB;

    function isCorrect(color){
        return function inner(event){
            console.log("isCorrect");

        if(color!==divs[sequence[j]] && level.innerText != "You Win! Press Any Key to Play Again"){
            console.log(score);
            level.innerText = "Game Over, Press Any Key to Restart";
            document.body.style.backgroundColor= "red";
            setTimeout(function(){
                document.body.style.backgroundColor= null;
            }, 300);
            soundGO.play();              
            score=1;
            sequence=[];
            document.addEventListener("keypress", startGame);
        }
        else if(color===divs[sequence[j]]){
            count++;
            j++;
            console.log("count: "+count+" j:"+j)
        }

        if(count==sequence.length){
            console.log("start success");
            startGame();
        }
        }
    }