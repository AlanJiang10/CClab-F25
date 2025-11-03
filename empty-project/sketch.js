let x,y,s;
function setup() {
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
  x = width/2;
  y = height/2;
  s = 100;
}

function draw() {
  background(220);
  fill(255, 230);
  push();
  noStroke();
  translate(x, y);
  //main circle
  circle(0, 0, s);
  //add circles around
  for(let angle=0; angle<2*PI; angle += PI/5){
    push();
    rotate(angle);
    circle(s*0.5, 0, s*0.5);
    pop();
  }
  pop();
  
}

function drawCloud(x, y, s)




