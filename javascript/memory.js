let green = document.getElementById("square1");
let red = document.getElementById("square2");
let yellow = document.getElementById("square3");
let blue = document.getElementById("square4");
let level = document.getElementById("instruction");


const downR = downListener(red)
const upR = upListener(red)
const downG = downListener(green)
const upG = upListener(green)
const downB = downListener(blue)
const upB = upListener(blue)
const downY = downListener(yellow)
const upY = upListener(yellow)

red.addEventListener('mousedown',downR);
red.addEventListener('mouseup',upR);

green.addEventListener('mousedown',downG);
green.addEventListener('mouseup',upG);

blue.addEventListener('mousedown',downB);
blue.addEventListener('mouseup',upB);

yellow.addEventListener('mousedown',downY);
yellow.addEventListener('mouseup',upY);

function downListener(color){
    return function inner(event){
        console.log(event)
        color.style.backgroundColor= "#747474";
        color.style.boxShadow=" 0 0 10px #747474";
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
    if(score)
    j=0;
    count=0;
    console.log("Here we go again");
    
     if (score<5){
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
            console.log("HEREE");
            level.innerText = "Game Over, Press Any Key to Restart";                
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