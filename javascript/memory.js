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

function colorChange(color){
    color.style.backgroundColor= "#747474";
    color.style.boxShadow=" 0 0 10px #747474";
};

let sequence=[]
let usersurvives = false;

let colors=[[downR,upR], [downG,upG], [downY,upY], [downB,upB]]
let divs = [red,green,yellow,blue];

document.addEventListener("keypress", startGame);

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  var cont = true
var score=0;
var count = 0;
var i = 0;
var j=0;
async function startGame(){
    console.log("Here we go again");
    // if(i>1){
    //     col[sequence[i-1]].removeEventListener('click',eventR);
    //     console.log(count)
    //     }

    score++;
    level.innerText = "Level "+score;
  //  while(usersurvives){
     //   usersurvives = false;
     if (score<15){
        i=0;
        await delay(1000);
        sequence.push(Math.floor(Math.random() * 4));
        //sconsole.log(sequence)
        while(i<sequence.length) {
            setTimeout(colors[sequence[i]][0],0),
            setTimeout(colors[sequence[i]][1],250)
            await delay(1000);
            //console.log(col[sequence[0]]);
            i++;
        }
        j=0;
        count=0;
    }
    else{
        alert("You Won!!")
    }
    }
    const clickR = isCorrect(red)
    const clickG = isCorrect(green)
    const clickB = isCorrect(blue)
    const clickY = isCorrect(yellow)

    red.onclick= clickR;
    green.onclick= clickG;
    yellow.onclick= clickY;
    blue.onclick= clickB;

    

    // function isCorrect(color){
    //     console.log("isCorrect");
    //     if(color===divs[sequence[j]]){
    //         count++;
    //         j++;
    //     }
    //     else if(color!==divs[sequence[j]]){
    //         alert("You Lost!")
    //     }
    //     if(count==sequence.length){
    //         startGame();
    //     }
    // }
    function isCorrect(color){
        return function inner(event){
            console.log("isCorrect");
        if(color===divs[sequence[j]]){
            count++;
            j++;
            console.log("count: "+count+" j:"+j)
        }
        else if(color!==divs[sequence[j]]){
            alert("You Lost!")
        }
        if(count==sequence.length){
            console.log("start success");
            startGame();
        }
        }
    }
        //console.log("i after loop:"+i);
        //console.log(col[sequence[i-2]]);
        
//         divs[sequence[i-1]].addEventListener('click', eventR);
//    // }
//    function eventR(){
//     count++;
//     var checker = sequence.slice(0,-1)
//     if (checker.includes(sequence[i-1])){
//         count--;
//         console.log("new"+count)
//     }
//     console.log(i,count+"HII");
//     if (count==sequence.length){
//         startGame();
//     }
//    }



// If every event listener returns true, call startGame

    


