const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

const characterSchema = new mongoose.Schema({
  stats:{
    strength:{type:Number, required:true},
    dexterity:{type:Number, required:true},
    constitution:{type:Number, required:true},
    intelligence:{type:Number, required:true},
    wisdom:{type:Number, required:true},
    charisma:{type:Number, required:true},
  },
  name:{type:String, required:true},
  race:{type:String, required:true},
  alignment:{type:String, required:true},
  speed:{type:Number, required:false},
  proficiencies:{type:Array, required:true},
  attacks:{type:Array, required:true},
  equipment:{type:Array, required:true},
  spells:{type:Array, required:false},
  spell_slots:{type:Array, required:false},
  features:{type:Object, required:false},
  level:{type:Number, required:true},
  hp:{type:Number, required:true},
  class:{type:String, required:true},
  proficiency_bonus:{type:Number, required:false},
  xp:{type:Number, required:true},
  owner_id:{type:String, required:true}
});

characterSchema.methods.levelUp = ()=>{
  console.log(this.level);
}

characterSchema.methods.giveXP = (monster_id)=>{
  console.log(this.xp);
}

characterSchema.methods.setProficiency = ()=>{
  console.log(this.level);
}

module.exports = mongoose.model("Characters", characterSchema);
