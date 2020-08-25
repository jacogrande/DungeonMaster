// validity checker (for new rooms)
// only works for boundaries (currently)
var validityCount = 0;

var invalidDirCount = 0;
function boxCheck(topLeft, parentRoom){

  var newRoomData = getTable(chambers);
  // var roll = getTable(startingAreaTable);
  var roll = newRoomData.rolls[Math.floor(Math.random()*newRoomData.rolls.length)];

  // define offsets
  var xPos = topLeft[0][0];
  var yPos = topLeft[0][1];
  // xPos = 3;
  // yPos = 1;

  // define centering table
  var centerEq = [Math.floor(roll[0]/2),Math.floor(roll[1]/2)];
  // defines modifier table for directional orientation
                          // up                     // right            // down           // left
  var topLeftModifiers = [[-centerEq[0],-roll[1]-2], [2, -centerEq[1]], [-centerEq[0],2], [-roll[0]-2, -centerEq[1]]];
  // sets direction
  // var direction = topLeft[1];
  var direction = topLeft[1];

  // orientation (draws from the modifiers based on the given direction)
  xPos+= topLeftModifiers[direction][0];
  yPos += topLeftModifiers[direction][1];

  // checks each vertice to see if it's outside of the map boundaries
  for(var y = 0; y < roll[1]; y++){
    for(var x = 0; x < roll[0]; x++){
      if(invalidDirCount >= 4){
        invalidDirCount = 0;
        return "invalid";
      }
      if(xPos+x < 0 || xPos+x >= mapWidth || yPos+y < 0 || yPos+y >= mapHeight){
        invalidDirCount++;
        return boxCheck(parentRoom.getConnection(getRandom(4,direction)), parentRoom);
      }
      else{
        if(vertices[xPos+x][yPos+y].isActivated()){
          invalidDirCount++;
          return boxCheck(parentRoom.getConnection(getRandom(4,direction)), parentRoom);
        }
      }
    }
  }
  invalidDirCount = 0;
  return [roll,direction, newRoomData];
}

function isValid(topLeft, dimensions){
  for(var y = 0; y < dimensions[1]; y++){
    for(var x = 0; x < dimensions[0]; x++){
      if(vertices[topLeft[0]+x][topLeft[1]+y].isActivated()){
        return false;
      }
    }
  }
  return true;
}

// random number generator
function getRandom(max, exclusion){
  var random = Math.floor(Math.random()*max);
  if(random === exclusion) return getRandom(max, exclusion);
  else return random;
}
