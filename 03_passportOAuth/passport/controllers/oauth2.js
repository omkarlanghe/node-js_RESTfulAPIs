//load required packages
var oauth2orize = require('oauth2orize');
var user = require('../models/user');
var client = require('../models/client');
var Token =  require('../models/token');
var Code = require('../models/code');

//create oauth 2.0 server
var server = oauth2orize.createServer();

//register serialization function
server.serializeClient(function(client, callback) {
    return callback(null, client._id);
});

//register de serialization function
server.deserializeClient(function(id, callback) {
    client.findOne({_id : id}, function(err, client) {
        if(err)
        {
            return callback(err);
        }
        else
        {
            return callback(null, client);
        }
    });
});

//register authorization code grant type
server.grant(oauth2orize.grant.code(function(client, redirectUri, user, ares,  callback) {
    //create new authorization code
    var code = new Code({
        value : uid(16),
        clientId : client._id,
        redirectUri :redirectUri,
        userId : user._id
    });
    //save the auth code and check for errors
    code.save(function(err) {
        if(err) {
            return callback(err);
        }
        else
        {
            callback(null, code.value);
        }
    });
}));

//exchange authorization codes for access tokens
server.exchange(oauth2orize.exchange.code(function(client, code, redirectUri, callback) {
    Code.findOne({value : code}, function(err, authCode) {
        if(err)
        {
            return callback(err);
        }
        if(authCode == undefined)  
        {
            return callback(null, false);
        }
        if(client._id.toString() !== authCode.clientId)
        {
            return callback(null, false);   
        }
        if(redirectUri !== authCode.redirectUri)
        {
            return callback(null, false);
        }

        //delete auth code now that it has been used
        authCode.remove(function(err) {
            if(err)
            {
                return callback(err);
            }
            //create new access token
            var token  = new Token({
                value : uid(256),
                clientId : authCode.clientId,
                userId: authCode.userId
            });

            //save the access tokens and check for errors
            token.save(function(err) {
                if(err)
                {
                    return callback(err);
                }
                else
                {
                    callback(null, token);
                }
            });
        });
    });
}));

//user authorization endpoint
exports.authorization = [server.authorization(function(clientId, redirectUri, callback) {
    client.findOne({id :clientId}, function(err, client) {
            if(err)
            {
                return callback(err);
            }
            else
            {
                return callback(null, client, redirectUri)
            }
        });
    }),
    function(req, res) {
    res.render('dialog',{transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    }
]

//user encoded endpoint
exports.decision = [
    server.decision() //handles the data submitted by the post
                    // and will call the server.grant() function we created earlier if the user granted access.
]

exports.token = [
    server.token(),
    server.errorHandler()
]

function uid(len)
{
    var buf = [],
    chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    charlen = chars.length;

    for(var i = 0 ; i < len; i++)
    {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }
    return buf.join('');
};
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
