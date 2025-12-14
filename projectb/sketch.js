let cam;
let stage = 1;
let step1 = 8, step2 = 12;
let mirror;

function setup() {
  let canvas = createCanvas(640,480);
  canvas.parent("p5-canvas-container");
  cam = createCapture(VIDEO);
  cam.size(640, 480);
  cam.hide();

  mirror = new SoftMirror(cam, step1);
}

function draw() {
  background(0);
  mirror.display(); 
}

function mousePressed() {
  stage = stage % 3 + 1;

  if (stage == 1) mirror = new SoftMirror(cam, step1);
  else if (stage == 2) mirror = new MechanicalMirror(cam, step2);
  else mirror = new FadeMirror(cam, step2);
}

// Stage 1: Soft Mirror 

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
      let sx = map(this.p[i].x, 0, cam.width, 0, width);
      let sy = map(this.p[i].y, 0, cam.height, 0, height);

     
      if (dist(mouseX, mouseY, sx, sy) < 60) {
        this.p[i].x += random(-0.5, 0.5);
        this.p[i].y += random(-0.5, 0.5);
      }

      this.p[i].update(mouseX, mouseY);
      this.p[i].display(cam);
    }
  }
}

// Stage 2: Mechanical Mirror 

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

        let px = map(x, 0, this.cam.width, 0, width);
        let py = map(y, 0, this.cam.height, 0, height);

        push();
        translate(px, py);
        rotate(frameCount * 0.01); 
        noStroke();

      
        if (br < 85) fill(255, 100 + br, 50);
        else if (br < 170) fill(255, 180, 100 + br/2);
        else fill(255, 220, 150);

       
        let sz = map(br, 0, 255, this.step*0.5, this.step*1.5);
        if (br < 85) circle(0, 0, sz);
        else if (br < 170) square(0, 0, sz);
        else triangle(-sz/2, sz/2, sz/2, sz/2, 0, -sz/2);

        pop();
      }
    }
  }
}

//  Stage 3: Fade Mirror 

class FadeMirror {
  constructor(cam, step) {
    this.cam = cam;
    this.step = step;
    this.alpha = 255;
    this.fadeFactor = 0;
  }

  display() {
    this.cam.loadPixels();

    this.alpha = max(this.alpha - 0.4, 0);
    this.fadeFactor = min(this.fadeFactor + 0.003, 1);

    for (let x = 0; x < this.cam.width; x += this.step) {
      for (let y = 0; y < this.cam.height; y += this.step) {

        let i = (x + y * this.cam.width) * 4;
        let r = this.cam.pixels[i];
        let g = this.cam.pixels[i + 1];
        let b = this.cam.pixels[i + 2];
        let br = (r + g + b) / 3;

        let px = map(x, 0, this.cam.width, 0, width);
        let py = map(y, 0, this.cam.height, 0, height);

        
        py -= this.fadeFactor * 8;
        let wob = sin(frameCount * 0.03 + x * 0.2) * 2;

        let fadeR = lerp(r, 80, this.fadeFactor);
        let fadeG = lerp(g, 160, this.fadeFactor);
        let fadeB = lerp(b, 255, this.fadeFactor);

        push();
        translate(px + wob, py);

        
        stroke(170, 210, 255, this.alpha * 0.8);
        strokeWeight(0.4);
        fill(fadeR, fadeG, fadeB, this.alpha);

        if (br < 85) circle(0, 0, this.step);
        else if (br < 170) square(0, 0, this.step);
        else triangle(-this.step / 2, this.step / 2,
                      this.step / 2, this.step / 2,
                      0, -this.step / 2);

        pop();
      }
    }
  }
}


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

    let px = map(this.x, 0, cam.width, 0, width);
    let py = map(this.y, 0, cam.height, 0, height);
    let d = dist(mouseX, mouseY, px, py);

    
    let sz = this.s;
    if (d < 50) sz = this.s * map(d, 0, 50, 1.8, 1);

    push();
    translate(px, py);
    noStroke();
    fill(r, g, b, 180);
    circle(0, 0, sz);
    pop();
  }

  update(mx, my) {
    let px = map(this.x, 0, cam.width, 0, width);
    let py = map(this.y, 0, cam.height, 0, height);

    let d = dist(mx, my, px, py);
    if (d < 40) {
      this.accX = (mx - px) * -this.away;
      this.accY = (my - py) * -this.away;
      this.speedX += this.accX;
      this.speedY += this.accY;
    }

    
    this.speedX += random(-0.3, 0.3);
    this.speedY += random(-0.3, 0.3);

    this.speedX *= 0.9;
    this.speedY *= 0.9;

    this.x += this.speedX;
    this.y += this.speedY;

    this.pushBack();
  }

  pushBack() {
    this.x = lerp(this.x, this.x0, 0.1);
    this.y = lerp(this.y, this.y0, 0.1);
  }
}
