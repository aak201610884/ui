const  GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport=require('passport')

const GOOGLE_CLIENT_ID="105495846081-jf662o05218eo31b1smkdactujc1tood.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET="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"
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5003/google/callback",
    passReqToCallback:true

  }, function(accessToken, refreshToken, profile, done) {
    console.log('Callback executed'); // Add this line
    return done(null, profile);
  }));
passport.serializeUser((user,done)=>{
  done(null,user)
})
passport.deserializeUser((user,done)=>{
  done(null,user)
})