// CCLab Mini Project - 9.R Particle World Template

let NUM_OF_PARTICLES = 3; // Decide the initial number of particles.
let MAX_OF_PARTICLES = 500; // Decide the maximum number of particles.

let particles = [];
let windAngle = 0; //  wind direction change

function setup() {
  let canvas = createCanvas(800, 500);
  canvas.parent("p5-canvas-container");
  //colorMode(HSB,100);

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(-50, 0), random(3, 8));
  }
}

function draw() {
  background(20, 40, 70); // dark blue background like night sky

  // consider generating particles in draw(), using Dynamic Array
  if (particles.length < MAX_OF_PARTICLES) {
    particles.push(new Particle(random(width), random(-50, 0), random(3, 8)));
  }

  // update and display
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.move();    // now wind direction logic is here
    p.display();

  
    if (p.y > height + 10) {
      particles.splice(i, 1); // remove the first (oldest) particle
    }
  }
}

// define class for particles
class Particle {
  // constructor function
  constructor(startX, startY, dia) {
    // properties (variables): particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = dia;  
    this.speedY = random(0.5, 2); // falling speed
    this.offset = random(1000);   // offset for wind sway
  }

  // methods (functions): particle's behaviors
  update() {
    // (add) update falling speed if near mouse
    let d = dist(this.x, this.y, mouseX, mouseY);
    this.speedBoost = 1;
    if (d < 100) { // if mouse is nearby
      this.speedBoost = map(d, 0, 100, 3.5, 1); // closer → faster
    }
  }

  move() {
    // gentle wind direction changes over time
    windAngle += 0.005;
    let wind = sin(windAngle) * 1.5; // changing wind strength

    // falling + wind sway + mouse boost
    this.y += this.speedY * this.speedBoost;
    this.x += sin(this.offset + frameCount * 0.02) * 1.2 + wind * 0.5;
  }

  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    noStroke();
    fill(255, 255, 255, 180); // white with some transparency
    circle(0, 0, this.dia);
    pop();
  } 
}
