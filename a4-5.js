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
    x: w/4,
    y: h/4,
    w: 10,
    h: 10,
    r: 50,
    c: 300,
    a: 1, 
    lw: 3,
    random: 0,
    angle: 0,
    speed: 5,
    boundary: {right: w/4*3, left: w/4, top: h/4, bottom: h/4*3},
    change: {x: 2, y: 2, r: 0, c: 0, a: 0, speed: 0}
}

var guide = {
    x: w/2,
    y: h/2,
    w: w/2,
    h: h/2,
    r: 50,
    c: 260,
    a: 0.5, 
    lw: 3,
    random: 0,
    angle: 0,
    change: {x: 0, y: 0, r: 0, c: 0, a: 0}

}

var eventStates = {
    isonClick: false,
    isSpacebar: false
}


var blob1 = {
    x: w/2,
    y: 500,
    w: 250,
    h: 150,
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
animationLoop();



/***** FUNCTIONS *****/

// ANIMATION
function animationLoop() {
    clear();

    // sandy ground
    ctx.rect(0, 500, 1000, 100);
    ctx.fillStyle = "wheat";
    ctx.fill();

    // draw blobfish;
    blobfish(blob1);
    
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
    ctx.lineWidth = lw*2;
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
        // o.flap = (2/6)*o.h;
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

function seaUrchin(o) {
    // body
    ctx.beginPath();
    ctx.arc(o.x, o.y, o.r, 0, 2*Math.PI);
    ctx.closePath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "hsla("+o.c+", 100%, 25%, "+o.a+")";
    ctx.stroke();
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();

    // tentacles
    for (var i = 0; i < o.tentacles; i++) {
        var angle = (360/o.tentacles)*i;
        ctx.beginPath();
        ctx.moveTo(o.x + 0.5*o.r*Math.cos(angle*oneDegree), o.y + 0.5*o.r*Math.sin(angle*oneDegree));
        ctx.lineTo(o.x + (o.r + 20 + rand(30))*Math.cos(angle*oneDegree), o.y + (o.r + 20 + rand(30))*Math.sin(angle*oneDegree));
        ctx.closePath();
        ctx.strokeStyle = "hsla("+o.c+", 100%, 25%, "+o.a+")";
        ctx.stroke();
    }
}

/***** SETUP & HELPER FUNCTIONS *****/

// ADVANCED TOPICS FUNCTIONS
function counter() {
    var count = 0;

    return{
        increment: increment,
        getCurrentCount: getCurrentCount
    }

    function increment() {
        count++;
    }

    function getCurrentCount() {
        return count;
    }
}

// COLLISION DETECTION
function collisionRemove(o1, o2) {
    var differenceX = Math.abs(o1.x - o2.x);
    var differenceY = Math.abs(o1.y - o2.y);
    var hdif = Math.sqrt(differenceX*differenceX + differenceY*differenceY);

    var index;
    if(hdif < o1.r+o2.r) {
        if(differenceX < differenceY) {
            index = allShapes.indexOf(o2);
            allShapes.splice(index, 1);
        }
    }
}

function collision_all(o, array) {
    for (var i = 0; i< array.length; i++) {
        if(o != array[i]) {
            collisionRemove(o, array[i]);
            // collision_circle(o, array[i]);
            // collision_rect(o, array[i]);
        }
    }
}

function collision_circle(o1, o2) {
    var differenceX = Math.abs(o1.x - o2.x);
    var differenceY = Math.abs(o1.y - o2.y);
    var hdif = Math.sqrt(differenceX*differenceX + differenceY*differenceY);

    if (hdif < o1.r+o2.r) {
        if (differenceX < differenceY) {
            o1.change.y *= -1;
            o2.change.y *= -1;
        }
        else {
            o1.change.x *= -1;
            o2.change.x *= -1;
        }
        console.log("potential collision");
    }
}

function collision_rect(o1, o2) {
    var differenceX;
    var differenceY;
    if(o1.x+o1.w/2 > o2.x-o2.w/2 && // right side o1 > left side o2
    o1.x-o1.w/2 < o2.x+o2.w/2 &&    // left side o1 < right sde o2
    o1.y+o1.h/2 > o2.y-o2.h/2 &&    // bottom o1 > top o2
    o1.y-o1.h/2 < o2.y+o2.h/2       // top o1 < bottom o2
    ) {
        differenceX = Math.abs(o1.x-o2.x);
        differenceY = Math.abs(o1.y-o2.y);
        if (differenceX < differenceY) {
            o1.change.y *= -1;
            o2.change.y *= -1;
        }
        else {
            o1.change.x *= -1;
            o2.change.x *= -1;
        }
        // stop();
        console.log("potential collision");
    }
}

// EVENTS
/*
document.querySelector("#myCanvas").onclick = click;

function click(event) {
    console.log("clicked: " + event.offsetX + " " + event.offsetY);
    o1.x = rand(w);
    o1.y = rand(h);
    /// code to execute when the canvas has been clicked
}

document.querySelector("#myCanvas").onmousemove = function(e) {
    console.log("onmousemove", e, e.offsetX, e.offsetY);
    /// code to execute when the canvas has been clicked
}

document.onkeydown = function(e) {
    console.log("onkeydown", e, e.keyCode, e.key);
    /// code to execute when the canvas has been clicked
}

function keydown(e) {
    if(e.key == " ") {
        createCircleData(allCircles, 1);
    }
    
    for (var i = 0; i < allCircles.length; i++) {
        if (e.key == "ArrowUp") {
            allCircles[i].change.y -= 1;
            // console.log("up");
        }
        else if (e.key == "ArrowDown") {
            allCircles[i].change.y += 1;
            // console.log("down");
        }
        else if (e.key == "ArrowLeft") {
            allCircles[i].change.x -= 1;
            // console.log("left");
        }
        else if (e.key == "ArrowRight") {
            allCircles[i].change.x += 1;
            // console.log("right");
        }
    }
    console.log("keydown", e);
}
*/

// ANIMATION
/*
function animationLoop() {
    clear();

    for (var i = 0; i < allCircles.length; i++) {
        circle(allCircles[i]);
        updateData(allCircles[i]);
        bounce2(allCircles[i]);
        // deleteData(allCircles[i], allCircles);
        // console.log(allCircles.length);
    }

    // rect(guide);
    // circle(o1);
    // updateDataKeys(o1);
    // growingTraceRect(o1);
    
    requestAnimationFrame(animationLoop);
}

var interval = setInterval(function() {
    clear();
}, 1000/60);

setTimeout(function() {
    clearInterval(interval);
}, 1000);
*/

// DATA MANIPULATION
function createCircleData(arr, num) {
    for(var i = 0; i < num; i++) {
        arr.push({
            x: rand(w),
            y: rand(h),
            r: 50,
            c: rand(360),
            a: 0.75,
            speed: 50,
            change: { x: randn(10), y: randn(10), r: 0, c: 0, a: 0, speed: 0}
        });
        console.log(arr[i]);
    }
}

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
    // bounce(o);
    
    //deleteData(o);
}

function updateDataKeys(o) {
    for(keys in o.change) {
        o[keys] += o.change[keys];
    }
    // o.x += o.change.x ; for all othe properties as well.
    //bounce(o);
    //torus(o);
}

function deleteData(o, arr) {
    var index;
    if (o.a < 0) {
        index = arr.indexOf(o);
        arr.splice(index, 1);
        console.log(arr, index);
    }
}

function circleAnimate(arr) {
    for (var i = 0; i < arr.length; i++) {
        circle(arr[i]);
        updateData(arr[i]);
        deleteData(arr[i], arr);
        console.log(arr.length);
    }
}

// MOTION
function bounce2(o) {
    if ((o.x > w) || (o.x < 0)) {
        o.x -= o.change.x;
        o.change.x *= -1;
        console.log('c1');
    }
    else if (o.y  > h || o.y < 0) {
        o.y -= o.change.y;
        o.change.y *= -1;
        console.log('c2');
    }
}

function growingTraceRect(o) {
    if (o.x > o.boundary.right) {
        o.x = o.boundary.right;
        o.change.x = 0;
        o.change.y = o.speed;
        o.boundary.right += 10;
        console.log('condition 1');
    }
    else if (o.y > o.boundary.bottom) {
        o.y = o.boundary.bottom;
        o.change.x = -o.speed;
        o.change.y = 0;
        o.boundary.bottom += 10;
        console.log('condition 2');
    }
    else if (o.x < o.boundary.left){
        o.x = o.boundary.left;
        o.change.x = 0;
        o.change.y = -o.speed;
        o.boundary.left -= 10;
        console.log('condition 3');
    }
    else if (o.y < o.boundary.top) {
        o.y = o.boundary.top;
        o.change.x = o.speed;
        o.change.y = 0;
        o.boundary.top -= 10;
        console.log('condition 4');
    }
}

function traceRect(o) {
    if (o.x > w/4*3) {
        o.x = w/4*3;
        o.change.x = 0;
        o.change.y = o.speed;
        console.log('condition 1');
    }
    else if (o.y > h/4*3) {
        o.y = h/4*3;
        o.change.x = -o.speed;
        o.change.y = 0;
        console.log('condition 2');
    }
    else if (o.x < w/4){
        o.x = w/4;
        o.change.x = 0;
        o.change.y = -o.speed;
        console.log('condition 3');
    }
    else if (o.y < h/4) {
        o.y = h/4;
        o.change.x = o.speed;
        o.change.y = 0;
        console.log('condition 4');
    }
}

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