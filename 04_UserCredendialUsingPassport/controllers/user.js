//load required packages
var User = require('../models/user');

//create endpoint /api/users for POST
exports.postUsers = function(req, res) {
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err) {
        if(err)
        {
            return res.send(err);
        }
        else
        {
            res.json({ message: 'New beer drinker added to the locker room!'});
        }
    });
};

//Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
    User.find(function(err, users) {
        if(err)
        {
            return res.send(err);
        }
        else
        {
            res.json(users);
        }
    });
};