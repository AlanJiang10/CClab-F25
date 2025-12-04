let faceMesh;
let options = { maxFaces: 1, refineLandmarks: false, flipped: true };
let video;
let faces = [];
let x=0;
let y=0;

function preload() {
  faceMesh = ml5.faceMesh(options);
}

function setup() {
  let canvas = createCanvas(640, 480);
  canvas.parent("p5-canvas-container");
  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);
}


function draw() {
  background(220);
  push ();
  translate(width,0);
   scale(-1,1);
  image(video, 0, 0, width, height);
  pop ();
  circle(x,y,50);
  // Draw all the tracked face points
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];
    let p1=face.keypoints[13];
    let p2= face.keypoints[14];
    fill(0,255,0)
    noStroke();
      circle(p1.x,p1.y ,5);
      circle (p2.x,p2.y,5)
      let d=dist(p1.x,p1.y,p2.x,p2.y);
      // let op=map(d,0,50,0,255);
      // background(0,op)
      if(d>30){
      x=lerp(x,p1.x,0.1)
      y=lerp(y,p1.y,0.1)
      }
    // for (let j = 0; j < face.keypoints.length; j++) {
    //   let keypoint = face.keypoints[j];
    //   let d=dist(mouseX,mouseY,keypoint.x,keypoint.y);
      
    //   if(d<5){
    //   fill(0, 255, 0);
    //   text(j,keypoint.x,keypoint.y);
    //   }
    //   noStroke();
    //   circle(keypoint.x, keypoint.y, 5);
    // }
  }
}

// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}