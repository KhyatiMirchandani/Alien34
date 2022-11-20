
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var bg_img
var cannon, ground, slope
var angle
var canvas
var cannonBall
var balls = []
var aliens = []
var collisionSound


function preload(){
  bg_img = loadImage("SPACE.jpg") 
  collisionSound = loadSound("CollisonSound.wav")
}


function setup() {
  canvas= createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, { isStatic: true });
  World.add(world, ground);

  slope = Bodies.rectangle(300, 294, 600, 20, { isStatic: true });
  World.add(world, slope);

 cannon = new Cannon(590,490,130,100,angle);
 //cannonBall = new CannonBall(cannon.x,cannon.y);
 alien= new Alien(width-500, height-500, 100, 30, -80);
}


function draw() 
{
  background(51);
  image(bg_img,0,0,width,height);
  bg_img.velocityY=0.5
  Engine.update(engine)

  push();
  translate(ground.position.x, ground.position.y);
  fill("brown");
  rectMode(CENTER);
  rect(0, 0, width * 2, 1);
  pop();

  push();
translate(slope.position.x, slope.position.y);
rectMode(CENTER);
fill("white")
rect(slope.position.x, slope.position.y, 600, 20);
pop();

for (var i = 0; i < balls.length; i++) {
  showCannonBalls(balls[i], i);
  collisionWithAlien(i);
}
alien.display();
Matter.Body.setVelocity(alien.body,{x:-0.5,y:0})
 
  cannon.display();
 showAliens();
 
}

function collisionWithAlien(index){
  for (var i=0; i<aliens.length; i++){
  if(balls[index] !==undefined && aliens[i] !==undefined){
   var collision = Matter.SAT.collides(balls[index].body, aliens[i].body)

   if(collision.collided){
    aliens[i].remove(i)
  Matter.World.remove(world, balls[index].body)
  delete balls[index]
   }
  }
}
}


function keyPressed(){
  if (keyCode === DOWN_ARROW) {
   
  var cannonBall = new CannonBall (cannon.x,cannon.y);
  cannonBall.trajectory=[]
  balls.push(cannonBall);
 }
 }
 
 function showCannonBalls(ball,index){
   if (ball) {
     ball.display();
   
   if(ball.body.position.x >= width || ball.body.position.y >= height-50)
   {
     ball.remove(index)}
  }
}
 
 function keyReleased() {
   if (keyCode === DOWN_ARROW) {
     balls [balls.length - 1].shoot();
   }
  }



  function showAliens(){
    if (aliens.length>0){
      if(
       aliens[aliens.length-1]=== undefined || 
        aliens [aliens.length-1].body.position.x< width-100
      )
      {
       var positions = [-90,-50,-170,-100];
       var position = random(positions)
       var alien = new Alien(width,height-450,80,30,position);
        aliens.push(alien)
      } 
      for(var i=0;i<aliens.length;i++) {
          Matter.Body.setVelocity(aliens[i].body,{x:-0.5, y:0});
         
          aliens[i].display();
         var collision= Matter.SAT.collides(this.slope, aliens[i].body)
         //if (collision.collided){
          //if(!collisionSound.isPlaying()){
         //CollisionSound.play()
       // }
         isGameOver = true;
         gameOver();
        
        }
      } 
     
      else{
      var alien= new Alien(width,height-400,100,30,-40);
      aliens.push(alien);
    }
  } 
  
function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
      "https://www.shutterstock.com/image-illustration/green-alien-face-emoji-extraterrestrial-260nw-686680774.jpg", 
      imageSize: "150x150",
      confirmButtonText: "Play Again"
   },
    function(isConfirm) {
    if (isConfirm) {
        location.reload();
      }
    }
  );
}