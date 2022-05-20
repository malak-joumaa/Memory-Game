let green = document.getElementById("square1");
let red = document.getElementById("square2");
let yellow = document.getElementById("square3");
let blue = document.getElementById("square4");
let level = document.getElementById("instruction");


// const downR = downListener(red)
// const upR = upListener(red)
// const downG = downListener(green)
// const upG = upListener(green)
// const downB = downListener(blue)
// const upB = upListener(blue)
// const downY = downListener(yellow)
// const upY = upListener(yellow)

// red.addEventListener('mousedown',downR);
// red.addEventListener('mouseup',upR);

// green.addEventListener('mousedown',downG);
// green.addEventListener('mouseup',upG);

// blue.addEventListener('mousedown',downB);
// blue.addEventListener('mouseup',upB);

// yellow.addEventListener('mousedown',downY);
// yellow.addEventListener('mouseup',upY);


const downR = downListener(red);
const upR = upListener(red);

red.addEventListener('mousedown',downR);
red.addEventListener('mouseup',upR);

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

document.addEventListener("keypress", function(event) {
	
    setTimeout(downR,0);
    setTimeout(upR,250);
});
