const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);

const dungeonSchema = new mongoose.Schema({
  dungeonData:{type:Object, required:true}
});

module.exports = mongoose.model("Dungeons", dungeonSchema);
