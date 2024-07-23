var c1 = document.getElementById('layer1');
var c2 = document.getElementById('layer2');
var c3 = document.getElementById('layer3');
var c4 = document.getElementById('escButton');

const ctx1 = c1.getContext('2d');   // ctx1 for text + animations
const ctx2 = c2.getContext('2d');   // ctx2 for bg
const ctx3 = c3.getContext('2d');   // ctx3 for effects
const ctx4 = c4.getContext('2d');   // esc button\

var w = c1.width;
var h = c1.height;

var fullScreenWidth = window.innerWidth;
var fullScreenHeight = window.innerHeight;

document.getElementById('inputBox').addEventListener('input', updateTextwithLoop);
document.getElementById('fontColor').addEventListener('input', updateText);
document.getElementById('fontSize').addEventListener('input', updateTextwithLoop);

document.getElementById('shadColor').addEventListener('input', updateText);
document.getElementsByClassName('x')[0].addEventListener('input', updateText);
document.getElementsByClassName('y')[0].addEventListener('input', updateText);
document.getElementById('fontBlur').addEventListener('input', updateText);
document.getElementById('shadOpac').addEventListener('input', updateText);
document.getElementById('strColor').addEventListener('input', updateText);
document.getElementById('strWidth').addEventListener('input', updateText);

document.getElementById('background_Color').addEventListener('input', updateText);
document.getElementById('background_blur').addEventListener('input', updateText);
document.getElementById('bg_opacity').addEventListener('input', updateText);
document.getElementById('boardframe_Color').addEventListener('input', updateText);
document.getElementById('boardframe_Size').addEventListener('input', updateText);
document.getElementById('boardframe_blur').addEventListener('input', updateText);

var container = document.getElementsByClassName('container')[0];
var screen = document.getElementsByClassName('Screen')[0];
var banner = document.getElementsByClassName('buttons')[0];
var phone = document.getElementsByClassName('phone')[0];
var displayBox = document.getElementsByClassName('displayBox')[0];
var exit = document.getElementById('exitIcon');
var exitClass = document.getElementsByClassName('ExitScreen')[0];

// ENTER FULL SCREEN
document.getElementById('fullScreen').addEventListener('click', ()=>{
    screen.style.display = 'none';
    container.style.display ='none';
    banner.style.display = 'none';
    phone.style.border = '0px';
    phone.style.width = "100vw";
    phone.style.height = "100vh";
 
    displayBox.style.width = "100%";
    displayBox.style.height = "100%";
    displayBox.style.left = "0%";
    displayBox.style.padding = "0px";
    displayBox.style.radius = "0px";
    displayBox.style.border = "0px";

    c1.style.padding = "0px";
    c2.style.padding = "0px";
    c3.style.padding = "0px";
    c4.style.padding = "0px";

    c1.style['border-radius'] = '0px';
    c2.style['border-radius'] = '0px';
    c3.style['border-radius'] = '0px';
    c4.style['border-radius'] = '0px';

    Playbutton();
})

function escape(){
    ctx4.clearRect(0,0,c4.width,c4.height);

    screen.style.display = 'flex';
    container.style.display = 'flex';
    banner.style.display = 'flex';

    phone.style.border = '1px solid burlywood';
    phone.style.width = "1270px";
    phone.style.height = "750px";

    displayBox.style.width = "54%";
    displayBox.style.height = "71.83%";
    displayBox.style.left = "20%";
    displayBox.style.padding = "15px";
    displayBox.style.radius = "15px";
    displayBox.style.border = "1.5px solid #FC5A94";

    c1.style.padding = "15px";
    c2.style.padding = "15px";
    c3.style.padding = "15px";
    c4.style.padding = "15px";
}


// Get the mouse position
function getMousePos(event) {
    let x = event.clientX;
    let y = event.clientY;
    return {x, y};
}
  
// Function to check whether a point is inside a rectangle
function isInside(pos, rect) {
    return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}
  
// ESC button to draw
var rectbtn = {
    x: c4.width - 15,
    y: c4.height - 10,
    width: 10,
    height: 10,
};

