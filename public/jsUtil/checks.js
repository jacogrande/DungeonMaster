var checkedRooms = [];
var failedPerceptionMessages = [
  "The only things that you find are cobwebs and a few dead insects.",
  "You find an unusually large dust bunny on the ground.",
  "You find a broken broomstick in the corner.",
  "Everything seems to be normal in here.",
  "Nothing sticks out to you.",
  "You can make out that you're in a room.",
  "You figure that you're in some sort of dungeon chamber."
]

function perceptionCheck(roll, player){
  var currentRoom = getCurrentVertice(testCharacter.xPos,testCharacter.yPos);
  currentRoom = currentRoom.pertanentRoom;
  for(var i = 0; i < checkedRooms.length; i++){
    if(currentRoom == checkedRooms[i]){
      write("You've already checked this room.");
      return false;
    }
  }
  write(player + " rolled a " + roll + " on their perception check.");
  checkedRooms.push(currentRoom);
  var currentData;
  var chestsFound = true;
  var trapsFound = true;
  // check through all room data
  // starts with chests
  currentData = currentRoom.getData().chests;
  var oneFound = false;
  for(var i = 0; i < currentData.length;i++){
    if(currentData[i].dc <= roll){
      for(var a = 0; a < allChests.length; a++){
        // console.log(allChests.pertanentRoom)
        if(allChests[a].pertanentRoom == currentRoom && allChests[a].getChestData().dc <= roll && allChests[a].getChestData().dc > testCharacter.passivePerception){
          allChests[a].find();
          oneFound = true;
        }
      }
    }
    else{
      if(oneFound == false && currentData[i].dc > 10){
        chestsFound = false;
      }
    }
  }
  if(currentData.length == 0){
    chestsFound = false;
  }

  // check for traps
  oneFound = false;
  for(var i = 0; i < allTraps.length;i++){
    if(allTraps[i].getPertanentRoom() === currentRoom){
      currentData = allTraps[i].getTrapData();
      if(currentData.find_type === "Perception" && currentData.find_dc <= roll){
        allTraps[i].find();
        oneFound = true;
      }
      else if(oneFound == false){
        trapsFound = false;
      }
    }
    else{
      if(oneFound == false){
        trapsFound = false;
      }
    }
  }
  if(allTraps.length == 0){
    trapsFound = false;
  }

  if(chestsFound === false && trapsFound === false){
    write(getTable(failedPerceptionMessages));
  }

}

function getDexCheck(){
  return Roll(20);
}

function getStrengthCheck(){
  return Roll(20);
}
