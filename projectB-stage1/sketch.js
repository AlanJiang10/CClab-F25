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
        rotate(frameCount * 0.01); // 轻微旋转
        noStroke();

        // 暖色调映射
        if (br < 85) fill(255, 100 + br, 50);
        else if (br < 170) fill(255, 180, 100 + br/2);
        else fill(255, 220, 150);

        // 亮度对应大小
        let sz = map(br, 0, 255, this.step*0.5, this.step*1.5);
        if (br < 85) circle(0, 0, sz);
        else if (br < 170) square(0, 0, sz);
        else triangle(-sz/2, sz/2, sz/2, sz/2, 0, -sz/2);

        pop();
      }
    }
  }
}