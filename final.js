console.log("Assignment 3")

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
    angle: 0,
    change: {x: 30, y: 30, r: 0, c: 0, a: 0}
}

var blob1 = {
    x: w/2,
    y: h/2,
    w: 400,
    h: 200,
    c: "hsla(340, 100%, 90%, 1)",
    sad: true,
    flap: 0,
    change: {
        x: randn(20),
        y: randn(20),
        flap: 1,
        sad: false
    }
}

/***** CODE EXECUTION *****/
setUpCanvas();
// createData(allCircles, 10);
// animationLoop();
blobfish(blob1);


/***** FUNCTIONS *****/

// animation
function animationLoop() {
    // clear canvas
    clear();

    // draw to screen
    //circleAnimate(allCircles);
    for (var i = 0; i < allCircles.length; i++) {
        circle(allCircles[i]);
        updateData(allCircles[i]);
        deleteData(allCircles[i], allCircles);
        console.log(allCircles.length);
    }
    
    // update data
    //updateData(o1);
    
    requestAnimationFrame(animationLoop);
}

function blobfish(o) {
    var lw = 2;
    var outline = "hsla(340, 100%, 50%, 1)";
    var fill = o.c;
    var mouthFill = "hsla(340, 100%, 70%, 1)";
    
    //body
    ctx.beginPath();
    ctx.moveTo(o.x - (4/12)*o.w, o.y);
    ctx.quadraticCurveTo(o.x,                   o.y - (5/6)*o.h,    o.x + (4/12)*o.w,       o.y);
    ctx.quadraticCurveTo(o.x + (5.5/12)*o.w,    o.y + (2.5/6)*o.h,  o.x + (3.5/12)*o.w,     o.y + (2/6)*o.h);
    ctx.quadraticCurveTo(o.x,                   o.y + (0.5/6)*o.h,  o.x - (3.5/12)*o.w,     o.y + (2/6)*o.h);
    ctx.quadraticCurveTo(o.x - (5.5/12)*o.w,    o.y + (2.5/6)*o.h,  o.x - (4/12)*o.w,       o.y);
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = outline;
    ctx.stroke();

    //eyes
    var r = (0.1/12)*o.w;
    if (r < 2) r = 2;
    ctx.beginPath()
    ctx.arc(o.x + (2/12)*o.w, o.y - (1/6)*o.h, r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.beginPath()
    ctx.arc(o.x - (2/12)*o.w, o.y - (1/6)*o.h, r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();

    //mouth
    var mouthY = 0;
    var mCPY = 1;

    if (o.sad) {
        mouthY = (1/6)*o.h;
        mCPY *= -1;
        o.flap = (2/6)*o.h;
    }
        
    ctx.beginPath();
    ctx.moveTo          (o.x - (2/12)*o.w,      o.y + mouthY - (0.25/6)*o.h * mCPY);
    ctx.quadraticCurveTo(o.x,                   o.y + mouthY + (1.5/6)*o.h * mCPY,      o.x + (2/12)*o.w,       o.y - (0.25/6)*o.h * mCPY + mouthY);
    ctx.quadraticCurveTo(o.x + (2.25/12)*o.w,   o.y + mouthY - (0.25/6)*o.h * mCPY,     o.x + (2.25/12)*o.w,    o.y + mouthY);
    ctx.quadraticCurveTo(o.x,                   o.y + mouthY + (2/6)*o.h * mCPY,        o.x - (2.25/12)*o.w,    o.y + mouthY);
    ctx.quadraticCurveTo(o.x - (2.25/12)*o.w,   o.y + mouthY - (0.25/6)*o.h * mCPY,     o.x - (2/12)*o.w,       o.y - (0.25/6)*o.h * mCPY + mouthY);
    ctx.closePath();
    ctx.lineWidth = lw;
    ctx.strokeStyle = outline;
    ctx.stroke();
    ctx.fillStyle = mouthFill;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo          (o.x - (2/12)*o.w,      o.y + mouthY);
    ctx.quadraticCurveTo(o.x,                   o.y + (1.75/6)*o.h * mCPY + mouthY,     o.x + (2/12)*o.w,       o.y + mouthY);
    ctx.lineWidth = lw*2;
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.closePath();

    //flaps
    ctx.beginPath();
    ctx.moveTo          (o.x + (3.5/12)*o.w,    o.y + (0.5/6)*o.h);
    ctx.quadraticCurveTo(o.x + (8/12)*o.w,      o.y + o.flap,    o.x + (3.5/12)*o.w,     o.y + (1.5/6)*o.h);
    ctx.lineWidth = lw*3;
    ctx.strokeStyle = outline;
    ctx.stroke();
    ctx.fillStyle = fill;
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo          (o.x - (3.5/12)*o.w,    o.y + (0.5/6)*o.h);
    ctx.quadraticCurveTo(o.x - (8/12)*o.w,      o.y + o.flap,    o.x - (3.5/12)*o.w,     o.y + (1.5/6)*o.h);
    ctx.lineWidth = lw*3;
    ctx.strokeStyle = outline;
    ctx.stroke();
    ctx.fillStyle = fill;
    ctx.fill();

    //nose
    ctx.beginPath();
    ctx.arc(o.x, o.y - (0.5/6)*o.h, (1.25/6)*o.h, -Math.PI/6, 7*Math.PI/6);
    ctx.lineWidth = lw*2;
    ctx.strokeStyle = outline;
    ctx.stroke();
    ctx.fillStyle = fill;
    ctx.fill();

}

/***** SETUP & HELPER FUNCTIONS *****/

function circleAnimate(arr) {
    for (var i = 0; i < arr.length; i++) {
        circle(arr[i]);
        updateData(arr[i]);
        deleteData(arr[i], arr);
        console.log(arr.length);
    }
}

var interval = setInterval(function() {
    clear();
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

function createRandomData(arr, num) {
    for(var i = 0; i < num; i++) {
        arr.push({
            x: rand(w),
            y: rand(h),
            r: rand(100),
            c: rand(360),
            a: rand(1),
            lw: 3,
            random: 0,
            angle: 0,
            change: {
                x: randn(20), 
                y: randn(20), 
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
    bounce(o);
    
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
function move(o) {
    var cx = Math.cos(o.angle*oneDegree);
    var cy = Math.sin(o.angle*oneDegree);
    o.x += cx;
    o.y += cy; 
    o.angle += 1;
}

function bounce(o) {
    if ((o.x > w) || (o.x < 0)) {
        o.change.x *= -1;
    }
    if (o.y  > h || o.y < 0) {
        o.change.y *= -1;
    }
}

function torus(o) {
    if (o.x > w) {
        o.x = 0;
    }
    if (o.x < 0) {
        o.x = w;
    }
    if (o.y > h) {
        o.y = 0;
    }
    if (o.y < 0) {
        o.y = h;
    }
}

function horizontalLineOfShapes(o, num) {
    for (var i = 0; i < num; i++) {
        rect(o);
        o.x += w/num+1;
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