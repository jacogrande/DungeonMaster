var allTraps = [];

var activeTrap;

function Trap(topLeft, trapData, pertanentRoom){
  this.found = false;
  allTraps.push(this);
  this.deactivated = false;

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
  this.getPertanentRoom = function(){
    return pertanentRoom;
  }
  this.getTrapData = function(){
    return trapData;
  }

  this.find = function(){
    this.found = true;
    write(trapData.trap_hint);
    this.giveDisableOpportunity();
    this.draw();
  }

  this.activate = function(){
    var damageType = trapData.damage.split("d");
    var totalDamage = 0;
    for(var i = 0; i < parseInt(damageType[0]); i++){
      totalDamage += Roll(parseInt(damageType[1]));
    }
    this.found = true;
    this.deactivated = true;
    return totalDamage;
  }

  this.save = function(){
    var roll = Roll(20);
    write("Player1 rolled a " + roll + " on their " + trapData.save_type + " check.");
    if(roll >= trapData.save_dc){
      write(trapData.save_description);
    }
    else{
      var damage = this.activate();
      write("Player1 failed their save, and you activate the trap, taking " + damage + " point of damage.");
      testCharacter.takeDamage(damage);
    }
    keyLock = false;
  }

  this.giveDisableOpportunity = function(){
    activeTrap = this;
    promptPlayer("Would you like to attempt to disable the trap? (y or n)",function(){
      var roll = Roll(20);
      write("Player1 rolled a " + roll + " on their " + activeTrap.getTrapData().deactivate_type + " check.");
      if(roll >= activeTrap.getTrapData().deactivate_dc){
        activeTrap.deactivated = true;
        write(activeTrap.getTrapData().trap_hint + " You successfully disable the trap.");
      }
      else{
        promptPlayer("While trying to deactivate this trap, you accidentally trigger it. Would you like to try to save yourself? (y or n)",function(){
          activeTrap.save();
        });
      }
    });
  }

  this.draw = function(){
    canvas.fillStyle = "rgb(200,200,200)";
    canvas.fillRect(topLeft.getX()-xOffset-renderTopLeft[0]*scale+2, topLeft.getY()-yOffset-renderTopLeft[1]*scale+2,scale-4,scale-4);
  }

  this.toString = ()=>{
    return JSON.stringify({
      topLeft:topLeft.toString(),
      trapData:trapData,
      pertanentRoom:pertanentRoom.getId()
    })
  }

}

var trapChance = 33; // in percents
function addTrapsToRoom(room){
  var roll = Roll(100);
  if(roll <= trapChance){
    var trapTopLeft = findSpaceInRoom(room,allTraps);
    var newTrap = new Trap(trapTopLeft, getTable(roomTrapTable), room);
  }
}













//
