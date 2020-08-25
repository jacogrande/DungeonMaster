var allChests = [];
function Chest(topLeft, chestData, pertanentRoom){
  var state = "closed";
  this.pertanentRoom = pertanentRoom;
  this.found = false;
  var described = false;

  if(pertanentRoom instanceof Array){
    if(pertanentRoom[0] == "room"){
      pertanentRoom = allRooms[pertanentRoom[1]];
    }
    else{
      pertanentRoom = allPassageways[pertanentRoom[1]];
    }
  }

  console.log(pertanentRoom.getId());

  allChests.push(this);

  this.getState = function(){
    return state;
  }

  this.setState = function(newState){
    state = newState;
    if(state == "open"){
      var loot = getTable(lootTable);
      if(loot == "Poison Spray"){
        var damage = Roll(4);
        testCharacter.takeDamage(damage);
        write("Inside you find " + getTable(lootTable, "Poison Spray") + " and " + Roll(Roll(25)) + " gold, but, as you open the chest, a green cloud of poison sprays out of a hidden apparatus, dealing you " + damage + " (1d4) damage. You are now at " + testCharacter.getHp() + " hitpoints.");
      }
      else{
        write("Inside you find " + loot + " and " + Roll(Roll(25)) + " gold.");
      }
    }
  }

  this.getChestData = function(){
    return chestData;
  }

  this.writeDescription = function(){
    if(described == false){
      write(chestData.description);
      described = true;
    }
  }

  this.find = function(){
    if(this.found == false){
      this.draw();
      this.writeDescription();
      this.found = true;
      // write(chestData.description);
    }
  }

  this.getTopLeft = function(){
    return topLeft;
  }

  this.draw = function(){
    var sprite;
    if(state=="open"){
      sprite = openChest;
    }
    else{
      sprite = closedChest;
    }
    sprite.draw(topLeft.getX()+scale/8-xOffset-renderTopLeft[0]*scale, topLeft.getY()+scale/8-yOffset-renderTopLeft[1]*scale);
  }

  this.toString = ()=>{
    return JSON.stringify({
      topLeft:topLeft.toString(),
      chestData:chestData,
      pertanentRoom:pertanentRoom.getId()
    });
  }
}

function findChestsInRoom(room){
  for(var i = 0; i < allChests.length; i++){
    if(allChests[i].pertanentRoom === room && allChests[i].getChestData().dc < testCharacter.passivePerception){
      allChests[i].found = true;
    }
  }
}

// function populateChests(){
//   var randomQuant = Math.floor(Math.random()*10+1);
//   var newChest;
//   for(var i = 0; i < randomQuant; i++){
//     newChest = new Chest(findUsableSpace(),null);
//     newChest.draw();
//   }
// }
//
// populateChests();
