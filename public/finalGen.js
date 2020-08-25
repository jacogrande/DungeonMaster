var canvasSpace = document.getElementById("dungeonSpace");
var canvas = canvasSpace.getContext("2d");

var vertices = [];

function Vertice(x,y){
  var activated = false;
  this.activate = function(room){
    activated = true;
    canvas.fillStyle = 'rgb(255,255,200)';
    canvas.fillRect(x-xOffset-renderTopLeft[0]*scale,y-yOffset-renderTopLeft[1]*scale,scale,scale);
    canvas.strokeStyle = 'rgb(200,200,200)';
    canvas.strokeRect(x-xOffset-renderTopLeft[0]*scale,y-yOffset-renderTopLeft[1]*scale,scale,scale);
    this.pertanentRoom = room;
  }

  this.drawEmpty = function(){
    canvas.fillStyle = 'rgb(0,0,0)';
    canvas.fillRect(x-xOffset-renderTopLeft[0]*scale,y-yOffset-renderTopLeft[1]*scale,scale,scale);
    canvas.strokeStyle = 'rgb(200,200,200)';
    canvas.strokeRect(x-xOffset-renderTopLeft[0]*scale,y-yOffset-renderTopLeft[1]*scale,scale,scale);
  }

  this.getX = function(){
    return x;
  }
  this.getY = function(){
    return y;
  }

  this.isActivated = function(){
    return activated;
  }

  this.pertanentRoom = null;

  this.toString = () => {
    return JSON.stringify({
      activated:activated,
      x:x,
      y:y,
      pertanentRoom:this.pertanentRoom.getId() || null
    })
  }

}

canvasSpace.setAttribute("width",scale*scaledHeight);
canvasSpace.setAttribute("height",scale*scaledHeight);

function setup(){

  var col = [];
  for(var x = 0; x < mapWidth + 1; x++){
    col = [];
    for(var y = 0; y < mapHeight + 1; y++){
      col.push(new Vertice(x*scale,y*scale));
    }
    vertices.push(col);
  }
}

function visualizeV(){
  var row = [];
  for(var i = 0; i < vertices.length;i++){
    for(var a = 0; a < vertices[i].length; a++){
      if(vertices[a][i].isActivated() == false){
        row.push(0);
      }
      else{
        row.push(1);
      }
    }
    console.log(row);
    row = [];
  }
}

function buildRoom(){
  var roomData = getTable(chambers);
  if(roomData.name == "Cell" || roomData.name == "Closet"){
    roomData = getTable(chambers);
  }
  var roll = roomData.rolls[Math.floor(Math.random()*roomData.rolls.length)];
  var newRoom = new Room(vertices[0][0],roll[0],roll[1],roomData);
  newRoom.setTopLeft(vertices[10][10]);
  newRoom.found = true;
  // newRoom.draw();
  for(var i = 0; i < roll[2]; i++){
    connectRoom(newRoom);

  }
}

var renderTopLeft = [5,5];
var xOffset = 0;
var yOffset = 0;


function clearMap(){
  canvas.clearRect(0,0,canvasSpace.width,canvasSpace.height);
  canvas.fillStyle = "rgb(29, 21, 23)";
  canvas.fillRect(0,0, canvasSpace.width, canvasSpace.height);
}

// visibility:
  // each room has a found feature
  // whenever the door to a room is opened / passed, the room is revealed.
  // this is done through a reveal method in the door class.
  // hava function for rendering gray vertices (maybe)


function renderMap(){
  clearMap();
  var currentVertice
  for(var y = 0; y < scaledHeight+1; y++){
    for(var x = 0; x < scaledHeight+1; x++){
      if(renderTopLeft[0]+x >= 0 && renderTopLeft[0] + x < vertices.length){
        if(renderTopLeft[1]+y >= 0 && renderTopLeft[1]+y < vertices[x].length){
          currentVertice = vertices[renderTopLeft[0]+x][renderTopLeft[1]+y];

          // check rooms
          for(var i = 0; i < allRooms.length; i++){
            if(allRooms[i].getTopLeft() == currentVertice && allRooms[i].found == true){
              allRooms[i].activateAllVertice();
              allRooms[i].draw();
            }
          }
          // check passageways
          for(var i = 0; i < allPassageways.length; i++){
            if(allPassageways[i].getTopLeft() == currentVertice && allPassageways[i].found == true){
              allPassageways[i].draw();
            }
          }

          // check doors
          for(var i = 0; i < allDoors.length; i++){
            if(allDoors[i].getTopLeft() == currentVertice && allDoors[i].found === true){
              allDoors[i].draw(allDoors[i].getDirection());
            }
          }

          // check all chests
          for(var i = 0; i < allChests.length; i++){
            if(allChests[i].found == true){
              if(allChests[i].getTopLeft() == currentVertice){
                allChests[i].draw();
              }
            }
          }

          // checks all traps
          for(var i = 0; i < allTraps.length; i++){
            if(allTraps[i].found === true){
              if(allTraps[i].getTopLeft() == currentVertice){
                allTraps[i].draw();
              }
            }
          }

        }
      }
    }
  }
}


//end
