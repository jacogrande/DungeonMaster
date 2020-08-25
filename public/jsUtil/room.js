
var allRooms = [];

// room class
function Room(topLeft, length, height, data){
  // sets topLeft vertice
  allRooms.push(this);

  this.found = false;

  this.setTopLeft = function(newV){
    topLeft = newV;
    activateVertice(newV.getX()/scale, newV.getY()/scale, length, height, this);
    this.setConnectionPoints();

  }


  this.activateAllVertice = function(){
    activateVertice(topLeft.getX()/scale, topLeft.getY()/scale, length, height, this);
  }

  this.getData = function(){
    return data;
  }

  // returns the top left vertice
  this.getTopLeft = function(){
    return topLeft;
  }

  this.populate = function(){
    var newObject;
    // chests
    for(var i = 0; i < data.chests.length; i++){
      // console.log(allChests);
      if(allChests){
        newObject = new Chest(findSpaceInRoom(this,allChests),data.chests[i], this);
        allChests.push(newObject);
        if(data.chests[i].dc < 10){
          newObject.draw();
        }
      }
    }
    addTrapsToRoom(this);

  }

  this.getId = function(){
    return ["room", allRooms.indexOf(this)];
  }

  this.getLength = function(){
    return length;
  }

  this.getHeight = function(){
    return height;
  }

  this.getCenter = function(){
    return [topLeft.getX()/scale + Math.floor(length/2), topLeft.getY()/scale + Math.floor(length/2)];
  }

  this.setDimensions = function(newLength, newHeight){
    length = newLength;
    height = newHeight;
  }

  // sets all possible connection points
  var connectionPoints = [];
  this.setConnectionPoints = function(){
    // schema: x,y,used
    connectionPoints[0] = [[topLeft.getX()/scale+Math.floor(length/2),topLeft.getY()/scale],false];
    connectionPoints[1] = [[topLeft.getX()/scale+length,topLeft.getY()/scale+Math.floor(height/2)],false];
    connectionPoints[2] = [[topLeft.getX()/scale+Math.floor(length/2),topLeft.getY()/scale+height],false];
    connectionPoints[3] = [[topLeft.getX()/scale,topLeft.getY()/scale+Math.floor(height/2)],false];
  }
  this.setConnectionPoints();

  this.getConnection = function(dir){
    return [connectionPoints[dir][0],dir];
  }

  // returns an unused connection point
  this.connect = function(){
    // finds a random connection point
    var rando = Math.floor(Math.random()*connectionPoints.length);
    // checks validity of connection point
    // restarts the connection process if the connection point is activated
    if(connectionPoints[rando][1]==false){
      connectionPoints[rando][1] = true;
      return [connectionPoints[rando][0],rando];
    }
    else{
      return this.connect();
    }
  }

  // draws the room
  this.draw = function(){
    canvas.strokeStyle = 'rgb(50,25,25)';
    canvas.strokeRect(topLeft.getX()-xOffset-renderTopLeft[0]*scale,topLeft.getY()-yOffset-renderTopLeft[1]*scale,length*scale,height*scale);
  }

  this.toString = () => {
    return JSON.stringify({
      topLeft: topLeft.toString(),
      length: length,
      height: height,
      data
    });
  }

}
