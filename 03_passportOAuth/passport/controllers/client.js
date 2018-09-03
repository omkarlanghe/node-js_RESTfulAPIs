//load required packages
var Client = require('../models/client');

console.log("Going to enter enter inside Client POST");
//create an endpoint /api/client for POST
exports.postClients = function(req, res)  //attaching postClient property to exports
{
    console.log("Inside Client POST now\n");
    //create a new instance of client model
    var client = new Client();

    console.log("Ready to set client properties\n");
    //set the client properties that is coming from POST data
    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.user._id;
    console.log("Displaying Client\n");
    console.log(client);
    //save the client and check for errors
    client.save(function(err, data){
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(data);
            res.send({message: 'Client added to the locker!', data: client});
        }
    });
};
    //create an endpoint /api/clients for GET
    exports.getClients = function(req, res)
    {
        //use the client model to find all clients
        Client.find({ userId: req.user._id }, function(err, clients)
        {
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.send(clients);
            }
        });
    };