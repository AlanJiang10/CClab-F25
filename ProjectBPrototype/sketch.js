let cam;
let mirror;

function setup() {
  let canvas = createCanvas(640, 480, WEBGL);
  canvas.parent("p5-canvas-container");

  cam = createCapture(VIDEO);
  cam.hide();

  mirror = new MechanicalMirror(cam, 12);
}

function draw() {
  background(0);
  mirror.display();
}


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

        let r = this.cam.pixels[i + 0];
        let g = this.cam.pixels[i + 1];
        let b = this.cam.pixels[i + 2];
        let br = (r + g + b) / 3; // // Compute brightness using a simple average

        push();
        translate(x - width / 2, y - height / 2);

        noStroke();
        
        //  MECHANICAL CLASSIFICATION
        // Low brightness --- dark circle  
        // Medium brightness --- gray square  
        // High brightness --- bright triangle  
        if (br < 85) {
          fill(50);
          circle(0, 0, this.step);
        } else if (br < 170) {
          fill(150);
          square(0, 0, this.step);
        } else {
          fill(255);
          triangle(
            -this.step/2, this.step/2,
            this.step/2, this.step/2,
            0, -this.step/2
          );
        }

        pop();
      }
    }
  }
}