// RECT coordinates to catch
var rectMatch = {
    x: window.innerWidth-100,
    y: window.innerHeight-100,
    width: 100,
    height: 100,
};
  
// Binding the click event on the canvas
 c4.addEventListener('click', function(event) {
        var mousePos = getMousePos(event);
    
        if (isInside(mousePos, rectMatch)) {
            console.log('clicked inside rect');
            escape();
        } else {
            console.log('clicked outside rect');
        }
}, false);
  
// Question code
function Playbutton() {
    ctx4.drawImage(exit, rectbtn.x, rectbtn.y, rectbtn.width, rectbtn.height);
}


// TEXT FUNCTIONS
var x = w/2;
var tw = 0;

var backgroundImage = null;
var boardframeImage = null;

function updateText() {
    const fontSize = document.getElementById('fontSize').value;
    const inputBox = document.getElementById('inputBox').value;
    const fontColor = document.getElementById('fontColor').value;
    const color = document.getElementById('shadColor').value;

    const background_Color = document.getElementById('background_Color').value;
    const background_blur = document.getElementById('background_blur').value;
    const background_opacity = document.getElementById('bg_opacity').value / 100;

    const boardframe_Color = document.getElementById('boardframe_Color').value;
    const boardframe_Size = document.getElementById('boardframe_Size').value;
    const boardframe_blur = document.getElementById('boardframe_blur').value;

    const xsh = document.getElementsByClassName('x')[0].value;
    const ysh = document.getElementsByClassName('y')[0].value;
    const blur = document.getElementById('fontBlur').value;
    const opacity = document.getElementById('shadOpac').value;
    let tmp = opacity/100;
    const strColor = document.getElementById('strColor').value;
    const strWidth = document.getElementById('strWidth').value;

    ctx1.clearRect(0, 0, w, h);
    ctx2.clearRect(0, 0, w, h);

    ctx1.shadowColor = `${color}`;
    ctx1.shadowOffsetX = xsh;
    ctx1.shadowOffsetY = ysh;
    ctx1.shadowBlur = blur;
    ctx1.globalAlpha = tmp;
    ctx1.font = `${fontSize}px` + " " + `${fontX}`;
    ctx1.fillStyle = `${fontColor}`;
    ctx1.textAlign = "center";
    ctx1.fillText(`${inputBox}`, x, h/2);
    tw = ctx1.measureText(`${inputBox}`).width;
    
    if(strWidth > 0){
        ctx1.strokeStyle = `${strColor}`;
        ctx1.lineWidth = strWidth;
        ctx1.strokeText(`${inputBox}`, x, h/2);
    } else if(strWidth <= 0){
        ctx1.strokeText("", x, h/2);
    }

    //Background 
    ctx2.globalAlpha = background_opacity;
    ctx2.filter = `blur(${background_blur}px)`;

    if (backgroundImage) {
        ctx2.drawImage(backgroundImage, 0, 0, w, h);
    } else {
        ctx2.fillStyle = background_Color;
        ctx2.fillRect(0, 0, w, h);
    }

    // Draw boardframe
    ctx2.save();
    ctx2.filter = `blur(${boardframe_blur}px)`;

    if (boardframeImage) {
        const bfPattern = ctx2.createPattern(boardframeImage, 'repeat');
        ctx2.fillStyle = bfPattern;

        ctx2.fillRect(0, 0, w, boardframe_Size); // Top border
        ctx2.fillRect(0, 0, boardframe_Size, h); // Left border
        ctx2.fillRect(w - boardframe_Size, 0, boardframe_Size, h); // Right border
        ctx2.fillRect(0, h - boardframe_Size, w, boardframe_Size); // Bottom border
    } else {
        ctx2.lineWidth = boardframe_Size;
        ctx2.strokeStyle = boardframe_Color;
        ctx2.strokeRect(0, 0, w, h);
    }
    ctx2.restore();
}


// Background pattern chooser
function choosePattern(imageUrl) {
    if (imageUrl) {
        backgroundImage = new Image();
        backgroundImage.onload = function() {
            updateText();
        };
        backgroundImage.src = imageUrl;
    } else {
        backgroundImage = null;
        updateText();
    }
}

