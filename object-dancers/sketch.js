/*
  Check our the GOAL and the RULES of this exercise at the bottom of this file.
  
  After that, follow these steps before you start coding:

  1. rename the dancer class to reflect your name (line 35).
  2. adjust line 20 to reflect your dancer's name, too.
  3. run the code and see if a square (your dancer) appears on the canvas.
  4. start coding your dancer inside the class that has been prepared for you.
  5. have fun.
*/

let dancer;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");
  dancer = new AAA(width / 2, height / 2);
}

function draw() {
  background(0);
  drawFloor();
  dancer.update();
  dancer.display();
}

class AAA {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.baseR = 200;
    this.baseG = 100;
    this.baseB = 255;
    this.headR = 255;
    this.headG = 220;
    this.headB = 180;
    this.angle = 0;
    this.armAngle = 0;
    this.dir = 1;
    this.jump = 0;
    this.spin = 0;
    this.cShift = 0;
    this.eyeBlink = 1;  
    this.mouthOpen = 10;
  }

  update() {
    this.armAngle += 2 * this.dir;
    if (this.armAngle > 30 || this.armAngle < -30) {
      this.dir *= -1;
    }
    this.jump = sin(frameCount * 0.08) * 20;
    this.spin = sin(frameCount * 0.02) * 15;
    this.cShift = (sin(frameCount * 0.05) + 1) / 2 * 100;
     this.eyeBlink = (sin(frameCount * 0.3) + 1) / 2; 
    this.eyeBlink = max(0.2, this.eyeBlink); 

    
    this.mouthOpen = 10 + sin(frameCount * 0.2) * 5;
  }

  display() {
    push();
    translate(this.x, this.y - this.jump);
    rotate(radians(this.spin));

    // ⬇️ draw your dancer from here ⬇️

    fill(this.baseR, this.baseG + this.cShift, this.baseB - this.cShift);
    rectMode(CENTER);
    rect(0, 40, 30, 80, 10);

    fill(this.headR, this.headG, this.headB);
    ellipse(0, -20, 40, 40);
push();
    fill(0);
    ellipse(-10, -25, 6, 6 * this.eyeBlink);
    ellipse(10, -25, 6, 6 * this.eyeBlink);

    
    fill(0);
    ellipse(0, -10, 10, this.mouthOpen);
    pop();


    push();
    rotate(radians(this.armAngle));
    rect(-25, 40, 15, 50, 10);
    pop();

    push();
    rotate(radians(-this.armAngle));
    rect(25, 40, 15, 50, 10);
    pop();

    fill(150, 100, 255);
    rect(-10, 90, 10, 40, 5);
    rect(10, 90, 10, 40, 5);

    // ⬆️ draw your dancer above ⬆️

    this.drawReferenceShapes();
    pop();
  }

  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
  }
}








/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/