var END;
var PLAY;
var gameState = 1;
var monkey, monkey_running
var ground;
var banana, bananaImage, obstacle, obstacleImage
var food;
var FoodGroup, obstacleGroup
score = 1;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}

function setup() {
  createCanvas(530, 365);

  monkey = createSprite(80, 260, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(260, 340, 600, 100);
  ground.velocityX = -5;
  ground.x = ground.width / 2;
  console.log(ground.x);

  invisibleGround = createSprite(260, 340, 600, 100);

  FoodGroup = new Group();
  ObstacleGroup = new Group();
}

function draw() {
  background("blue");


  if (keyDown("space") && monkey.y >= 230) {
    monkey.velocityY = -13;
  }

  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);

  text("Score : " + score, 265, 50);

  if (monkey.isTouching(FoodGroup)) {
    FoodGroup.destroyEach();
    score = score + 1;
  }

  FOOD();
  OBSTACLE();

  if (monkey.isTouching(ObstacleGroup)) {
    ObstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    score = 0;
  }

  drawSprites();
}

function FOOD() {

  if (frameCount % 80 === 0) {
    food = createSprite(530, 260, 20, 20);
    food.y = Math.round(random(120, 200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -5;
    food.setLifetime = 150;

    FoodGroup.add(food);
  }

}

function OBSTACLE() {

  if (frameCount % 360 === 0) {
    obstacle = createSprite(530, 270, 20, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.setLifetime = 150;

    ObstacleGroup.add(obstacle);

  }
}