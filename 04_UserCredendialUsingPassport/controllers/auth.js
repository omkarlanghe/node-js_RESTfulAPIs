//load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

passport.use(new BasicStrategy(
    function(username, password, callback) {
        user.findOne({username: username}, function(err, user) {
            if(err)
            {
                return callback(err);
            }
            //no user found with that user name
            if(!user)
            {
                return callback(null, false);
            }

            user.verifyPassword(password, function(err, isMatch) {
                if(err)
                {
                    return callback(err);
                }

                //password did not match
                if(!isMatch)
                {
                    return callback(null, false);
                }
                //success
                return callback(null, user);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false});