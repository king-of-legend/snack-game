var s;
var scl = 40;

var food;
var score = 0;
var highScore = 0;
var canvasWidth = (Math.floor(window.innerWidth/scl)) * scl - scl;
var canvasHeight = (Math.floor(window.innerHeight/scl)) * scl - scl;
var speed = 9;


function setup() {
  canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position((window.innerWidth - canvasWidth) / 2, (window.innerHeight - canvasHeight) / 2);
  frameRate(speed);

  s = new Snake();
  pickLocation();
}

function pickLocation(){
  var cols = floor(width/scl);
  var rows = floor(height/scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(0);
  s.death();
  s.update();
  s.show();
  if (score === 0) {
    speed = 9;
    frameRate(speed);
  }
  if (s.eat(food)) {
    playAudio("eat.wav");
    pickLocation();
    frameRate(speed);
    score++;
  }

  fill(255, 0, 87);
  rect(food.x, food.y, scl, scl);

  textSize(30);
  textFont('monospace');
  fill(0, 255, 0);
  text("SCORE: " + score, 30, 50);
  text("HIGHSCORE: " + highScore, 30, 90);
}

function keyPressed() {
  if (keyCode === UP_ARROW && s.yspeed !== 1) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && s.yspeed !== -1) {
    s.dir(0, 1)
  } else if (keyCode === LEFT_ARROW && s.xspeed !== 1) {
    s.dir(-1, 0)
  } else if (keyCode === RIGHT_ARROW && s.xspeed !== -1) {
    s.dir(1, 0)
  }
}

function playAudio(string) {
    var audio = new Audio(string);
    audio.volume=0.1;
    audio.play();
}
window.onload = function() {
  playAudio("music.mp3");
}


