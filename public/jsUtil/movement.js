function Char(xPos,yPos, allSprites){
  this.xPos = xPos;
  this.yPos = yPos;
  var mainColor = 'rgb(0,0,0)';
  var lockpicks = 3;
  var hp = 10;

  this.passivePerception = 5;

  function updateGui(){
    if(hp <= 0){
      document.getElementById("hpOuter").innerHTML = "You Died.";
    }
    else{
      document.getElementById("hpInner").innerHTML = hp;
    }
  }
  updateGui();

  this.takeDamage = function(quantity, type){
    hp = hp - quantity;
    updateGui();
  }

  this.heal = function(quantity){
    hp+=quantity;
    updateGui();
  }

  this.getHp = function(){
    return hp;
  }

  this.getLockpickCount = function(){
    return lockpicks;
  }

  this.addLockpicks = function(quantity){
    lockpicks+=quantity;
  }

  this.removeLockpicks = function(quantity){
    lockpicks = lockpicks - quantity;
  }

  this.setSprites = function(sArray){
    allSprites = sArray;
  }
  this.lastDirection = 2;

  var renderInc = 0;
  this.render = function(){
    // gCanvas.fillStyle = mainColor;
    // gCanvas.fillRect(this.xPos, this.yPos, 10,10);
    // renderInc+=0.05;
    // if(lastDirection == 0){ // up
    //   if(renderInc % 1 === 0){
    //     allSprites[0][this.lastDirection].draw(300, 300);
    //   }
    // }
    allSprites[this.lastDirection].draw(300, 300);
  }

  this.toString = ()=>{
    return JSON.stringify({
      xPos:xPos,
      yPos:yPos
    })
  }

}

var testCharacter = new Char((renderTopLeft[0]+Math.floor(scaledHeight/2))*scale,(renderTopLeft[1]+Math.floor(scaledHeight/2))*scale, testCharacterSprites);
var allCharacters = [testCharacter];


// character movement
var speed = 3;
var currentlyMoving=0;
var spacePressed = false;
var interaction;

var keyLock = false;

function updatePositions(){
  if(keyLock){
    return false;
  }
  var keyInput = keyboard.getKeys(); // gets active keys

  // interaction activation (space bar)
  if(keyInput[4] == true){
    if(spacePressed === false){
      spacePressed = true;
      interaction = interact(Math.floor(testCharacter.xPos/scale),Math.floor(testCharacter.yPos/scale));
    }
  }
  else{
    if(spacePressed === true){
      spacePressed = false;
    }
  }

  //directional orientation
  if(keyInput[0] === true && checkRoomBoundaries(testCharacter.xPos,testCharacter.yPos, 0)){ // up
    testCharacter.lastDirection = 0;
    if(keyInput[1] || keyInput[2] || keyInput[3]){ // modifying diagonal speed
      testCharacter.yPos-=speed/2;
      yOffset-=speed/2;
    }
    else{
      testCharacter.yPos-=speed;
      yOffset-=speed;
    }
    if(yOffset <= -scale){
      yOffset = yOffset+scale;
      renderTopLeft[1]-=1;
    }
  }
  if(keyInput[1] === true && checkRoomBoundaries(testCharacter.xPos,testCharacter.yPos, 1)){ // right
    testCharacter.lastDirection = 1;
    if(keyInput[0] || keyInput[2] || keyInput[3]){
      testCharacter.xPos+=speed/2;
      xOffset+=speed/2;
    }
    else{
      testCharacter.xPos+=speed;
      xOffset+=speed;
    }
    if(xOffset >= scale){
      xOffset = xOffset-scale;
      renderTopLeft[0]+=1;
    }
  }
  if(keyInput[2] === true && checkRoomBoundaries(testCharacter.xPos,testCharacter.yPos, 2)){ // down
    testCharacter.lastDirection = 2;
    if(keyInput[1] || keyInput[0] || keyInput[3]){
      testCharacter.yPos+=speed/2;
      yOffset+=speed/2;
    }
    else{
      testCharacter.yPos+=speed;
      yOffset+=speed;
    }
    if(yOffset >= scale){
      yOffset = yOffset-scale;
      renderTopLeft[1]+=1;
    }
  }
  if(keyInput[3] === true && checkRoomBoundaries(testCharacter.xPos,testCharacter.yPos, 3)){ // left
    testCharacter.lastDirection = 3;
    if(keyInput[1] || keyInput[2] || keyInput[0]){
      testCharacter.xPos-=speed/2;
      xOffset-=speed/2;
    }
    else{
      testCharacter.xPos-=speed;
      xOffset-=speed;
    }
    if(xOffset <= -scale){
      xOffset = xOffset+scale;
      renderTopLeft[0]=renderTopLeft[0]-1;
    }
  }
}


