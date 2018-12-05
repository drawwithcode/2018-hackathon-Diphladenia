var myImage;
var myImage2;
var myImage3;
var mybackground;
var mic;
var analyzer;
var volhistory = [];

function preload(){
  myImage = loadImage('./assets/Harry.png');
  myImage2 = loadImage('./assets/Hermione.png');
  myImage3 = loadImage('./assets/Ron.png');
  mybackground = loadImage('/assets/bgharry.png')
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
var volume = mic.getLevel();

//background image
push()
imageMode(CORNER);
backgroundImage(mybackground);
pop()

//magic sky
if (volume>0 && volume<0.3) {
  ellipse(random(width),random(height),volume*40);
}  else if (volume>0.3 && volume<0.6) {
  ellipse(random(width),random(height),volume*60);
}  else if (volume>0.6 && volume<1) {
  ellipse(random(width),random(height),volume*80);
}

//enchantment
  push();
  volhistory.push(volume);
  stroke(255,150);
  strokeWeight(random(0.1,0.5));
  noFill();

  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < 360; i++) {
  var r = map(volhistory[i]*10000, 0, 1, 300, 1000);
  var x = r * cos(i);
  var y = r * sin(i);
  vertex(x, y);
  }
  endShape();
  pop();

  imageMode(CENTER);
  //Hermione
  image(myImage2, width/2+volume, height/5-(volume*100), 300*0.4+volume*100, 388*0.4+volume*100);
  //Harry
  image(myImage, width/2+volume, height/2+volume, 300*0.4+volume*100, 388*0.4+volume*100);
  // //Ron
  image(myImage3, width/2+volume, 4*height/5+volume, 300*0.4+volume*100, 388*0.4+volume*100);

  //magia Ron
  push();
  translate(3*width/4-volume*10, 4*height/5+volume/2);
  scale(8*volume);
  rotate(radians(rotazione)*volume);
  ellipseMode(RADIUS);
  var cerchio = 100;
  var rotazione;
  for (var i=0; i<500; i ++) {
  cerchio = 100*volume + 50*sin(millis()*i);
  stroke(0,50);
  radius = map(cerchio*volume*100,10,200,3,1);
  fill(color,0,color*74);
  ellipse(cerchio*cos(i), cerchio*sin(i),radius);
  rotazione = rotazione+0.00005;
  }
  pop();

  // magia Hermione
  var volume = mic.getLevel();
  strokeWeight(2);
  rotate(volume/200);
  stroke(lerpColor(color(0), color(255,random(100,255)), frameCount*volume));
  noFill();
  ellipse(3*width/4-volume*10,height/6+volume*10,sin(frameCount)*volume*800,cos(frameCount)*volume*800);

  //magia Harry
  randomChord();
  randomChord();
  randomChord();
  }

//funzione magia Harry
function randomChord() {
  var volume = mic.getLevel();
  volume = map(volume,0,1,0,height);
  stroke(lerpColor(color(0), color(255), frameCount*volume));
  strokeWeight(random(0.5,1));

  var angle1 = random(0, 2 * PI);
  var xpos1 = (width/4-volume/2)+30 * cos(angle1)*volume/30;
  var ypos1 = (height/2-volume/2)+30 * sin(angle1)*volume/30;

  var angle2 = random(0, 2 * PI);
  var xpos2 = (width/4-volume/2)+20 * cos(angle2)*volume/40;
  var ypos2 = (height/2-volume/2)+20 * sin(angle2)*volume/40;

  var angle3 = random(0, 2 * PI);
  var xpos3 = (width/4-volume/2)+25 * cos(angle3)*volume/20;
  var ypos3 = (height/2-volume/2)+25 * sin(angle3)*volume/20;

  line(xpos1, ypos1, xpos2, ypos2);
  line(xpos1, ypos1, xpos3, ypos3);
  line(xpos2, ypos2, xpos3, ypos3);
}


function backgroundImage(mybackground) {
  push();
  translate(width/2,height/2);
  imageMode(CENTER);
  let scale = Math.max(width/mybackground.width,height/mybackground.height);
  image(mybackground,0,0,mybackground.width*scale,mybackground.height*scale)
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
