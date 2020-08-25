var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true)
const uniqueValidator = require("mongoose-unique-validator");
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  username:{type:String, required:true, index: {unique:true}, unique:true},
  email:{type:String, required:true, unique:true, index: {unique:true}},
  password:{type:String, required:true},
  characters:{type:Array, required:true},
  dungeons:{type:Array, required:true}
});

userSchema.plugin(uniqueValidator);

// hashing middleware
userSchema.pre("save",function(next){
  var user = this;
  // only hash the password if it has been changed (or created).
  // this way, the password won't be changed when a user changes their email adress.
  if(!user.isModified('password')) {
    return next()
  };
  // salt generator with hashing callback
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    // error catching
    if(err) return next(err);

    // hashing with new salt
    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);
      // replace the plaintext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


// password verification middleware
userSchema.methods.verifyPassword = function(candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if(err) return callback(err);
    callback(null, isMatch);
  });
}

module.exports = mongoose.model("Users", userSchema);
