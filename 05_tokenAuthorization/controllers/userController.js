//Load required packages
//var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/userModel');
//var User = mongoose.model('User');

//create endpoint /api/users for register POST
console.log('going inside POST');
exports.register = function(req, res) {
    console.log('inside POST');
    var newuser = new User({
        username: req.body.username,
        password: req.body.password
    });
    console.log('new user saved');
    // newuser.password = bcrypt.hash(req.body.password, 10, null, function(err){
    //     if(err)
    //     {
    //         console.log('error generated');
    //     }
    // });

    newuser.save(function(err,user) {
        if(err)
        {
            return res.status(400).send(err);
        }
        else
        {
            user.password = undefined;
            return res.send(user);
            
        }
    });
    res.send({message : 'New user successfully created'});
};

//create endpoint /api/users for GET
exports.getRegister = function(req, res) {
    User.find(function(err, users) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(users);
        }
    });
};

exports.sign_in = function(req, res)
{
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if(err)
        {
            res.send(err);
        }
        if(!user)
        {
            res.status(401).send({message : 'Authentication failed. User not found'});
        }
        else if(user)
        {
            if(!user.comparePassword(req.body.password))
            {
                res.status(401).send({message: 'Authentication failed. Wrong password'});
            }
            else
            {
                return res.send({token: jwt.sign({username: user.username, _id: user._id}, 'RESTFULAPIs')});
            }
        }
    });
};

exports.loginRequired = function(req, res, next)
{
    if(req.user)
    {
        next();
    }
    else
    {
        return res.status(401).send({message : 'Unauthorized User!'});
    }
};
