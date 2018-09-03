//load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var user = require('../models/user');
var client = require('../models/client');
var BearerStrategy = require('passport-http-bearer').Strategy;
var token = require('../models/token');

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

passport.use('client-basic', new BasicStrategy(
    function(username, password, callback) {
        client.findOne({id: username}, function(err, client) {
            if(err)
            {
                return callback(err);
            }
            //no client found with that id or bad password
            if(!client || client.secret !== password) {
                return callback(null, false);
            }
            else
            {
                return callback(null, client);
            }
        });
    }
));

passport.use(new BearerStrategy(
    function(accessToken, callback) {
        token.findOne({value : accessToken}, function(err, token) {
            if(err)
            {
                return callback(err);
            }
            //no token found
            if(!token)
            {
                return callback(null, false);
            }
            user.findOne({_id : token.userId}, function(err, user) {
                if(err)
                {
                    return callback(err);
                }
                //no user found
                if(!user)
                {
                    return callback(null, false);
                }
                callback(null, user, {scope: '*'});
            });
        });
    }   
));
exports.isAuthenticated = passport.authenticate(['basic','bearer'], { session : false});
exports.isClientAuthenticated = passport.authenticate('client-basic', { session : false});
exports.isBearerAuthenticated = passport.authenticate('bearer', { session : false});
