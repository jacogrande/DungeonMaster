function Keyboard(){
  var UP = false,RIGHT = false,DOWN = false,LEFT = false, SPACE = false;

  this.getKeys = function(){
    return [UP,RIGHT,DOWN,LEFT,SPACE];
  }

  document.addEventListener("keydown",function(event){
    if(event.keyCode == 87){ // up (W)
      UP=true;
    }
    if(event.keyCode == 68){ // right (D)
      RIGHT=true;
    }
    if(event.keyCode == 83){ // down (S)
      DOWN=true;
    }
    if(event.keyCode == 65){ // up (A)
      LEFT=true;
    }
    if(event.keyCode == 32){
      SPACE=true;
    }

    if(event.keyCode == 13){ // enter
      var commandLine = document.getElementById("commandLine");
      keyLock = false;
      // commandLine.blur();
      if(commandLine.value.length>0){
        write(commandLine.value,"player1");
        commandLine.value = "";
      }
    }
  });

  document.addEventListener("keyup",function(event){
    if(event.keyCode == 87){ // up (W)
      UP=false;
    }
    if(event.keyCode == 68){ // right (D)
      RIGHT=false;
    }
    if(event.keyCode == 83){ // down (S)
      DOWN=false;
    }
    if(event.keyCode == 65){ // up (A)
      LEFT=false;
    }
    if(event.keyCode == 32){
      SPACE=false;
    }
  });

}

var keyboard = new Keyboard();
