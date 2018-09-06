//load required packages
var passport = require('passport');
var oauth2orize = require('oauth2orize');
var ClientPasswordStrategy = require('passport-oauth2-client-password');
var Client = require('../models/client');

passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, callback) {
        Client.findOne({clientId: clientId}, function(err, client) {
            if(err)
            {
                return callback(err);
            }
            if(!client)
            {
                return callback(null, false);
            }
            if(client.clientSecret != clientSecret)
            {
                return callback(null, false);
            }
            //success
            //return callback(null, client);

            client.verifyclientSecret(clientSecret, function(err, isMatch) {
                if(err)
                {
                    return callback(err);
                }

                //client secret did not match
                if(!isMatch)
                {
                    return callback(null, false);
                }
                return callback(null, client);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('oauth2-client-password', { session : false }/*, oauth2orize.token()*/);

