class Rain {
    constructor(x, y) {
        this.x = x + random(-30, 30);
        this.y = y;
        this.h=this.h;
    }
    display() {
        stroke(this.h,20,100);
        strokeWeight(5);
        line(this.x, this.y, this.x, this.y + 5);
    }
    update() {
        this.y += 10;
    }
    isOutCanvas() {
        if (this.y > height + 5) {
            return true;
        } else {
            return false;
        }
    }
}
