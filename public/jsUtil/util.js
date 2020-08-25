function getTable(array, exclusion){
  var rando = Math.floor(Math.random()*array.length);
  if(rando == array.indexOf(exclusion)){
    return getTable(array, exclusion);
  }
  return array[Math.floor(Math.random()*array.length)];
}

function Roll(max){
  return Math.floor(Math.random()*max+1);
}

function activateVertice(originalX, originalY, xAddend, yAddend, room){
  vertices[originalX][originalY].activate(room);
  for(var y = 0; y < yAddend;y++){
    vertices[originalX][originalY+y].activate(room);
    for(var i = 1; i < xAddend; i++){
      vertices[originalX+i][originalY+y].activate(room);
    }
  }
}

var maxSteps = 24;
var roomCount = 1;

// creation process (takes the connection point, the new room object, and the amount of child rooms)
function createRoom(connection, newRoom, expansionCount, parentRoom){
  // directional orientation
  var dimensions = [newRoom.getLength(), newRoom.getHeight()];
  var centerEq = [Math.floor(dimensions[0]/2),Math.floor(dimensions[1]/2)];

  if(connection[1] === 0){ // up *******************************************************************************************
    // border fixing through box based validity check
    newRoom.setTopLeft(vertices[connection[0][0]-centerEq[0]][connection[0][1]-dimensions[1]-2]);
  }

  else if(connection[1] === 1){ // right ***********************************************************************************
    // border fixing through box based validity check
    newRoom.setTopLeft(vertices[connection[0][0]+2][connection[0][1]-centerEq[1]]);
  }

  else if(connection[1] === 2){ // down ***********************************************************************************
    // border fixing through box based validity check
    newRoom.setTopLeft(vertices[connection[0][0]-centerEq[0]][connection[0][1]+2]);
  }

  else if(connection[1] === 3){ // left ***********************************************************************************
    // border fixing through box based validity check
    newRoom.setTopLeft(vertices[connection[0][0]-dimensions[0]-2][connection[0][1]-centerEq[1]]);
  }
  newRoom.draw();
  newRoom.populate();
  connectTwoRooms(parentRoom, newRoom, connection);

  // reiterate room creation
  roomCount++;
  if(roomCount<maxSteps){
    for(i = 0; i < expansionCount; i++){
      connectRoom(newRoom);
    }
  }
}

// connection process
function connectRoom(parentRoom){
  var connection = findDirection(parentRoom);
  // break catcher
  if(connection == "invalid"){
    return false;
  }
  var roll = connection[1];
  createRoom(connection[0], new Room(vertices[0][0],roll[0],roll[1],connection[2]), roll[2], parentRoom);
}

// direction finder
function findDirection(parentRoom){
  var connection = parentRoom.connect();
  // directional orientation
  // check the validity of placement in each direction
  // check validity of a square with distance away from the connection point equal to its height + 2 (passageway)
  // checkValidity(direction, size, connection)
  // centering table
  var roll = getTable(chambers);
  validityCount = 0;

  var validity = boxCheck(connection, parentRoom);

  // validity = 1;
  if(validity != "invalid"){
    connection = parentRoom.getConnection(validity[1]);
    return [connection, validity[0], validity[2]];
  }
  else{
    return "invalid";
  }
}

function findUsableSpace(){
  var randomX = Math.floor(Math.random()*mapWidth);
  var randomY = Math.floor(Math.random()*mapHeight);
  if(vertices[randomX][randomY].isActivated() == false){
    return findUsableSpace();
  }
  else{
    return vertices[randomX][randomY];
  }
}

function findSpaceInRoom(room,array){
  var randomX = Math.floor(Math.random()*room.getLength());
  var randomY = Math.floor(Math.random()*room.getHeight());
  if(array){
    for(var i = 0; i < array.length; i++){
      if(array[i].getTopLeft() == vertices[room.getTopLeft().getX()/scale+randomX][room.getTopLeft().getY()/scale + randomY]){
        return findSpaceInRoom(room);
      }
    }
  }
  return vertices[room.getTopLeft().getX()/scale+randomX][room.getTopLeft().getY()/scale + randomY];
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
