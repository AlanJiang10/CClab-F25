function setup() {
  let canvas=createCanvas(800, 500);
  canvas.parent("p5-canvas-container")
  //colorMode(HSB)
 //colorMode(HSB,100);
  
}

let H=50;
let currentH=150;
let h;
let x,y=0;
let r;
let coreR ;
//let s=0.01;
//let coreR = map(noise(frameCount*0.05),0,1,40,60);

function chaos(){
 push();
  fill(map(noise(frameCount*0.2),0,1,30,55))
 // fill(100)
  for(let x=0;x<=width;x+=40){
    for (let y=0;y<=height;y+=40){
      rectMode(CENTER);
      rect(x,y,40)
       
    }
  }
  pop();
}

function draw() {
  //background(220);
let currentX=width/2;
let currentY=height/2;
   noStroke();
  //drawCreature(x,y);
  //console.log(checkMouse)
  
if(checkMouse()){
  //background(220)
     chaos();
  currentX=lerp(currentX,width/2+150,0.05)
  x=lerp(currentX,map(sin(frameCount*0.05),-1,1,width/2-150,width/2+150),0.6);
  y=lerp(currentY,map(cos(frameCount*0.05),-1,1,height/2-100,height/2+100),0.6);
    r=lerp(170,230,0.5);
    p=random(0.98,1.02);
    coreR=map(sin(frameCount*0.05),-1,1,60,80);
 }else {
   drawNoiseBackground();
   x=width/2;
   y=height/2;
   r=170;
   coreR = map(noise(frameCount*0.01),0,1,40,60);
      
   if(checkKey()){
    push();
    translate(width/2,height/2);
    noFill() 
    stroke(120, 180, 235, 70  )
    strokeWeight(2);
      for (let i = 0; i < 10; i+=0.3) {
    let r = map(sin(frameCount * 0.01 + i), -1, 1, 200, 300);
    strokeWeight(2);
    ellipse(0, 0, r * 2);
    
  }pop();
}
   
  
  
   
 }
  drawCreature(x,y);
  
}

function drawNoiseBackground() {
  noStroke();
  let t = frameCount * 0.01;
  for (let y = 0; y < height; y += 10) {
    let c = map(sin(t + y * 0.02), -1, 1, 30, 80);
    fill(c);
    rect(0, y, width, 10);
    }
  
}

function drawCreature(x, y) {
  let p=1;
  push();
  translate(x, y);
  
   for(let a =0; a< TWO_PI; a+=PI/8){
    if(mouseIsPressed){
       
       currentH=lerp(currentH,H,0.003);
      fill(currentH);
      
       
     
 } else { 
      fill(map(noise(frameCount*0.02),0,1,130,190),map(noise(frameCount*0.02),-1,1,70,140),map(sin(frameCount*0.01),-1,1,100,170));         
    }
     
    //outer part
     push();

    let r = map(sin(frameCount*0.05), -1, 1, 50, 100);
    let x = 0+ 1.6*p*r*cos(a);
    let y = 0+ 1.6*p*r*sin(a);
     
   let offset = map(noise(frameCount*0.05),0,1,20,30);
    rotate(map(0.01*r*sin(frameCount*0.02),-1,1,0,2*PI));
    circle(x, y, offset*p);
     pop();
  }
  
  //arms
  push();
  beginShape();
  let lineLength = 65;
  fill(0);
  for (let i = -lineLength; i <= lineLength; i += lineLength / 5) {
    strokeWeight(2);
    let v = 5 * sin(frameCount * 0.1 - i);
    vertex(i, v);
     circle(i, v, 5);
  }
  endShape();
  
   beginShape();
  let LineLength=65
  fill(0);
  for (let i = -LineLength; i <= LineLength; i += LineLength / 5) {
    strokeWeight(2);
    //let v = 5 * sin(frameCount * 0.1 - i);
    let V =-5*sin(frameCount*0.1+i);
    vertex(V,i);
    circle(V,i,5);
    }
  endShape();
  pop();

    push();
  noStroke()
  fill(255);
  for(angle=0;angle<=2*PI;angle+=PI/4){
    rotate(angle);
    circle(20,0,35)
  }
  pop();
   //      
  noStroke();
for (let i = 0; i < 3; i+=0.5) {
  fill(130, 210, 205, 40 - i * 10);
  circle(0, 0, coreR + 50 + i * 20);
}
  
  //core

  fill(r,map(cos(frameCount * 0.03), -1, 1, 130, 140),map(noise(frameCount * 0.02), 0, 1, 120, 130)); 
  circle(0,0, coreR);
  fill(0);
   rotate(map(sin(frameCount*0.01),-1,1,-PI/2,PI/2))
  circle(0-30,0,8);
  circle(0+30,0,8);
  pop();
}

function checkMouse(){
 let d = dist(mouseX, mouseY,width/2,height/2);
  if (d < 100) {
    return true;
  } else {
    return false;
  }
}
function checkKey(){
 if (keyIsPressed) {
    return true;         
  } else {
    return false;
  }

  
  



}