// Boardframe pattern chooser
function patternBorder(imageUrl) {
    if (imageUrl) {
        boardframeImage = new Image();
        boardframeImage.onload = function() {
            updateText();
        };
        boardframeImage.src = imageUrl;
    } else {
        boardframeImage = null;
        updateText();
    }
}

var textWidth = 0;
function updateRiseText(x, y) {
    const fontSize = document.getElementById('fontSize').value;
    const inputBox = document.getElementById('inputBox').value;
    const fontColor = document.getElementById('fontColor').value;
    const color = document.getElementById('shadColor').value;
    const xsh = document.getElementsByClassName('x')[0].value;
    const ysh = document.getElementsByClassName('y')[0].value;
    const blur = document.getElementById('fontBlur').value;
    const opacity = document.getElementById('shadOpac').value;
    let tmp = opacity/100;
    const strColor = document.getElementById('strColor').value;
    const strWidth = document.getElementById('strWidth').value;

    ctx1.clearRect(0, 0, w, h);

    ctx1.shadowColor = `${color}`;
    ctx1.shadowOffsetX = xsh;
    ctx1.shadowOffsetY = ysh;
    ctx1.shadowBlur = blur;
    ctx1.globalAlpha = tmp;
    ctx1.font = `${fontSize}px` + " " + `${fontX}`;
    ctx1.fillStyle = `${fontColor}`;
    ctx1.textAlign = "center";
    ctx1.fillText(`${inputBox}`, x, y);
    textWidth = ctx1.measureText(`${inputBox}`).width;
   
    if(strWidth > 0){
        ctx1.strokeStyle = `${strColor}`;
        ctx1.lineWidth = strWidth;
        ctx1.strokeText(`${inputBox}`, x, y);
    } else if(strWidth <= 0){
        ctx1.strokeText("", x, y);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let background_color = document.getElementById("background_color");
    let boardframe = document.getElementById("boardframe");
    let backgroundContent = document.getElementById("backgroundContent");
    let boardframeContent = document.getElementById("boardframeContent");
  
    background_color.onclick = () => {
        if(window.innerWidth <= 1100){
            handleBtnClick(background_color, backgroundContent);
        }
    };
  
    boardframe.onclick = () => {
        if(window.innerWidth <= 1100){
            handleBtnClick(boardframe, boardframeContent);
        }
    };
  
    function handleBtnClick(button, content) {
        resetBtnColor();
        hideAllContent();
        button.style.backgroundColor = "#FC5A94";
        button.style.color = "white";
        content.hidden = false;
    }
  
    function hideAllContent() {
      backgroundContent.hidden = true;
      boardframeContent.hidden = true;
    }
  
    function resetBtnColor() {
      background_color.style.backgroundColor = "white";
      background_color.style.color = "black";
      background_color.style.border = "1px solid #FCC5D9";
  
      boardframe.style.backgroundColor = "white";
      boardframe.style.color = "black";
      boardframe.style.border = "1px solid #FCC5D9";
    }
  
    // Initial setup based on screen width
    if (window.innerWidth > 1100) {
      backgroundContent.hidden = false;
      boardframeContent.hidden = false;

      boardframe.style.backgroundColor = "#FC5A94";
      boardframe.style.color = "white";
      boardframe.style.borderColor = "none";
    } else {
      handleBtnClick(background_color, backgroundContent);
    }
  
    // Listen for window resize events
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1100) {
        backgroundContent.hidden = false;
        boardframeContent.hidden = false;
  
        boardframe.style.backgroundColor = "#FC5A94";
        boardframe.style.color = "white";
        boardframe.style.borderColor = "none";
      } else {
        handleBtnClick(background_color, backgroundContent);
      }
    });
});

var fontX;

function setFontStyle(fontFamily, element) {
    const fontSize = document.getElementById('fontSize').value;
    const inputBox = document.getElementById('inputBox').value;
    const fontColor = document.getElementById('fontColor').value;

    fontX = fontFamily;
    updateText();

    const fontOptions = document.querySelectorAll('.fontOption');
    fontOptions.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');
}


