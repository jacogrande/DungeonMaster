var activeDoor = null;
function interact(xPos,yPos){
  var currentVertice;

  // check chests
  for(var i = 0; i < allChests.length; i++){
    currentVertice = allChests[i].getTopLeft();
    var activeChest = null;
    if(currentVertice.getX()/scale == xPos && currentVertice.getY()/scale == yPos && allChests[i].found){
      if(allChests[i].getState() == "closed"){
        if(activeChest == null){
          activeChest = i;
        }
        if(allChests[i].found == false){
          allChests[i].find();
        }
        else{
          // write(allChests[i].getChestData().description);
          allChests[i].writeDescription();
        }
        promptPlayer("Do you open the chest? (y or n)", function(){eval("allChests[activeChest]").setState("open")});
        break;
        // allChests[i].setState("open");
      }
    }
  }

  // check doors first
  for(var i = 0; i < allDoors.length; i++){
    // console.log(allDoors[i].getTopLeft().getX()/scale, allDoors[i].getTopLeft().getY()/scale);
    currentVertice = allDoors[i].getTopLeft();
    if(currentVertice.getX()/scale == xPos && currentVertice.getY()/scale == yPos){
      if(allDoors[i].getState() == "closed"){
        write("You successfully open the door.");
        allDoors[i].setState("open");
        return allDoors[i];
      }
      else if(allDoors[i].getState() == "open"){
        allDoors[i].setState("closed");
        return allDoors[i];
      }
      else if(allDoors[i].getState() == "locked"){
        if(activeDoor == null){
          activeDoor = i;
        }
        promptPlayer("Do you try to open the door? (y or n)", function(){
          promptPlayer("Do you try to pick it open, or do you try to break it open? (pick or break)",function(response){
            if(response == "pick"){
              // dex roll
              if(testCharacter.getLockpickCount() > 0){
                var roll = getDexCheck();
                write("You rolled a " + roll + " on your sleight of hand (dex) check.");
                if(roll >= allDoors[activeDoor].getDescription().lockpick_dc){
                  write("You deftly pick the lock.");
                  allDoors[activeDoor].setState("open");
                }
                else{
                  testCharacter.removeLockpicks(1);
                  write("You fail to pick the lock, and you break a lockpick in the process." + "\nYou have " + testCharacter.getLockpickCount() + " lockpicks left.");
                }
              }
              else{
                write("You are out of lockpicks.");
              }
            }
            else if(response == "break"){
              // strength roll
              var roll = getStrengthCheck();
              write("You rolled a " + roll + " on your athletics (strength) check.");
              if(roll >= allDoors[activeDoor].getDescription().strength_dc){
                write("With a loud crash, you manage to break the door off of its hinges, watching as splintered wood falls down to your feet.");
                allDoors[activeDoor].setState("open");
              }
              else{
                allDoors[activeDoor].breakAttempts+=1;
                testCharacter.takeDamage(allDoors[activeDoor].breakAttempts,"bludgeoning");
                write("You slam against the door with all of your might, but it's not enough, and you end up taking " + allDoors[activeDoor].breakAttempts + " point of bludgeoning damage." + "\n You are at " + testCharacter.getHp() + " hitpoints.");
              }
            }
            activeDoor=null;
          });
        });
      }
    }
  }


}
