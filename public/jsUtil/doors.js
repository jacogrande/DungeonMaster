var allDoors = [];

function Door(doorData, description, pertanentRoom){
  var topLeft = vertices[doorData[0]][doorData[1]];
  var direction = doorData[2];

  var state = description.state;
  var link = null;
  var described = false;
  this.breakAttempts = 0;
  this.found = false;

  if(pertanentRoom instanceof Array){
    if(pertanentRoom[0] == "room"){
      pertanentRoom = allRooms[pertanentRoom[1]];
    }
    else{
      pertanentRoom = allPassageways[pertanentRoom[1]];
    }
  }


  this.getTopLeft = function(){
    return topLeft;
  }

  this.setLink = function(linkedDoor){
    link = linkedDoor;
  }

  this.getId = function(){
    return allDoors.indexOf(this);
  }

  this.getDirection = function(){
    return direction;
  }

  this.getState = function(){
    return state;
  }

  this.getDescription = function(){
    return description;
  }

  this.getPertanentRoom = function(linked){
    if(linked){
      return pertanentRoom;
    }
    else{
      if(link){
        return [pertanentRoom, link.getPertanentRoom(true)];
      }
      else{
        return pertanentRoom;
      }
    }
  }

  this.describe = function(){
    if(described == false){
      write(description.description);
      described = true;
    }
  }

  this.resetDescription = function(){
    described = false;
  };

  this.setState = function(newState, linked){
    if(linked === true){
      state = newState;
      this.draw(direction);
    }
    else{
      state = newState;
      this.draw(direction);
      if(link){
        link.setState(state, true);
      }
    }
  }

  this.draw = function(dir){
    if(state == "closed"){
      canvas.fillStyle = 'rgb(125,25,75)';
    }
    else if(state == "locked"){
      canvas.fillStyle = 'rgb(255,25,75)';
    }
    else if(state == "open"){
      canvas.fillStyle = 'rgb(255,255,200)';
    }
    // directional orientation for drawing
    if(dir == 0){ // up
      canvas.fillRect(topLeft.getX()-xOffset-renderTopLeft[0]*scale,topLeft.getY()-yOffset-renderTopLeft[1]*scale,scale,5);
    }
    else if(dir == 1){ // right
      canvas.fillRect(topLeft.getX()+scale-2-xOffset-renderTopLeft[0]*scale,topLeft.getY()-yOffset-renderTopLeft[1]*scale,5,scale);
    }
    else if(dir == 2){ // down
      canvas.fillRect(topLeft.getX()-xOffset-renderTopLeft[0]*scale,topLeft.getY()-yOffset+scale-renderTopLeft[1]*scale,scale,5);
    }
    else if(dir == 3){ // left
      canvas.fillRect(topLeft.getX()-xOffset-renderTopLeft[0]*scale,topLeft.getY()-yOffset-renderTopLeft[1]*scale,5,scale);
    }
  }

  this.toString = () => {
    // let verticeString = topLeft.toString();
    return JSON.stringify({
      doorData:doorData,
      description:description,
      pertanentRoom:pertanentRoom.getId(),
      link:link.getId()
    });
  }

}


function findDoorsInRoom(room){
  for(var i = 0; i < allDoors.length;i++){
    // console.log(allDoors[i].getPertanentRoom()[0].getId());
    if(allDoors[i].getPertanentRoom()[0] === room){
      allDoors[i].found = true;
    }
  }
}

function checkRoomForDoor(room){
  var topLeft = room.getTopLeft();
  topLeft = [topLeft.getX()/scale, topLeft.getY()/scale];
  var dimensions = [room.getLength(), room.getHeight()];
  var doors = [];
  var description;
  // checks each side and returns the location of the door and the direction
  // check the top row
  if(topLeft[1]-1 > 0){
    for(var i = 0; i < dimensions[0]; i++){
      if(vertices[topLeft[0]+i][topLeft[1]-1].isActivated()){
        doors.push([[topLeft[0]+i,topLeft[1],0],[topLeft[0]+i,topLeft[1]-1,2],room]);
        i = dimensions[0];
      }
    }
  }
  // check the right row
  if(topLeft[0]+1 < mapWidth){
    for(var i = 0; i < dimensions[1];i++){
      if(vertices[topLeft[0]+dimensions[0]][topLeft[1]+i].isActivated()){
        doors.push([[topLeft[0]+dimensions[0]-1,topLeft[1]+i,1],[topLeft[0]+dimensions[0],topLeft[1]+i,3],room]);
        i = dimensions[1];
      }
    }
  }
  // check for bottom row
  if(topLeft[1]+1<mapHeight){
    for(var i = 0; i < dimensions[0];i++){
      if(vertices[topLeft[0]+i][topLeft[1]+dimensions[1]].isActivated()){
        doors.push([[topLeft[0]+i,topLeft[1]+dimensions[1]-1,2],[topLeft[0]+i,topLeft[1]+dimensions[1],0],room]);
        i = dimensions[0];
      }
    }
  }
  // check the left row
  if(topLeft[0]-1>1){
    for(var i = 0; i < dimensions[1];i++){
      if(vertices[topLeft[0]-1][topLeft[1]+i].isActivated()){
        doors.push([[topLeft[0],topLeft[1]+i,3],[topLeft[0]-1,topLeft[1]+i,1],room]);
        i = dimensions[1];
      }
    }
  }

  return doors;
}

function checkForDoor(xPos, yPos){
  for(var i = 0; i < allDoors.length; i++){
    currentVertice = allDoors[i].getTopLeft();
    if(currentVertice.getX()/scale == Math.floor(xPos/scale) && currentVertice.getY()/scale == Math.floor(yPos/scale)){
      return allDoors[i];
    }
  }
}


function findDoors(){
  var doorCheck;
  var description;
  var door1;
  var door2;
  for(var i = 0; i < allRooms.length;i++){
    doorCheck = checkRoomForDoor(allRooms[i]);
    if(doorCheck.length > 0){
      for(a = 0; a < doorCheck.length; a++){
        description = doorTypes[Math.floor(Math.random()*doorTypes.length)];
        door1 = new Door(doorCheck[a][0],description, doorCheck[a][2]);
        door2 = new Door(doorCheck[a][1],description, doorCheck[a][2]);
        door1.setLink(door2);
        door2.setLink(door1);
        allDoors.push(door1);
        allDoors.push(door2);
      }
    }
  }
}


function filterDoors(){
  var filledVertices = [];
  var removeList = [];
  for(var i = 0;i < allDoors.length; i++){
    for(var a = 0; a < filledVertices.length; a++){
      if(allDoors[i].getTopLeft() == filledVertices[a]){
        removeList.push(allDoors[i]);
        break;
      }
    }
    filledVertices.push(allDoors[i].getTopLeft());
  }
  for(var i = 0; i < removeList.length; i++){
    allDoors.splice(allDoors.indexOf(removeList[i]),1);
  }
  for(var i = 0; i < allDoors.length; i++){
    allDoors[i].draw(allDoors[i].getDirection());
  }
}
