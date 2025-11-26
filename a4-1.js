console.log("Assignment 4")

/***** GLOBAL VARIABLES *****/
var canvas;
var ctx;
var w = 1000;
var h = 600;
var colours = [0, 60, 120, 180, 240, 300];
var oneDegree = 2*Math.PI/360;
var allCircles = [];
var o1 = {
    x: w/2,
    y: h/2,
    w: 10,
    h: 10,
    r: 50,
    c: 300,
    a: 1, 
    lw: 3,
    random: 0,
    change: {x: 2, y: 2, r: 0, c: 0, a: 0}
}

/***** CODE EXECUTION *****/
setUpCanvas();
animationLoop();

/***** FUNCTIONS *****/
// ANIMATION
function animationLoop() {
    // clear the canvas
    clear();

    // draw to canvas

    // update data

    
    requestAnimationFrame(animationLoop);
}

var interval = setInterval(function() {
    //clear();
}, 1000/60);

setTimeout(function() {
    clearInterval(interval);
}, 1000);

// DATA MANIPULATION
function createData(arr, num) {
    for(var i = 0; i < num; i++) {
        arr.push({
            x: w/num*i,
            y: h/2,
            r: 50,
            c: rand(360),
            a: 0.5,
            lw: 3,
            random: 0,
            angle: 0,
            change: {
                x: rand(5), 
                y: rand(5), 
                r: 0, 
                c: 0, 
                a: 0.001 + rand(0.002),
                lw: 0,
                random: 0,
                angle: 0
            }
        });
        console.log(arr[i]);
    }
}

function updateData(o) {
    o.x += o.change.x;
    o.y += o.change.y;
    o.r += o.change.r;
    o.c += o.change.c;
    o.a -= o.change.a;

    // move(o);
    // bounce(o);
    
    //deleteData(o);
}

function deleteData(o, arr) {
    var index;
    if (o.a < 0) {
        index = arr.indexOf(o);
        arr.splice(index, 1);
        console.log(arr, index);
    }
}

// MOTION
function bounce(o) {
    if ((o.x > w) || (o.x < 0)) {
        o.change.x *= -1;
        // console.log('c1');
    }
    
    if (o.y  > h || o.y < 0) {
        o.change.y *= -1;
        // console.log('c2');
    }
}

function torus(o) {
    if (o.x > w) {
        o.x = 0;
        // console.log('c1');
    }
    else if (o.x < 0) {
        o.x = w;
        // console.log('c2');
    }
    
    if (o.y > h) {
        o.y = 0;
        // console.log('c3');
    }
    else if (o.y < 0) {
        o.y = h;
        // console.log('c4');
    }
}

// SHAPES
function circle(o) {
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();
}

function rect(o) {
    var x = o.x;
    var y = o.y;
    o.x = o.x - o.w/2;
    o.y = o.y - o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x + rand(o.random), o.y + rand(o.random));
    ctx.lineTo(o.x + o.w + rand(o.random), o.y + rand(o.random));
    ctx.lineTo(o.x + o.w + rand(o.random), o.y + o.h + rand(o.random));
    ctx.lineTo(o.x + rand(o.random), o.y + o.h + rand(o.random));
    ctx.closePath();
    ctx.strokeStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.lineWidth = o.lw;
    ctx.stroke();
    o.x = x;
    o.y = y;
}

// CANVAS
function setUpCanvas () {
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext("2d");
    canvas.width = w;
    canvas.height = h;
    canvas.style.border = "2px solid blue";
}

function clear() {
    ctx.clearRect(0, 0, w, h);
}

// RANDOMIZERS
function rand (range) {
    var result = Math.random() * range;
    return result;
}

function randi (range) {
    var floatResult = Math.random() * range;
    var integerResult = Math.floor(floatResult);
    if (integerResult == 0) {integerResult = 1}
    return integerResult;
}

function randn (range) {
    var r = Math.random() * range - range/2;
    return r;
}