// Style Button Click
document.addEventListener("DOMContentLoaded", () => {
    let shadowBtn = document.getElementById("shadowBtn");
    let outlineBtn = document.getElementById("outlineBtn");

    let shadowContent = document.getElementById("shadowContent");
    let outlineContent = document.getElementById("outlineContent");

    let focus = "";

    shadowBtn.onclick = () => {
        if(window.innerWidth <= 1100){
            handleBtnClick(shadowBtn, shadowContent);
        }
    }

    outlineBtn.onclick = () => {
        if(window.innerWidth <= 1100){
            handleBtnClick(outlineBtn, outlineContent);
        }
    }

    function handleBtnClick(button, content) {
        resetBtnColor();
        hideAllContent();
        // if (focus === button.id) {
        //     focus = "";
        //     return;
        // }
        // focus = button.id;
        button.style.backgroundColor = "#FC5A94";
        button.style.color = "white";
        content.hidden = false;
    }

    function hideAllContent() {
        shadowContent.hidden = true;
        outlineContent.hidden = true;
    }

    function resetBtnColor() {
        shadowBtn.style.backgroundColor = "white";
        shadowBtn.style.color = "black";
        outlineBtn.style.color = "black";
        shadowBtn.style.border = "1px solid #FCC5D9"
        outlineBtn.style.backgroundColor = "white";
    }

    if(window.innerWidth > 1100){
        shadowContent.hidden = false;
        outlineContent.hidden = false;

        outlineBtn.style.background = "#FC5A94";
        outlineBtn.style.color = "white";
        outlineBtn.style.borderColor = "none";
    }else{
        handleBtnClick(shadowBtn, shadowContent);
    }

    window.addEventListener('resize', () =>{
        if(window.innerWidth > 1100){
            shadowContent.hidden = false;
            outlineContent.hidden = false;

            outlineBtn.style.background = "#FC5A94";
            outlineBtn.style.color = "white";            
            outlineBtn.style.borderColor = "none";
            
        }else{
            handleBtnClick(shadowBtn, shadowContent);
        }
    });
});

// Animation button click
document.addEventListener("DOMContentLoaded", ()=>{
    let aniBtn = document.getElementById("aniBtn");
    let effBtn = document.getElementById("effBtn");
    let aniCon = document.getElementById("aniContent");
    let effCon = document.getElementById("effContent");

    aniBtn.onclick = ()=>{
        if(window.innerWidth <= 1100){
            handleBtnClick(aniBtn, aniCon);
        }
    }

    effBtn.onclick = ()=>{
        if(window.innerWidth <= 1100){
            handleBtnClick(effBtn, effCon);
        }
    }

    function handleBtnClick(button, content){
        hideAllContent();
        resetBtnColor();
        button.style.backgroundColor = "#FC5A94";
        button.style.color = "white";
        content.hidden = false;
    }

    function hideAllContent(){
        aniCon.hidden = true;
        effCon.hidden = true; 
    }

    function resetBtnColor(){
        aniBtn.style.color = "black";
        aniBtn.style.backgroundColor = "white";
        effBtn.style.color = "black";
        effBtn.style.backgroundColor = "white";
        aniBtn.style.border = "1px solid #FCC5D9"
    }

    if(window.innerWidth > 1100){
        aniCon.hidden = false;
        effCon.hidden = false; 
        effBtn.style.background = "#FC5A94";
        effBtn.style.color = "white";
        effBtn.style.borderColor = "none";
    }else{
        handleBtnClick(aniBtn, aniCon);
    }

    window.addEventListener('resize', ()=> {
        if(window.innerWidth > 1100){
            aniCon.hidden = false;
            effCon.hidden = false; 
            effBtn.style.background = "#FC5A94";
            effBtn.style.color = "white";
            effBtn.style.borderColor = "none";
        }else{
            handleBtnClick(aniBtn, aniCon);
        }
    });
});


var animateSpeed;
var myLoop;
   
