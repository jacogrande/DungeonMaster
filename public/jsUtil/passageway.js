var allPassageways = [];
function Passageway(topLeft, length, height){
  allPassageways.push(this);

  this.found = false;

  var newV = vertices[topLeft[0]][topLeft[1]];

  this.getTopLeft = function(){
    return newV;
  }

  this.getLength = function(){
    return length;
  }

  this.getHeight = function(){
    return height;
  }

  this.getId = function(){
    return ["passageway", allPassageways.indexOf(this)];
  }

  // draws the room
  this.draw = function(){
    activateVertice(newV.getX()/scale, newV.getY()/scale, length, height, this);
    canvas.strokeStyle = 'rgb(50,25,25)';
    canvas.strokeRect(newV.getX()-xOffset-renderTopLeft[0]*scale,newV.getY()-yOffset-renderTopLeft[1]*scale,length*scale,height*scale);
  }

  this.toString = ()=>{
    return JSON.stringify({
      topLeft:topLeft,
      length:length,
      height:height
    })
  }

}

var connectionLength = 2;
function connectTwoRooms(parentRoom, childRoom, connectionPoint){
  var direction = connectionPoint[1];
  connectionPoint = connectionPoint[0];
  var newPassageway;
  var topLeft;
  // var xDif = parentRoom.getTopLeft().getX() - childRoom.getTopLeft().getX();
  // var yDif = parentRoom.getTopLeft().getY() - childRoom.getTopLeft().getY();
  // directional orientation
  if(direction === 0){ // up
    topLeft = [connectionPoint[0],connectionPoint[1]-connectionLength];
    if(isValid(topLeft,[1,2]) === true){
      newPassageway = new Passageway(topLeft,1,connectionLength);
      newPassageway.draw();
    }
  }
  else if(direction === 1){ // right
    newPassageway = new Passageway([connectionPoint[0],connectionPoint[1]],connectionLength,1);
    newPassageway.draw();
  }
  else if(direction === 2){ // down
    newPassageway = new Passageway([connectionPoint[0],connectionPoint[1]],1,connectionLength);
    newPassageway.draw();
  }
  else if(direction === 3){ // left
    newPassageway = new Passageway([connectionPoint[0]-connectionLength,connectionPoint[1]],connectionLength,1);
    newPassageway.draw();
  }
}
