function clearCanvas(){
  gCanvas.clearRect(0,0,gameCanvas.width,gameCanvas.height);
}

function update(){
  clearCanvas();
  updatePositions();
  renderMap();
  for(var i = 0; i < allCharacters.length; i++){
    allCharacters[i].render();
  }

}

var dungeonSchema;

function getDungeon(){
  // allDoors = dungeonSchema.allDoors;
  // allRooms = dungeonSchema.allRooms;
  // allTraps = dungeonSchema.allTraps;
  // allPassageways = dungeonSchema.allPassageways;
  // allChests = dungeonSchema.allChests;

  let currentData = dungeonSchema.allRooms;
  let newRoom;
  for(let i = 0; i < currentData.length; i++){
    currentData[i] = JSON.parse(currentData[i]);
    currentData[i].topLeft = vertices[parseInt(JSON.parse(currentData[i].topLeft).x)/scale][parseInt(JSON.parse(currentData[i].topLeft).y)/scale];
    // console.log(currentData[i]);
    newRoom = new Room(currentData[i].topLeft, currentData[i].length, currentData[i].height, currentData[i].data);
    newRoom.setTopLeft(currentData[i].topLeft);
    newRoom.draw();
    // allRooms.push(newRoom);
  }

  currentData = dungeonSchema.allPassageways;
  newRoom;
  for(let i = 0; i < currentData.length; i++){
    currentData[i] = JSON.parse(currentData[i]);
    // currentData[i].topLeft = vertices[parseInt(JSON.parse(currentData[i].topLeft).x)/scale][parseInt(JSON.parse(currentData[i].topLeft).y)/scale];
    // console.log(currentData[i]);
    newRoom = new Passageway(currentData[i].topLeft, currentData[i].length, currentData[i].height);
    newRoom.draw();
  }

  currentData = dungeonSchema.allDoors;
  let door1;
  let door2;
  for(let i = 0; i < currentData.length-2; i++){
    currentData[i] = JSON.parse(currentData[i]);
    door1 = new Door(currentData[i].doorData, currentData[i].description, currentData[i].pertanentRoom);
    allDoors.push(door1);
    allDoors[i].draw(allDoors[i].getDirection());
  }

  for(let i = 0; i < allDoors.length; i++){
    allDoors[i].setLink(allDoors[currentData[i].link]);
  }

  currentData = dungeonSchema.allTraps;
  for(let i = 0; i < currentData.length; i++){
    currentData[i] = JSON.parse(currentData[i]);
    currentData[i].topLeft = vertices[parseInt(JSON.parse(currentData[i].topLeft).x)/scale][parseInt(JSON.parse(currentData[i].topLeft).y)/scale];
    new Trap(currentData[i].topLeft, currentData[i].trapData, currentData[i].pertanentRoom);
    allTraps[i].draw();
  }

  currentData = dungeonSchema.allChests;
  console.log(currentData);
  for(let i = 0; i < currentData.length; i++){
    currentData[i] = JSON.parse(currentData[i]);
    currentData[i].topLeft = vertices[parseInt(JSON.parse(currentData[i].topLeft).x)/scale][parseInt(JSON.parse(currentData[i].topLeft).y)/scale];
    new Chest(currentData[i].topLeft, currentData[i].chestData, currentData[i].pertanentRoom);
    allChests[i].draw();
  }

  // renderMap();


}

function startDungeon(){
  setup();
  let id=getParameterByName("id");
  if(id){
    id="/getDungeon?id=" + id;
    dungeonParser.getFile((data)=>{
      dungeonSchema = JSON.parse(data).dungeonData;
      getDungeon();
      update();
      start();
    },id);
  }
  else{
    buildRoom();
    findDoors();
    dungeonSchema = {
      allDoors:allDoors,
      allRooms:allRooms,
      allTraps:allTraps,
      allPassageways:allPassageways,
      allChests:allChests,
      characters:[testCharacter],
    }

    dungeonParser.post(dungeonSchema,(data)=>{console.log(data)});

    update();
    start();
  }
}

var fps = 45;
function start(){
  findDoorsInRoom(allRooms[0]);
  findChestsInRoom(allRooms[0]);
  var running = setInterval(function(){
    update();
  },1000/fps);
}