function animateLoop(){
    myLoop = requestAnimationFrame(animateLoop);
    animateSpeed = document.getElementById('aniDur').value;
    updateText();
    x -= animateSpeed;
    if(x + tw < 0){
        x = w + (tw/2);
    }     
}

function stopLoop(){
    cancelAnimationFrame(myLoop);
}

var blinked = true;
var blinking;
var blinkSpeed;
var myBlink;
function animateBlink(x){
    blinking = setInterval(()=>{
        ctx1.clearRect(0, 0, w, h);
        if(blinked){
            updateText();
        }
    blinked = !blinked;
    }, x)    // adjust speed in ms 
}

function getBlinkSpeed(){
    animateSpeed = document.getElementById('aniDur').value;
    blinkSpeed = animateSpeed*(-600) + 700;
}

function stopBlink(){clearInterval(blinking);}

var charWidth;

function updateTextSlide(char, slideX, slideY) {
    const fontSize = document.getElementById('fontSize').value;
    const fontColor = document.getElementById('fontColor').value;
    const color = document.getElementById('shadColor').value;
    const xsh = document.getElementsByClassName('x')[0].value;
    const ysh = document.getElementsByClassName('y')[0].value;
    const blur = document.getElementById('fontBlur').value;
    const opacity = document.getElementById('shadOpac').value;
    let tmp = opacity/100;
    const strColor = document.getElementById('strColor').value;
    const strWidth = document.getElementById('strWidth').value;
    ctx1.shadowColor = `${color}`;
    ctx1.shadowOffsetX = xsh;
    ctx1.shadowOffsetY = ysh;
    ctx1.shadowBlur = blur;
    ctx1.globalAlpha = tmp;
    ctx1.font = `${fontSize}px` + " " + `${fontX}`;
    ctx1.fillStyle = `${fontColor}`;
    ctx1.textAlign = "center";
    ctx1.fillText(`${char}`, slideX, slideY);
    charWidth = ctx1.measureText(`${char}`).width;
    if(strWidth > 0){
        ctx1.strokeStyle = `${strColor}`;
        ctx1.lineWidth = strWidth;
        ctx1.strokeText(`${char}`, slideX, slideY);
    } else if(strWidth <= 0){
        ctx1.strokeText("", slideX, slideY);
    }
}
    
var currChar = 0;
var slideX = w;
var charArray = [];
var boolArray = [];
var startX;
var startX0;
var addX0 = 0;
var alignCoordinates = [];

function getAlignCoordinates(){
    startX = (w-tw)/2;
    startX0 = (w-tw)/2;
    alignCoordinates.push(startX0);
}

function preSlide(){
    var string = document.getElementById('inputBox').value;
    charArray = string.split('');
    for (let i = 0; i<charArray.length; i++){
        boolArray.push(false);
    }
    for(let i = 0; i<charArray.length; i++){
        updateTextSlide(charArray[i], w+10, h/2);
        startX0 += charWidth;
        alignCoordinates.push(startX0);
    }  
}

var mySlide;

function animateSlide(){
    mySlide = requestAnimationFrame(animateSlide);
    animateSpeed = document.getElementById('aniDur').value;
    ctx1.clearRect(0, 0, w, h);

    if(currChar < charArray.length){
        if(slideX > startX){
            slideX -= animateSpeed;
            updateTextSlide(charArray[currChar], slideX, h/2);
        }
        if(slideX <= startX){
            boolArray[currChar] = true;
            currChar += 1;
            slideX = w;
            startX += charWidth;
        }
    } 

    for(let i = 0; i<boolArray.length; i++){
        if(boolArray[i]){
            updateTextSlide(charArray[i], alignCoordinates[i], h/2);
        }
    }     
}

function stopSlide(){
    cancelAnimationFrame(mySlide);
    currChar = 0;
    boolArray = [];
    charArray = [];
    slideX = w;
}

function resetAnimation(){
    stopLoop();
    stopBlink();
    stopSlide();
    stopRise();
    stopJog();
    x = w/2;
    updateText();
}

 // DOWN TO UP TEXT ANIMATION
  
let positionY = h;
let direction = 'downToUp';
var myRiseText;

