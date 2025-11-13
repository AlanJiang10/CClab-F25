let osc,envelope;
let n=30;
let b=[];
function setup() {
  let canvas = createCanvas(500,800);
  for(let i=0;i<n;i++){
    b[i]=new Bubble();
  }
  
 // canvas.parent("p5-canvas-container");
 // osc=new p5.TriOsc();//sin.Osc,SqrOsc,SawOsc
 // envelope=new p5.Env();
 // envelope.setADSR(0.01,0.5,0.1,0.5)
  
}

function draw() {
  background(0,0,255)
  for(let i=0;i<b.length;i++){
    b[i].update();
    b[i].display();
    b[i].playSound();
    
  }for(let i=b.length;i>=0;i--){
    if(b[i].isOut()){
      b.splice(i,1);
    }

  }
  if(mouseIsPressed){
    b.push(new Bubble(mouseX,mouseY));
  }
}
 
 class Bubble{
  constructor(x,y){
    this.x=x;
    this.y=y;
    this.s=random(5,50);
    this.speedY=map(this.s,5,50,5,1)
    this.osc=new p5.TriOsc();
     this.env =new p5.Env()
    let t1=0.01;
    //attack time in sec.
    let t2=0.05;//attack level 0.0 to 1.0
    let t3=0.3;//decay time in sec
    let t4=0.01;//decay level 0.0 to 1.0
    this.env.setADSR(t1,t2,t3,t4);
   
    this.f=map(this.s,5,50,1500,40)
    this.osc.freq(this.f);

  }
  display(){
    fill(255,100)
    noStroke();
    circle(this.x,this.y,this.s)


  }
  update(){
   this.y-=this.speedY

  }
  playSound(){
    if(this.y < this.s/2){
      this.osc.start()      ;
      this.env.play(this.osc);
    }
  }
   isOut(){
    if (this.y<this.s/2){
      return true;

    }else{
      return false;
    }
   }
 }