const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./schemas/user.js");

passport.use(new LocalStrategy(function(username, password, done){
  User.findOne({username:username}, function(err, user){
    if(err) return done(err);
    if(!user) return done(null, false);
    let verify = user.verifyPassword(password, function(err, isMatch){
      if(!isMatch) return done(null, false);
      return done(null, user);
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.isAuthenticated = (req, res, next) => {
  if(req.user != null){
    next();
  }
  else{
    return res.status(401).redirect("/login");
  }
}

module.exports = passport;