function animateRiseText() {
    myRiseText = requestAnimationFrame(animateRiseText);
    animateSpeed = document.getElementById('aniDur').value;
    ctx1.clearRect(0, 0, w, h);
    if (direction === 'downToUp') {
        updateRiseText(w/2, positionY);
        positionY -= animateSpeed;
        if (positionY < -30) {
        positionY = h + 30;
        }
    }
}

function stopRise(){cancelAnimationFrame(myRiseText);}

 // JOGGING TEXT
const jogRange = 50;
var positionX = w/2;
var jogDir = 1;

var myJog;
function animateJogText() {
    myJog = requestAnimationFrame(animateJogText);
    animateSpeed = document.getElementById('aniDur').value;
    ctx1.clearRect(0, 0, w, h);

    updateRiseText(positionX, h/2);
    positionX += animateSpeed * jogDir;

    if (jogDir === 1 && positionX >= w/2 + jogRange) {
        jogDir = -1;
    }else if (jogDir === -1 && positionX <= w/2 - jogRange) {
        jogDir = 1;
    }
}

function stopJog(){cancelAnimationFrame(myJog);}

let noAnimation = document.getElementsByClassName('op00')[0];
var loopText = document.getElementsByClassName('op00')[1];
let blinkText = document.getElementsByClassName('op00')[2];
let slideText = document.getElementsByClassName('op00')[3];
let riseText = document.getElementsByClassName('op00')[4];
let jogText = document.getElementsByClassName('op00')[5];

noAnimation.addEventListener('click', resetAnimation);

loopText.addEventListener('click', ()=>{
    resetAnimation();
    animateLoop();
});

blinkText.addEventListener('click', ()=>{
    resetAnimation();
    animateBlink(500);
    document.getElementById('aniDur').addEventListener('input', ()=>{
        stopBlink();
        getBlinkSpeed();
        animateBlink(blinkSpeed);
    })
});

slideText.addEventListener('click', ()=>{
    resetAnimation();
    getAlignCoordinates();
    preSlide();
    animateSlide();
});

riseText.addEventListener('click', ()=>{
    resetAnimation();
    animateRiseText();
    
})
    
jogText.addEventListener('click', ()=>{
    resetAnimation();
    animateJogText();
})


var autoLoop = false;
function checkAutoLoopText(){
    if(tw > w){autoLoop = true;}
    if(tw<w){autoLoop = false;}
}

function updateTextwithLoop(){
    updateText();
    checkAutoLoopText();
    if(autoLoop){
        loopText.click();
    }
    if(!autoLoop){
        stopLoop();
        x = w/2;
        updateText();
    }
}


// EFFECTS FUNCTIONS

var effectSpeed;

// COLORFUL EFFECT

let circles = [];
let colors = [[255, 192, 203, 1], [0, 128, 0, 1], [255, 0, 0, 1], [128, 0, 128, 1], [184, 255, 128, 1]];

function init(){
    createObject();
    animationLoop();
}

function createObject(){
    for(let i=0; i<50; i++){
        circles.push(new Circle(i));
    }
}

var myColorLoop;

function animationLoop(){
    myColorLoop = requestAnimationFrame(animationLoop);
    ctx3.clearRect(0, 0, w, h);
    
    updateCircles();
    drawScene();
}


function updateCircles() {
    circles.forEach(circle => {
        circle.update();
    });
}

function drawScene(){
    circles.forEach((circle)=>{
        circle.draw();
    });
}

