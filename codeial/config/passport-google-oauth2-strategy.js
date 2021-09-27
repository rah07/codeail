const passport = require("passport");
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// tell passport to use a new strategy for google login

passport.use(new googleStrategy({

        clientID: "702236515083-v2bcp5qnan7hta1vm30vhl5cses2pje1.apps.googleusercontent.com",
        clientSecret: "od5HUW0QNV0zz2R3y1ROKLMq",
        callbackURL: "http://localhost:8000/users/auth/google/callback"


    },



    function(acessToken, refreshToken, profile, done) {

        // find a user

        User.findOne({ email: profile.emails[0].value }).exec(function(err, user) {

            if (err) {

                console.log('error in google strategy-passport', err);
                return;
            }

            console.log(profile);


            if (user) {
                // if found ,set this user as req.user
                return done(null, user);
            } else {

                // if not found create the user and set it as req.user

                User.create({

                    name: profile.displayName,
                    email: profile.email[0].value,
                    password: crypto.randomBytes(20).toString('hex')

                }, function(err, user) {

                    if (err) {

                        console.log('error in creating user google strategy-passport', err);
                        return;

                    }

                    return done(null, user);
                })
            }

        })


    }





))