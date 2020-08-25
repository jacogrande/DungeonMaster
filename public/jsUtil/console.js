var consoleElement = document.getElementById("console");

var playerStyles = [
  {
    "name":"Trash DM",
    "color":"rgb(225,50,75)"
  },
]

function randomColor(){
  var r = Math.floor(Math.random()*255);
  var g = Math.floor(Math.random()*255);
  var b = Math.floor(Math.random()*255);
  return "rgb("+r+","+g+","+b+")";
}

function getPlayerColor(playerName){
  for(var i = 0; i < playerStyles.length; i++){
    if(playerStyles[i].name === playerName){
      return playerStyles[i].color;
    }
  }
  var randomC = randomColor();
  playerStyles.push({"name":playerName,"color":randomC});
  return randomC;
}


function write(message, player){
  // commands:
  var roll = Roll(20);
  if(message.toLowerCase() === "perception check"){
    perceptionCheck(roll, player);
    return false;
  }

  player = player || "Trash DM";
  var color = getPlayerColor(player);
  if(responseCallback != null){
    if(player != "DM"){
      if(typeof message === "string"){
        // yes or no checks
        if(message.toLowerCase() == "y"){
          responseCallback();
          return false;
        }
        else if(message.toLowerCase() == "n" || message.toLowerCase() == "no" || message.toLowerCase() == "cancel"){
          write("You don't interact with this item.");
          return false;
        }
        // locked door checks
        if(message.toLowerCase() == "pick"){
          responseCallback("pick");
          return false;
        }
        else if(message.toLowerCase() == "break"){
          responseCallback("break");
          return false;
        }
      }
    }
  }
  consoleElement.innerHTML += "<p><span style = 'color:"+color+"'>" + player + "</span>: " + message + "</p>";
  consoleElement.scrollTop = consoleElement.scrollHeight;
}

var responseCallback = null;
function promptPlayer(message, callback){
  write(message);
  responseCallback = callback;
}