class Circle{
    constructor(i){
        this.x = Math.random()*w;
        this.y = Math.random()*h;
        this.radius = 5;
        this.color = colors[i % colors.length];
        this.alpha = 1;
        this.velX = (Math.random() * 2 - 1);
        this.velY = (Math.random() * 2 - 1);
    }
    update(speed) {
        this.x += this.velX;
        this.y += this.velY;

        // Reverse direction when hitting the edges
        if (this.x - this.radius < 0 || this.x + this.radius > w) {
            this.velX *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > h) {
            this.velY *= -1;
        }
    }
    draw(){
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, 0, Math.PI *2);
        ctx3.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.color[3]})`;
        ctx3.closePath();
        ctx3.fill();
    }
}

function stopColor(){
    cancelAnimationFrame(myColorLoop);
    circles = [];
}


// NEWFIRE EFFECT


// Define the LED dimensions
var ledSize = 10;
var ledGap = 10;
var LEDeffect;

// Define the LED colors
var onColor = "#ffff00";
var offColor = "#333333";

// Define the animation speed
var animationSpeed = 500; // milliseconds per frame

// Animation loop
var myTimeout;
function animateLED() {
    myTimeout = setTimeout(function() {
        LEDeffect = requestAnimationFrame(animateLED);

        ctx3.clearRect(0, 0, w, h);
        drawLEDs();
    }, animationSpeed);
}

function stopLED(){clearTimeout(myTimeout);}

// Draw the LEDs
function drawLEDs() {
    for (var x = 0; x < w; x += ledSize + ledGap) {
        for (var y = 0; y < h; y += ledSize + ledGap) {
            // Randomly turn the LED on or off
            var isOn = Math.random() < 0.5;

            // Draw the LED
            ctx3.beginPath();
            ctx3.arc(x + ledSize / 2, y + ledSize / 2, ledSize / 2, 0, 2 * Math.PI);
            ctx3.fillStyle = isOn ? onColor : offColor;
            ctx3.fill();
        }
    }
}
    

// SNOW EFFECT
var totalSnow = 100;
var listSnow = [];

const Snow = function () {
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.radius = Math.random()*2;
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);

    this.draw = function() {
        ctx3.beginPath();
        ctx3.arc(this.x, this.y, this.radius, Math.PI*2, false);
        ctx3.fillStyle = 'white';
        ctx3.fill();
        ctx3.closePath();

        // update
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > h) {
            this.y = -10;
            this.x = Math.random() * w * 1.5;
        }
    }
}

const random = (min, max) => {
    return min + Math.random() * (max - min + 1);
}

function initSnow(){
    createSnow();
}

function createSnow(){
    for(let i = 0; i < totalSnow; i++ ) {
        listSnow.push(new Snow);
    }
}

var mySnow;

function loop(){
    mySnow = requestAnimationFrame(loop);
    ctx3.clearRect(0, 0, w, h);
    
    listSnow.forEach((snow) => {
        snow.draw();
    });
}

function stopSnow(){
    cancelAnimationFrame(mySnow);
    listSnow = [];
}

// RAIN EFFECT

let raindrops = [];
const numRaindrops = 200;

class Raindrop {
    constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * -h;
        this.length = Math.random() * 20 + 10;
        this.width = Math.random() * 2;
        this.speed = Math.random() ;
    }
    draw() {
        ctx3.beginPath();
        ctx3.moveTo(this.x, this.y);
        ctx3.lineTo(this.x, this.y + this.length);
        ctx3.lineWidth = this.width;
        ctx3.strokeStyle = 'white';
        ctx3.stroke();
    }
    update() {
        this.y += this.speed;

        if (this.y > h) {
        this.x = Math.random() * w;
        this.y = Math.random() * -h;
        }
    }
}

function initRaindrops() {
    for (let i = 0; i < numRaindrops; i++) {
        raindrops.push(new Raindrop());
    }
}

var myRain;
function animateRain() {
    myRain = requestAnimationFrame(animateRain);
    ctx3.clearRect(0, 0, w, h);

    for (let i = 0; i < raindrops.length; i++) {
        raindrops[i].draw();
        raindrops[i].update();
    }
}

function stopRain(){
    cancelAnimationFrame(myRain);
    raindrops = [];
}


// BUTTERFLY EFFECT
// Define the butterfly properties
const butterflyCount = 50;
const butterflies = [];
const butterflySize = 10;
const butterflySpeed = 1;
const butterflyColor = 'rgba(255, 25, 2)';

// Create the butterflies
for (let i = 0; i < butterflyCount; i++) {
  butterflies.push({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() * 2 - 1) * butterflySpeed,
    vy: (Math.random() * 2 - 1) * butterflySpeed,
    flap: 0
  });
}

// Define the animation function
var myanimateButterfly;
function animateButterfly() {
    // Clear the canvas
    ctx3.clearRect(0, 0, w, h);

    // Draw the butterflies
    for (let i = 0; i < butterflies.length; i++) {
        const butterfly = butterflies[i];

        // Update the butterfly position
        butterfly.x += butterfly.vx;
        butterfly.y += butterfly.vy;

        // Wrap the butterfly around the canvas edges
        if (butterfly.x < 0) butterfly.x = w;
        if (butterfly.x > w) butterfly.x = 0;
        if (butterfly.y < 0) butterfly.y = h;
        if (butterfly.y > h) butterfly.y = 0;

        // Update the butterfly flap animation
        butterfly.flap = (butterfly.flap + 0.2) % (2 * Math.PI);

        // Draw the butterfly
        ctx3.beginPath();
        ctx3.moveTo(butterfly.x, butterfly.y);
        ctx3.bezierCurveTo(
            butterfly.x - butterflySize / 2, butterfly.y - butterflySize / 2,
            butterfly.x + butterflySize / 2, butterfly.y - butterflySize / 2,
            butterfly.x, butterfly.y
        );
        ctx3.bezierCurveTo(
            butterfly.x + butterflySize / 2, butterfly.y + butterflySize / 2,
            butterfly.x - butterflySize / 2, butterfly.y + butterflySize / 2,
            butterfly.x, butterfly.y
        );
        ctx3.fillStyle = butterflyColor;
        ctx3.fill();
    }

    // Request the next animation frame
    myanimateButterfly = requestAnimationFrame(animateButterfly);
}

function stopButterfly(){cancelAnimationFrame(myanimateButterfly);}


// DISCO LIGHT EFFECT
var myDiscoTimeout, myDiscoAnimate;
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
  
// Disco light effect function
function animateDiscoLight() {
    ctx3.clearRect(0, 0, w, h);

    // Draw random circles with random colors
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const radius = Math.random() * 6;
        const color = getRandomColor();

        ctx3.beginPath();
        ctx3.arc(x, y, radius, 0, 2 * Math.PI);
        ctx3.fillStyle = color;
        ctx3.fill();

        ctx3.shadowColor = 'white';
        ctx3.shadowBlur = 30;
    }

    // Request the next frame after a delay
    myDiscoTimeout = setTimeout(() => {
        myDiscoAnimate = requestAnimationFrame(animateDiscoLight);
    }, 100);
}

function stopDisco(){
    cancelAnimationFrame(myDiscoAnimate);
    clearTimeout(myDiscoTimeout);
    ctx3.clearRect(0, 0, w, h);
}

function resetEffects(){
    stopColor();
    stopLED();
    stopSnow();
    stopRain();
    stopButterfly();
    stopDisco();
    ctx3.clearRect(0, 0, w, h);
}

// EFFECTS BUTTONS
let colorful = document.getElementById('colorful');
let newfire = document.getElementById("newfire");
let snow = document.getElementById('snow');
let rain = document.getElementById('rain');
let butterfly = document.getElementById('butterfly');
let disco = document.getElementById('disco');


colorful.addEventListener('click', ()=>{
    resetEffects();
    init();
});

newfire.addEventListener('click', ()=>{
    resetEffects();
    animateLED();
});

snow.addEventListener('click', () => {
    resetEffects();
    initSnow();
    loop();
});

rain.addEventListener('click', ()=>{
    resetEffects();
    initRaindrops();
    animateRain();
});
butterfly.addEventListener('click', ()=>{
    resetEffects();
    animateButterfly();
})
disco.addEventListener('click', ()=>{
    resetEffects();
    animateDiscoLight();
})


// NO EFFECTS
let noEffects = document.getElementById('noEffects');
noEffects.addEventListener('click', ()=>{
    resetEffects();
    updateText();
});

//Button click
function showContent(contentId) {
    const sections = document.querySelectorAll('.contentSection');
    sections.forEach(section => {
        if (section.id === contentId) {
            section.style.display = 'flex';
        } else {
            section.style.display = 'none';
        }
    });
}