const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/dm";
mongoose.connect(url);
const express = require("express");
const app = require("./router.js");

const bodyParser = require("body-parser");
const config = require("./config");
const passport = require("./auth.js");
const path = require("path");

const User = require("./schemas/user.js");
const Dungeon = require("./schemas/dungeon.js");
const Character = require("./schemas/character.js");

const characterData = require("./characterOptions.js");



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("cookie-parser")());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public')));

const db = mongoose.connection;

db.on("error",console.error.bind(console, "connection error: "));
db.once("open",() => {
  console.log("connected to mongo database \n");
});


// post

app.post("/register",(req,res) =>{
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  let newUser = new User({
    "username":username,
    "password":password,
    "email":email,
    "characters":[],
    "dungeons":[]
  });
  User.find({username:newUser.username}, (err,response) => {
    if(err) return res.status(422).send(err);
    if(response.length == 0){
      newUser.save((err) => {
        if(err) return res.status(422).send(err);
        passport.authenticate('local')(req,res, () => {
          res.redirect("/profile");
        })
      });
    }
    else{
      res.send("user with this username already exists.");
    }
  });
});

app.post('/login', passport.authenticate('local',{failureRedirect:"/login"}), (req,res) => {
    res.redirect("/profile");
  }
);

// character
app.post("/createCharacter", passport.isAuthenticated, (req,res) => {
  let data = req.body;
  let raceData = characterData;
  characterData.races.forEach((race)=>{
    if(race.name === data.race){
      raceData = race;
    }
  })

  let classData = characterData;
  characterData.classes.forEach((Class)=>{
    if(Class.name === data.class){
      classData = Class;
    }
  });

  // raceData;
  let proficiencies = raceData.proficiencies;
  proficiencies.push(data.first_proficiency);
  proficiencies.push(data.second_proficiency);
  proficiencies.push(classData.proficiencies);
  proficiencies.push(classData.saving_throws);

  let features = raceData.features;

  let spells = data.spells.split(",");

  let hp = 0;
  let newHp = 0;
  for(var i = 0; i < data.level; i++){
    newHp = Math.floor(Math.random()*classData.hit_dice)
    if(newHp < classData.hit_dice / 2) newHp = classData.hit_dice / 2;
    newHp += Math.floor((parseInt(data.constitution)+ raceData.improvements[2][1]) / 2) - 5;
    hp += newHp;
  }

  let spell_slots = classData.spells;
  if(spell_slots) spell_slots = spell_slots[data.level-1];

  let newCharacter = new Character({
    stats:{
      strength:parseInt(data.strength) + raceData.improvements[0][1],
      dexterity:parseInt(data.dexterity)+ raceData.improvements[1][1],
      constitution:parseInt(data.constitution)+ raceData.improvements[2][1],
      intelligence:parseInt(data.intelligence)+ raceData.improvements[3][1],
      wisdom:parseInt(data.wisdom)+ raceData.improvements[4][1],
      charisma:parseInt(data.charisma)+ raceData.improvements[5][1],
    },
    name:data.name,
    race:data.race,
    alignment:data.alignment,
    speed:raceData.speed,
    proficiencies:proficiencies,
    attacks:classData.attacks,
    equipment:classData.equipment,
    spells:spells,
    spell_slots:spell_slots,
    features:{
      languages:raceData.languages,
      other_features:features
    },
    level:data.level,
    hp:hp,
    class:data.class,
    proficiency_bonus:data.proficiency_bonus,
    xp:0,
    owner_id:req.user._id
  });
  newCharacter.save((err)=>{
    if(err) return res.status(422).send(err);
    User.findOneAndUpdate({_id:req.user._id},{$push:{characters:newCharacter._id}}, {returnOriginal: false}, (err, foundUser) => {
      if(err) return res.status(422).send(err);
      res.send("new character created successfully");
    });
  })
});

// dungeon generator
app.post("/getDungeon", (req,res) => {
  let newDungeon = new Dungeon({
    "dungeonData":req.body
  });
  newDungeon.save((err)=>{
    if(err) return res.status(422).send(err);
    res.send("new dungeon generated");
  })
});





