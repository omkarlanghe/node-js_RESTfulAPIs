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
            res.send(err);
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
            res.send(err);
        }
        else
        {
            res.json(users);
        }
    });
};

// //Delete endpoint /api/user_id for DELETE
// console.log("going inside delete");
// exports.deleteUsers = function(req, res) {
//     console.log("inside delete")
//     User.remove(username,function(err, users) {
//         console.log("performing..");
//         if(err)
//         {
//             res.send(err);
//         }
//         else
//         {
//             res.send("Successfully Deleted the user");
//         }
//         res.send(users);
//     });
// };

// exports.deleteBeer =  function(req, res) {
//     //use the beer model to find a specific beer and remove it
//     Beer.remove({userId: req.user._id, _id: req.params.beer_id}, function(err) {
//         if(err) {
//             res.send(err);
//         }
//         else
//         {
//             res.send({ message: 'Beer removed from the locker!'});
//         }
//     });
// };  