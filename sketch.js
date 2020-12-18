var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,sideBody
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;


var side1, side2, side3;

function preload()
{
	helicopterIMG=loadImage("helicopter.png")
	packageIMG=loadImage("package.png")

}

function setup() {
	createCanvas(800, 700);
	rectMode(CENTER);
	


	side1=createSprite(width/2, height-40,200,20);
	side1.shapeColor="red";
	side2=createSprite(300, height-90,20,100);
	side2.shapeColor="red";
	side3=createSprite(500, height-90,20,100);
	side3.shapeColor="red";
	
	packageSprite=createSprite(200, 80, 10,10);
	packageSprite.addImage(packageIMG)
	packageSprite.scale=0.2
	packageSprite.visible=false;

	helicopterSprite=createSprite(200, 200, 10,10);
	helicopterSprite.addImage(helicopterIMG)
	helicopterSprite.scale=0.6

	groundSprite=createSprite(width/2, height-35, width,10);
	groundSprite.shapeColor=color(255)


	engine = Engine.create();
	world = engine.world;

	packageBody = Bodies.circle(200 , 200 , 5 , {restitution:0.4, isStatic:true});
	World.add(world, packageBody);

 

	sideBody1 = Bodies.rectangle(width/2,650,200,20,{isStatic:true});
	World.add(world, sideBody1);

	sideBody2 = Bodies.rectangle(300,610,20,100,{isStatic:true});
	World.add(world, sideBody2);

	sideBody3 = Bodies.rectangle(500,610,20,100,{isStatic:true});
	World.add(world, sideBody3);
	
   //Create a Ground
	ground = Bodies.rectangle(width/2, 650, width, 10  ,{isStatic:true});
 	World.add(world, ground);


	 Engine.run(engine);
	 
}


function draw() {
  
  rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x ;
  packageSprite.y= packageBody.position.y;


   if(packageSprite.isTouching(side1)||packageSprite.isTouching(side2)
       ||packageSprite.isTouching(side3)){
	   textSize(30);
	   fill("red");
	   text("You Delivered The Package!!",200,300);
   }

   if(packageSprite.isTouching(groundSprite)){
  
   textSize(30);
   fill("red");
   text("You didn't deliver the package",200,300);
}
  
  drawSprites();
  
  
}

function keyPressed() {
 if (keyCode === DOWN_ARROW) {
	translation={x:helicopterSprite.x,y:helicopterSprite.y}; 
	Matter.Body.setPosition(packageBody, translation);
	packageSprite.visible=true;
	Matter.Body.setStatic(packageBody,false); 
   }
	if(keyCode === RIGHT_ARROW){
		helicopterSprite.x=helicopterSprite.x+5;
	}
	if(keyWentDown("left")){
	  helicopterSprite.x=helicopterSprite.x-5;
  }
  
}
