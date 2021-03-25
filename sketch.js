var intro, introImg;
var	bg1, bg1Img;
var girl, girlImg;
var witch, witchImg;

var blue, blueImg, blueGroup;
var green, greenImg, greenGroup;

var gameover, gameoverImg;

var gameState = "START";
var score = 0;

function preload()
{
	introImg = loadImage("images/bgs/intro.png");
	bg1Img = loadImage("images/bgs/bg1.png");
																	
	girlImg = loadImage("images/girl.png");
	witchImg = loadImage("images/witch.png");

	blueImg = loadImage("images/portions/blue.png");
	greenImg = loadImage("images/portions/green.png");

	gameoverImg = loadImage("images/gameover.png");
}

function setup() 
{
	createCanvas(1535, 750);

	intro = createSprite(767, 375, 1530, 750);
	intro.addImage(introImg);
	intro.scale = 0.8;

	bg1 = createSprite(767, 375, 1535, 750);
	bg1.addImage(bg1Img);
	bg1.visible = false;

	girl = createSprite(770, 250, 50, 50);
	girl.addImage(girlImg);
	girl.scale = 1.5;
	girl.visible = false;
	girl.setCollider("rectangle", 0, 0, 25, 100);

	witch = createSprite(767, 600, 50, 50);
	witch.addImage(witchImg);
	witch.scale = 0.5;
	witch.visible = false;
	witch.setCollider("rectangle", 0, 0, 50, 50);

	gameover = createSprite(767, 375, 1535, 750);
	gameover.addImage(gameoverImg);
	gameover.visible = false;

	greenGroup = new Group();
	blueGroup = new Group();
}


function draw() 
{
	background(0);
  
	if(gameState === "START")
	{
		intro.visible = true;
		gameover.visible = false;

		if(mousePressedOver(intro))
		{
			intro.visible = false;
			gameState = "PLAY";
			girl.y = 250;
			bg1.y = 375;
		}
		score = 0;
	}

	if(gameState === "PLAY")
	{
		spawnBlue();
		spawnGreen();

		witch.visible = true;
		witch.y = 600;

		bg1.visible = true;
		bg1.velocityY = -1;
		if(bg1.y === 360)
		{
			bg1.y = 400;
		}

		girl.visible = true;
		girl.velocityY = -1;
		if(girl.y === 235)
		{
			girl.y = 275;
		}

		if(keyDown("RIGHT_ARROW"))
		{
			girl.x = girl.x + 2
		}
		if(keyDown("LEFT_ARROW"))
		{
			girl.x = girl.x - 2
		}

		if(girl.isTouching(blueGroup))
		{
			score = score + 1;
			witch.y = 600;
		}
		
		if(girl.isTouching(greenGroup))
		{
			witch.y = girl.y;
			score = score - 1;
		}

		if(score === -10)
		{
			gameState = "END";
		}	
	}

	if(gameState === "END")
	{
		gameover.visible = true;

		bg1.visible = false;
		girl.visible = false;
		witch.visible = false;

		blueGroup.destroyEach();
		blueGroup.setVelocityYEach(0);
		greenGroup.destroyEach();
		greenGroup.setVelocityYEach(0);
		if(mousePressedOver(gameover))
		{
			gameState = "START";
		}
		
	}
	
  	drawSprites();

	fill("white");
	stroke("white");
	textSize(35);
	text("Life: " + score, 150, 50)
}

function spawnBlue()
{
	if(frameCount % 100 === 0)
		{
			blue = createSprite(random(0, 1535), random(60, 660), 5, 5);
			blue.addImage(blueImg);
			blue.scale = 0.3;
			blue.velocityY = 2;
			blue.setCollider("circle", 0, 0, 25);
			blueGroup.add(blue);
		}
}

function spawnGreen()
{
	if(frameCount % 100 === 0)
		{
			green = createSprite(random(0, 1535), random(60, 660), 5, 5);
			green.addImage(greenImg);
			green.scale = 0.3;
			green.velocityY = 2;
			green.setCollider("circle", 0, 0, 25);
			greenGroup.add(green);
		}
}
function hasCollided(lgirl, lportion)
{
  if( 	(lgirl.x - lportion.x) <= (lgirl.width/2 + lportion.width/2) && 
  		(lportion.x - lgirl.x) <= (lportion.width/2 + lgirl.width/2) && 
  		(lgirl.y - lportion.y) <= (lgirl.height/2 + lportion.height/2) && 
  		(lportion.y - lgirl.y) <= (lportion.height/2 + lgirl.height/2))
   {
		return true;
   }
}