function getCurrentVertice(xPos, yPos){
  return vertices[Math.floor(xPos/scale)][Math.floor(yPos/scale)];
}

var lastRoom = null;

function checkRoomBoundaries(xPos,yPos,direction){
    var currentVertice = getCurrentVertice(xPos,yPos);
    for(var i = 0; i < allTraps.length; i++){
      if(currentVertice === allTraps[i].getTopLeft() && !allTraps[i].deactivated){
        // allTraps[i].activate();
        // var damage = allTraps[i].activate();
        activeTrap = allTraps[i];
        activeTrap.deactivated = true;
        keyLock = true;
        promptPlayer(allTraps[i].getTrapData().description + " Do you try to save yourself? (y or n)", function(){
          activeTrap.save();
        });
      }
    }
    var currentRoom = currentVertice.pertanentRoom;
    if(currentRoom instanceof Room == true && currentRoom != lastRoom){
      write(currentRoom.getData().description);
      if(!currentRoom.found){
        currentRoom.found = true;
        findDoorsInRoom(currentRoom);
        findChestsInRoom(currentRoom);
      }
      lastRoom = currentRoom;
    }
    else if(currentRoom instanceof Passageway == true && currentRoom != lastRoom){
      if(!currentRoom.found){
        currentRoom.found = true;
        findDoorsInRoom(currentRoom);
      }
    }
    // console.log(currentRoom.getTopLeft().getX());
    var currentTopLeft = currentRoom.getTopLeft();
    // console.log(yPos, currentTopLeft.getY());
    var currentDimensions = [currentRoom.getLength(),currentRoom.getHeight()];
    var currentDoor = checkForDoor(xPos, yPos);
    if(direction == 0){ // up
      if(yPos-5 < currentTopLeft.getY()){
        if(currentDoor && currentDoor.getState() == "open"){
          if(xPos > currentDoor.getTopLeft().getX() && yPos-5 < currentDoor.getTopLeft().getY()){
            if(vertices[Math.floor(xPos/scale)][Math.floor((yPos-5)/scale)-1].isActivated() == true){
              return true;
            }
          }
        }
        if(currentDoor &&  xPos > currentDoor.getTopLeft().getX() && yPos-5 < currentDoor.getTopLeft().getY()){
          currentDoor.describe();
        }
        return false;
      }
    }
    if(direction == 1){ // right
      if(xPos + scale/1.6 > currentTopLeft.getX() + currentDimensions[0]*scale){
        if(currentDoor && currentDoor.getState() == "open"){
          if(xPos+scale/1.6 > currentDoor.getTopLeft().getX() && yPos > currentDoor.getTopLeft().getY()){
            if(vertices[Math.floor(xPos/scale)+1][Math.floor((yPos-2)/scale)].isActivated() == true){
              return true;
            }
          }
        }
        if(currentDoor && xPos+scale/1.6 > currentDoor.getTopLeft().getX() && yPos > currentDoor.getTopLeft().getY()){
          currentDoor.describe();
        }
        return false;
      }
    }
    if(direction == 2){
      if(yPos+scale/1.6 > currentTopLeft.getY() + currentDimensions[1]*scale){
        if(currentDoor && currentDoor.getState() == "open"){
          if(xPos > currentDoor.getTopLeft().getX() && yPos+scale/1.6 > currentDoor.getTopLeft().getY()){
            if(vertices[Math.floor(xPos/scale)][Math.floor((yPos-2)/scale)+1].isActivated() == true){
              return true;
            }
          }
        }
        if(currentDoor && xPos > currentDoor.getTopLeft().getX() && yPos+scale/1.6> currentDoor.getTopLeft().getY()){
          currentDoor.describe();
        }
        return false;
      }
    }
    if(direction == 3){
      if(xPos - 5 < currentTopLeft.getX()){
        if(currentDoor && currentDoor.getState() == "open"){
          if(xPos-5 < currentDoor.getTopLeft().getX() && yPos > currentDoor.getTopLeft().getY()){
            if(vertices[Math.floor(xPos/scale)-1][Math.floor((yPos-5)/scale)].isActivated() == true){
              return true;
            }
          }
        }
        if(currentDoor && xPos-5 < currentDoor.getTopLeft().getX() && yPos > currentDoor.getTopLeft().getY()){
          currentDoor.describe();
        }
        return false;
      }
    }

    return true;
}

// checkRoomBoundaries(scale0,scale0, 0)
