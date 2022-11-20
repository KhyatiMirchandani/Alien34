class Alien {
    constructor(x, y, width, height, alienPos,)
    {
      var options={
     restituition: 0.8,
     friction: 1.0,
     density: 1.0,
}
      this.body = Bodies.rectangle(x, y, width, height );
      this.width = width;
      this.height = height;
  
      this.image = loadImage("alien.png");
      this.alienPosition = alienPos;
      World.add(world, this.body);
    }
  
    remove(index){
      setTimeout(()=>{
        Matter.World.remove(world, aliens[index].body);
        delete aliens[index];
      },2000)
    }


    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, this.alienPosition, this.width, this.height);
      pop();
    }
  }