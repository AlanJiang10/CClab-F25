let c;
function setup() {
  //createCanvas(400, 400);
  let canvas = createCanvas(800, 400);
  canvas.parent("p5-canvas-container");
   c= new Cloud();
}

function draw() {
  background(220);
  c.display();
  c.move();
}


class Cloud{
  //constructor(setup)
 constructor(){
  this.x = width / 2;
  this.y = height / 2;
  this.s=100
 }
  //methods(functions)
  display(){
     push();
  translate(this.x, this.y);
   
  //arm right
  beginShape();
    let lineLength = this.s*0.5;
    noFill();
    for (let i = -lineLength*2; i <= lineLength; i += lineLength / 20) {
      strokeWeight(this.s * 0.1);
      let v = this.s * 0.1 * sin(frameCount * 0.1 - i / (this.s * 0.1));
      vertex(i, v);
      //circle(i, v, 5);
    }
    endShape();

  //mainbody
  fill(255)
  noStroke();
  circle(0, 0, this.s);
  //circles around the body
  for(let a = 0; a< 2*PI; a+=PI/6 ){
    push();
    rotate(a);
    circle(this.s*0.5,this.s*0.3, this.s*0.5);
    pop();
  }
  //face
  fill(0);
  circle(-this.s*0.3, 0, this.s*0.05);
  circle(this.s*0.3, 0, this.s*0.05);
  arc(0, 0,this.s*0.3, this.s*0.3, 0, PI);
  pop();

  }
  move(){
    this.x=width/2+50*cos(frameCount*0.01)
    this.y=height/2+50*sin(frameCount*0.01)
    this.s=map(sin(frameCount*0.1),-1,1,70,100)
  }
}
