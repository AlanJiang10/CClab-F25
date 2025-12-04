  let cam;
let stage = 1;
let step1 = 8, step2 = 12;
let mirror;

function setup() {
  createCanvas(640, 480, WEBGL);
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();

  mirror = new SoftMirror(cam, step1);
}

function draw() {
  background(0);
  mirror.display();
}

// Shift stages through keys

// function keyPressed() {
//   if (key === '1') mirror = new SoftMirror(cam, step1);
//   else if (key === '2') mirror = new MechanicalMirror(cam, step2);
//   else if (key === '3') mirror = new FadeMirror(cam, step2);
// }

// Shift stages through mouse
function mousePressed() {
  stage = stage % 3 + 1; // 1 -> 2 -> 3 -> 1
  if (stage == 1) mirror = new SoftMirror(cam, step1);
  else if (stage ==2) mirror = new MechanicalMirror(cam, step2);
  else mirror = new FadeMirror(cam, step2);
}

      //Stage 1：SoftMirror
      

class SoftMirror {
  constructor(cam, step) {
    this.cam = cam;
    this.step = step;
    this.p = [];
    for (let x = 0; x < cam.width; x += step) {
      for (let y = 0; y < cam.height; y += step) {
        this.p.push(new Particle(x, y, step));
      }
    }
  }

  display() {
    this.cam.loadPixels();
    for (let i = 0; i < this.p.length; i++) {
     
      if (dist(mouseX, mouseY, map(this.p[i].x, 0, cam.width, 0, width),
       map(this.p[i].y, 0, cam.height, 0, height)) < 40) {
        this.p[i].update(mouseX, mouseY);
      } else {
        this.p[i].pushBack();
      }

  this.p[i].display(this.cam)
  }
}
}
//stage 2：MechanicalMirror
   
class MechanicalMirror {
  constructor(cam, step) {
    this.cam = cam;
    this.step = step;
  }

  display() {
    this.cam.loadPixels();
    for (let x = 0; x < this.cam.width; x += this.step) {
      for (let y = 0; y < this.cam.height; y += this.step) {
        let i = (x + y * this.cam.width) * 4;
        let r = this.cam.pixels[i];
        let g = this.cam.pixels[i + 1];
        let b = this.cam.pixels[i + 2];
        let br = (r + g + b) / 3;

        push();
        translate(x - width / 2, y - height / 2);
        noStroke();

        // cold colors
        if (br < 85) fill(0, 100, 200);       // blue
        else if (br < 170) fill(100, 180, 220); // green
        else fill(150, 200, 255);             // light blue

        if (br < 85) circle(0, 0, this.step);
        else if (br < 170) square(0, 0, this.step);
        else triangle(-this.step/2, this.step/2, this.step/2, this.step/2, 0, -this.step/2);

        pop();
      }
    }
  }
}

//stage 3：FadeMirror
      
class FadeMirror {
  constructor(cam, step) {
    this.cam = cam;
    this.step = step;
    this.alpha = 255;       
    this.fadeFactor = 0;     
  }

  display() {
    this.cam.loadPixels();
    this.alpha = max(this.alpha - 0.5, 0);
    this.fadeFactor = min(this.fadeFactor + 0.005, 1);

    for (let x = 0; x < this.cam.width; x += this.step) {
      for (let y = 0; y < this.cam.height; y += this.step) {
        let i = (x + y * this.cam.width) * 4;
        let r = this.cam.pixels[i];
        let g = this.cam.pixels[i + 1];
        let b = this.cam.pixels[i + 2];
        let br = (r + g + b) / 3;

        push();
        translate(x - width / 2, y - height / 2);
        noStroke();

        // become fade and darker
        let coldR = lerp(r, 100, this.fadeFactor);
        let coldG = lerp(g, 100, this.fadeFactor);
        let coldB = lerp(b, 100, this.fadeFactor);

        if (br < 85) fill(coldR * 0.6, coldG * 0.6, coldB * 1, this.alpha);
        else if (br < 170) fill(coldR * 0.5, coldG * 0.7, coldB * 1, this.alpha);
        else fill(coldR * 0.7, coldG * 0.8, coldB * 1, this.alpha);

        if (br < 85) circle(0, 0, this.step);
        else if (br < 170) square(0, 0, this.step);
        else triangle(-this.step/2, this.step/2, this.step/2, this.step/2, 0, -this.step/2);

        pop();
      }
    }
  }
}

//particles for stage 1
class Particle {
  constructor(x, y, s) {
    this.x0 = x;
    this.y0 = y;
    this.x = x;
    this.y = y;
    this.s = s;
    this.accX = 0;
    this.accY = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.away = 0.3;
  }

  display(cam) {
    let i = (this.x0 + this.y0 * cam.width) * 4;
    let r = cam.pixels[i];
    let g = cam.pixels[i + 1];
    let b = cam.pixels[i + 2];
    let br = (r + g + b) / 3;
    let z = map(br, 0, 255, 0, 40);

    push();
    translate(this.x - width / 2, this.y - height / 2, z);
    noStroke();
    fill(r, g, b, 180);
    circle(0, 0, this.s);
    pop();
  }

  update(mx, my) {
    let d = dist(mx, my, this.x, this.y);
    if (d < 40) {
      this.accX = (mx - this.x) * -this.away;
      this.accY = (my - this.y) * -this.away;
      this.speedX += this.accX;
      this.speedY += this.accY;
    }

    this.speedX *= 0.9;
    this.speedY *= 0.9;

    this.x += this.speedX;
    this.y += this.speedY;

    
  }
  pushBack(){
  this.x=lerp(this.x,this.x0,0.1);
  this.y=lerp(this.y,this.y0,0.1);

}
} 