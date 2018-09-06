//load required packages
var Client = require('../models/client');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
//create endpoints /api/client for POST

console.log("going to enter Inside POST Client");
exports.postClients = function(req, res)
{
    console.log("Inside POST CLient");
    var client = new Client({
        clientId : req.body.clientId,
        clientSecret : req.body.clientSecret
        //grant_type : req.body.grant_type
    });
    
    client.save(function(err, client)
    {
        console.log("inside save");
        if(err)
        {
            return res.status(400).send(err);
        }
        else
        {
           client.clientSecret = undefined;
           return res.send(client);
        }   
    });
    res.json({ message : "Client successfully added"});
};

console.log("going Inside GET CLient");
exports.getClients = function(req, res) {
    console.log("Inside GET CLient");
    Client.find(function(err, clients) {
        if(err)
        {
            return res.send(err);
        }
        else
        {
            res.json(clients);
        }
    });
};



console.log("going inside signin");
exports.sign_in = function(req, res)
{
    console.log("inside signin..");
    Client.findOne({clientId: req.body.clientId}, function(err, client) {
        console.log(client);
        if(err)
        {
            res.send(err);
        }
        //return res.send({token: jwt.sign({clientId : client.clientId, _id: client._id}, 'RESTFULAPIs')});
        if(!client)
        {
            res.status(401).send({message : 'Incorrect ClientId-Authentication failed, Client not found'});
        }
        else if(client)
        {
            if(!client.compareclientSecret(req.body.clientSecret))
            {
                res.status(401).send({message : 'Authentication failed. Wrong Secret'});
            }
            else
            {
                return res.send({expires_in: Math.floor(Date.now()/1000)-(60*60),access_token: jwt.sign({clientId : client.clientId, _id: client._id}, 'RESTFULAPIs'), token_type : 'bearer'});
            }
        }
    });
};

console.log("going to enter inside getSign_in");
exports.getSign_in = function(req, res)
{
    console.log("Inside GetSign_in");
    Client.find(function(err, clients) {
        if(err)
        {
            return res.send(err);
        }
        else
        {
            res.send(clients)
        }
    });
};

exports.loginRequired = function(req, res, next)
{
    if(req.client)
    {
        next();
    }
    else
    {
        return res.status(401).send({message : 'Unauthorized Client!'});
    }
}