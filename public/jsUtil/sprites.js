function Spritesheet(src, callback){
  var spriteImage = new Image();
  spriteImage.src = src;
  spriteImage.addEventListener("load",callback(),false);
  this.getImage = function(){
    return spriteImage;
  }
}

function activate(){
}

var testCharacterSheet = new Spritesheet("./sprites/characters/dungeonMonk.png", activate);
var fighterSheet = new Spritesheet("./sprites/characters/fighter.png", activate)
var specialSpriteSheet = new Spritesheet("./sprites/specials.png", activate);

function Sprite(spritesheet, xPos, yPos, clipWidth, clipHeight){
  this.draw = function(canvasX, canvasY){
     //syntax:      //img, clipx, clipy, clipWidth, clipHeight, canvasX, canvasY, width, height
    gCanvas.drawImage(
      spritesheet.getImage(),
      xPos,
      yPos,
      clipWidth,
      clipHeight,
      canvasX,
      canvasY,
      scale/1.5,
      scale/1.5
    )
  }
}

var charDown = new Sprite(testCharacterSheet, 0, 0, 20, 20);
var charUp = new Sprite(testCharacterSheet, 20, 0, 20, 20);
var charLeft = new Sprite(testCharacterSheet, 40, 0, 20, 20);
var charRight = new Sprite(testCharacterSheet, 60, 0, 20, 20);
var testCharacterSprites = [charUp,charRight,charDown,charLeft];

var fighterDown = new Sprite(fighterSheet, 0, 0, 20, 20);
var fighterSprites = [fighterDown,fighterDown,fighterDown,fighterDown];

var closedChest = new Sprite(specialSpriteSheet, 0, 0, 20, 20);
var openChest = new Sprite(specialSpriteSheet, 20, 0, 20, 20);
