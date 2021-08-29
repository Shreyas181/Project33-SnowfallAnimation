const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
  
var engine, world;
var backgroundImg;

var boy, boyImg1, boyImg2;
var snow, snowArray=[];

var jumpSound;

var invisibleGround, invisibleWall1, invisibleWall2;

function preload(){
  backgroundImg = loadImage("snow1.jpg");
  boyImg1 = loadImage("Boy1.jpg");
  boyImg2 = loadImage("Boy2.jpg");
  jumpSound = loadSound("sound1.mp3");
  gameOver = loadSound("collided sound.wav");
}
function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  boy = createSprite(200,500)
  boy.addAnimation("boy_MovingRight",boyImg2);
  boy.addAnimation("boy_MovingLeft", boyImg1);
  boy.scale = 1.5;

  invisibleGround = createSprite(600,600,1200,10);
  invisibleGround.visible = false;

  invisibleWall1 = createSprite(1200,300,10,600);
  invisibleWall1.visible = false;

  invisibleWall2 = createSprite(5,300,5,600);
  invisibleWall2.visible = false;
  
  if(frameCount%20 === 0){
    snow = new Snow(random(10,width-10), random(40,50), 60, 60);
    snowArray.push(snow);
  }

}

function draw() {
  background(backgroundImg);  
  for(var i = 0; i<snowArray.length; i++){
    snowArray[i].display();
  }

  if(keyDown("space")&& boy.y>520) {
    jumpSound.play();
    boy.velocityY = -16;
  }

 if(snowArray.isTouching(boy)){
   gameOver.play();
   snowArray.destroyEach();
  }

  boy.velocityY = boy.velocityY + 0.8

  boy.collide(invisibleGround);
  boy.collide(invisibleWall1);
  boy.collide(invisibleWall2);

  drawSprites();
}

function keyPressed() {
  if(keyIsDown(LEFT_ARROW)){
    boy.velocityX -= 5;
    boy.changeAnimation("boy_MovingLeft", boyImg1);
}
  else if(keyIsDown(RIGHT_ARROW)){
    boy.velocityX += 5;
    boy.changeAnimation("boy_MovingRight", boyImg2);
}
}