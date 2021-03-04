const passport = require('passport');
const googleStrategy = require('passport-google-auth').OAuth2Strategy();
const crypto = require('crypto');
const User = require('../model/user');
//tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "65547209392-tqq4mrdi6i8unob4n9skh6l63mktitea.apps.googleusercontent.com",
        clientSecret: "FQQfbEpig0RcUqzDXyvdQVCH",
        callbackURL: "http://localhost:8000/users/auth/google/callback",
    },

    function(accessToken,refreshToken,profile,done){
        //find a user 
        User.findOne({email: profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('Error in Google Strategy Passport',err);return;}
            console.log(profile);
            //if found,set this user as req.user
            if(user){
                return done(null,user);
            }else{
                //if not found,create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                },function(err,user){
                    if(err){console.log('Error in creating user',err);return;}
                    return done(null,user);
                });
            }

        })
        
    }

));
module.exports= passport;
//did we find the user in google db or our db?
