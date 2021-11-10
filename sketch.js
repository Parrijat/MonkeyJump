var play = 1;
var end = 0;
var gameState = play;

var survTime, score = 0;

var monkey , monkey_running;
var banana ,bananaImage; 
var obstacle, obstacleImage;
var foodGroup, obstacleGroup;

var ground, bgImg;

var counter=2;

function preload(){
  
  
  monkey_running =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  bgImg = loadImage("jungle.jpg");
  
  foodGroup = new Group();
  obstacleGroup = new Group();
 
}



function setup() {
  
  
monkey = createSprite(100, 360, 30, 30);
monkey.addAnimation("moving", monkey_running);
monkey.scale = 0.1
    
ground = createSprite(400,390,900,10);
ground.velocityX = -4;
ground.x = ground.width/2;
ground.visible = false;

}


function draw() {
  createCanvas (600,500)
  


  
    
  if (gameState === play){
    
  survTime = Math.ceil(frameCount/frameRate())
  text("Survival Time : " + survTime, 100, 50);
    
    background(bgImg);
if(ground.x > 0){
  ground.x = ground.width/2;
}
    
    if(keyDown("space") && monkey.y >= 310){
      monkey.velocityY = -17
    }
monkey.velocityY = monkey.velocityY + 0.8;
    
    monkey.collide(ground);

    
    food();  
    obstacles();
    
    if(foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      monkey.scale+=0.02;
      score+=2
    }
    
    if(obstacleGroup.isTouching(monkey)){
      monkey.scale = 0.1
      counter = counter-1 ;
    }
     if(counter === 0 && obstacleGroup.isTouching(monkey)){
        gameState = end;
      }
    drawSprites();
  }
  else if(gameState === end){
    text("GAME OVER", 300, 250)
  }
    
  
  
}
function food(){
  if(frameCount%80 === 0){
    banana = createSprite(499, 300, 10, 10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = -4
    
    banana.lifetime = 120;
    foodGroup.add(banana)
  }

}

function obstacles(){
  if(frameCount%300 === 0){
    obstacle = createSprite(499, 360, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1
    obstacle.velocityX = -4
    
   banana.lifetime = 120;
   obstacleGroup.add(obstacle);
  }

}