// put
app.put("/update", passport.isAuthenticated, (req, res) => {
  User.findOneAndUpdate({_id:req.user._id},{$set:req.body.updates}, {returnOriginal: false}, (err, foundUser) => {
    if(err) return res.status(422).send(err);
    res.send("user data modified");
  });
});

app.put("/updateCharacter", passport.isAuthenticated, (req, res) => {
  Character.findOneAndUpdate({_id: req.body.id}, {$set:req.body.updates}, {returnOriginal:false}, (err, foundChar) => {
    if(err) return res.status(422).send(err);
    res.send("character data modified");
  });
});


// delete
app.delete("/deleteUser", passport.isAuthenticated, (req,res) => {
  User.deleteOne({_id:req.user._id}, (err)=>{
    if(err) return res.status(500).send(err)
    res.send("user deleted");
  });
});

app.delete("/deleteDungeon", passport.isAuthenticated, (req,res) => {
  Dungeon.deleteOne({_id:req.query.id}, (err)=>{
    if(err) return res.status(500).send(err)
    res.send("dungeon deleted");
  });
});

app.delete("/deleteCharacter", passport.isAuthenticated, (req,res) => {
  Character.deleteOne({_id:req.query.id}, (err)=>{
    if(err) return res.status(500).send(err)
    res.send("character deleted");
  });
});



// get
app.get("/register",(req,res) =>{
  if(req.user != null){
    res.redirect("/profile");
  }
  else{
    res.render("register");
  }
});

app.get("/login", (req,res) =>{
  if(req.user != null){
    res.redirect("/profile");
  }
  else{
    res.render("login");
  }
});

app.get("/profile", passport.isAuthenticated, (req,res) => {
  Dungeon.find({}, (err, allDungeons)=>{
    if(err) return res.status(500).send(err);
    Character.find({owner_id:req.user._id},(err, allCharacters)=>{
      if(err) return res.status(500).send(err);
      res.render("profile", {user:req.user, dungeons: allDungeons, characters:allCharacters});
    })
  });
});

app.get("/game", passport.isAuthenticated, (req,res) => {
  res.render("generator");
})

app.get("/", (req,res) => {
  if(req.user != null){
    res.render("index", {username:req.user.username});
  }
  else{
    res.render("index", {username:null});
  }
});

app.get("/getDungeons", (req,res) => {
  Dungeon.find({},(err, foundDungeon)=>{
    if(err) return res.status(500).send(err);
    res.send(foundDungeon);
  });
});

app.get("/getDungeon", (req,res) => {
  Dungeon.findOne({_id:req.query.id},(err, foundDungeon)=>{
    if(err) return res.status(500).send(err);
    res.send(foundDungeon);
  });
});

app.get("/getUser", passport.isAuthenticated, (req,res) =>{
  res.send(req.user);
});

// character
app.get("/getCharacters", passport.isAuthenticated, (req,res)=>{
  Character.find({owner_id:req.user._id}, (err, foundCharacters)=>{
    if(err) return res.status(422).send(err);
    res.send(foundCharacters);
  });
});

app.get("/getCharacter", passport.isAuthenticated, (req,res) => {
  Character.findOne({_id:req.query.id, owner_id:req.user._id}, (err, foundCharacter)=>{
    if(err) return res.status(422).send(err);
    res.send(foundCharacter);
  });
});

app.get("/displayCharacter", passport.isAuthenticated, (req,res) => {
  Character.findOne({_id:req.query.id, owner_id:req.user._id}, (err, foundCharacter)=>{
    if(err) return res.status(422).send(err);
    res.render("character", {character:foundCharacter});
  });
});
//
// app.get("/createCharacter", passport.isAuthenticated, (req,res) => {
//   res.render("createCharacter", {races:characterData.races});
// });

app.get("/createCharacter", passport.isAuthenticated, (req,res) => {
  res.render("characterCreation2");
});

app.get("/getCharacterCreationData", (req, res) => {
  res.send(characterData);
});

// listener

app.listen(config.port,(req,res) =>{
  console.log("Socket to me... (" + config.port + ")");
});
