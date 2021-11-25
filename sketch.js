//alocating all the variables
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

//loading all necessary images & animations
function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

//setting up canvas & sprites
function setup() {
  //creating the canvas
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  //creating doors, climbers, and invisible block a a group
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

  //creating ghost
  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

//displaying sprites and functions
function draw() {
  //tower is the background
  background("tower.png");

  //creating gmeplay function
  if (gameState === "play") {
    //left arrow instructions
    if (keyDown("left_arrow")) {
      ghost.x = ghost.x-3;
    }

    //right arrow instructions
    if (keyDown("right_arrow")) {
      ghost.x = ghost.x+3;
    }

    //space bar instructions
    if (keyDown("space")) {
      ghost.velocityY = -10;
    }

    //applying gravity to ghost
    ghost.velocityY=ghost.velocityY+0.8;
    if(tower.y > 400){
      tower.y = 300
    }

    //spawnig doors group
    spawnDoors();

    //the ghost can rest on top of climbers
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }

    //invisible blocks hurt and destroy the ghost
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600) {
      ghost.destroy();
      gameState = "end";
    }
  }
  
  //displaying all images
  drawSprites();

  //displaying "game over" message
  if (gameState === "end") {
    stroke("yellow");
    fill ("red");
    textSize(30);
    text("game over", 230, 250);
  }
}

//spawning all the doors, climbes, and invisible blocks
function spawnDoors() {
  //the doors climbers, and invisible blocks spawn evey 240 frmes
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;

    //they spawn in positions aligned with themselves
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
 
    //displaying images for the door and climber
    //invisible block is invisible so we don't need to display
    door.addImage(doorImg);
    climber.addImage(climberImg);

    //how fast the doors, climbers, and invisible blocks travel
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    //assign lifetime to the variable
    door.lifetime = 800;
    
    //adjust the depth
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    //add each door to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true;
  }
}