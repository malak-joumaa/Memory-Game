// <---Declaring Variables--->

// Divs according to color
var green = document.getElementById("square1");
var red = document.getElementById("square2");
var yellow = document.getElementById("square3");
var blue = document.getElementById("square4");
// h1 and container
var level = document.getElementById("instruction");
var conatiner = document.getElementById("container");
// Audios
var soundR = new Audio("assets/sounds/sounds/red.mp3");
var soundG = new Audio("assets/sounds/sounds/green.mp3");
var soundY = new Audio("assets/sounds/sounds/yellow.mp3");
var soundB = new Audio("assets/sounds/sounds/blue.mp3");
var soundGO = new Audio("assets/sounds/sounds/wrong.mp3");
//<---End of Declaring Variables--->

// <---Implementing glow on click event--->

//The following function changes the color of the div to gray
function downListener(color,sound){
    return function inner(event){
        console.log(event)
        color.style.backgroundColor= "#747474";
        color.style.boxShadow=" 0 0 10px #747474";
        sound.play();
    }
}

//The following function sets the div back to its original color.
function upListener(color){
    return function inner(event){
        console.log(event)
        color.style.backgroundColor= null;
        color.style.boxShadow= null;
    }
} 

//To add an EventListener and pass a function with parameters, 
//each function with the parameters was stored in a variable that was passed to the EventListener.
const downR = downListener(red,soundR)
const upR = upListener(red)
const downG = downListener(green,soundG)
const upG = upListener(green)
const downB = downListener(blue,soundB)
const upB = upListener(blue)
const downY = downListener(yellow,soundY)
const upY = upListener(yellow)

// EventListener for every div
red.addEventListener('mousedown',downR);
red.addEventListener('mouseup',upR);

green.addEventListener('mousedown',downG);
green.addEventListener('mouseup',upG);

blue.addEventListener('mousedown',downB);
blue.addEventListener('mouseup',upB);

yellow.addEventListener('mousedown',downY);
yellow.addEventListener('mouseup',upY);
// <---End of implementing glow on click event--->

// <---Start Game--->

let sequence=[] //array of random integers between 0 and 3
let colors=[[downR,upR], [downG,upG], [downY,upY], [downB,upB]] //array of the mousedown mouseup functions for each div
let divs = [red,green,yellow,blue]; //array of the divs

// EventListener to start the game
document.addEventListener("keypress", startGame);


var score = 1; //level number
var j=0; //counter for our current position in the sequence
 var seqCount = 0; //counter to check if we reached the end of the sequence
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

// Start game function
async function startGame(){
    document.removeEventListener("keypress", startGame);
    j=0; 
    seqCount=0; 
    
     if (score<16){ // Maximum number of levels is 15
        level.innerText = "Level "+score;
        await delay(700);
        sequence.push(Math.floor(Math.random() * 4)); // Adding a random number to the sequence each level
        
        // Invoking the functions of the newest color
        setTimeout(colors[sequence[sequence.length-1]][0],0),
        setTimeout(colors[sequence[sequence.length-1]][1],250)

        score++;

        // Flashing all the colors every level
        //i=0;
        // while(i<sequence.length) {
        //     setTimeout(colors[sequence[i]][0],0),
        //     setTimeout(colors[sequence[i]][1],250)
        //     await delay(700);
        //     i++;
        // }
    }
    else{
        // Player wins
        level.innerText = "You Win! Press Any Key to Play Again";
        score=1;
        sequence=[];
        document.addEventListener("keypress", startGame);
    }
}
    // Same logic as the mousedown mouseup functions applied on isCorrect function to pass a parameter 
    const clickR = isCorrect(red);
    const clickG = isCorrect(green);
    const clickY = isCorrect(yellow);
    const clickB = isCorrect(blue);

    // Adding on click to detect when the div is clicked
    red.onclick= clickR;
    green.onclick= clickG;
    yellow.onclick= clickY;
    blue.onclick= clickB;

    // Function that checks if the pressed div is correct with respect to the sequence
    function isCorrect(colorPressed){
        return function inner(event){
            console.log("isCorrect");
        
            // If div pressed is not the same as the one in the sequence 
        if(colorPressed!==divs[sequence[j]] && level.innerText != "You Win! Press Any Key to Play Again"&& sequence.length!=0){ //last 2 conditions are added to prevent provoking this if statement in case the user pressed any div after winning or before starting the game
            level.innerText = "Game Over, Press Any Key to Restart";
            document.body.style.backgroundColor= "red";
            setTimeout(function(){
                document.body.style.backgroundColor= null;
            }, 300);
            soundGO.play();              
            score=1;
            sequence=[];
            document.addEventListener("keypress", startGame); //restart
        }
        // If the div pressed is correct with respect to the sequence order
        else if(colorPressed===divs[sequence[j]]){
            seqCount++; //Increment the number of divs we pressed in the current level
            j++; //Increment j to move to the next element in the sequence
        }
        // If number of divs pressed = sequence lenght, call startGame to move to the next level
        if(seqCount==sequence.length && colorPressed===divs[sequence[j-1]]){
            startGame();
        }
        }
    }