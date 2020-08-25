function Parser(src){
  let data;

  this.getData = () => {
    return data;
  }

  this.getFile = (callback, newSrc) => {
    newSrc = newSrc || src
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
      if(this.readyState === 4 && this.status === 200){
        data = this.responseText;
        if(callback) callback(data);
      }
    }
    xhttp.open("GET", newSrc, true);
    xhttp.send();
  }

  this.post = (data, callback) => {
    // data conversion
    var params = JSON.stringify(convertDataToPost(data));
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", src, true);
    xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.onload = () => {
      console.log("loaded");
      if(xhttp.status === 200){
        if(callback) callback(xhttp.responseText);
      }
    }
    xhttp.send(params);
  }
}

const chambersParser = new Parser("/getChambers");

const lootParser = new Parser("/getLoot");

const doorParser = new Parser("/getDoors");

const passagewayTrapParser = new Parser("/getPassagewayTraps");

const roomTrapParser = new Parser("/getRoomTraps");

const dungeonParser = new Parser("/getDungeon");

const characterCreationParser = new Parser("/getCharacterCreationData");



// to do: convert this callback hell into a beatiful async/await heaven
// let chambers, doorTypes, roomTrapTable, passagewayTrapTable, lootTable;
// chambersParser.getFile((data) => {
//   chambers = JSON.parse(data);
//   doorParser.getFile((data) => {
//     doorTypes = JSON.parse(data);
//     passagewayTrapParser.getFile((data) => {
//       passagewayTrapTable = JSON.parse(data);
//       roomTrapParser.getFile((data) => {
//         roomTrapTable = JSON.parse(data);
//         lootParser.getFile((data) => {
//           lootTable = JSON.parse(data);
//           startDungeon();
//         });
//       });
//     });
//   });
// });


// data converter
function convertDataToPost(data){
  let newData = {
    allDoors:null,
    allRooms:null,
    allTraps:null,
    allPassageways:null,
    allChests:null,
    characters:null
  }

  let doorData = [];
  for (let i = 0; i < data.allDoors.length; i++) {
    doorData.push(allDoors[i].toString());
  }
  newData.allDoors = doorData;

  let roomData = [];
  for (let i = 0; i < data.allRooms.length; i++) {
    roomData.push(data.allRooms[i].toString());
  }
  newData.allRooms = roomData;

  let trapData = [];
  for (let i = 0; i < data.allTraps.length; i++) {
    trapData.push(data.allTraps[i].toString());
  }
  newData.allTraps = trapData;

  let passagewayData = [];
  for (let i = 0; i < data.allPassageways.length; i++) {
    passagewayData.push(data.allPassageways[i].toString());
  }
  newData.allPassageways = passagewayData;

  let chestData = [];
  for (let i = 0; i < data.allChests.length; i++) {
    chestData.push(data.allChests[i].toString());
  }
  newData.allChests = chestData;

  let characters = [];
  for (let i = 0; i < data.characters.length; i++) {
    characters.push(data.characters[i].toString());
  }
  newData.characters = characters;

  return newData;


}

function param(object) {
    var encodedString = '';
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            if (encodedString.length > 0) {
                encodedString += '&';
            }
            encodedString += encodeURI(prop + '=' + object[prop]);
        }
    }
    return encodedString;
}
