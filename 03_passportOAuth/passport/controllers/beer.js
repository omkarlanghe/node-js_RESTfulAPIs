//Load required packages
var Beer =  require('../models/beer');
//create endpoint /api/beers for POSTS

console.log("Going to enter inside POST");

exports.postBeers = function(req, res) {
    console.log("Inside POST");
    //creates a new instance of the Beer model
    var beer = new Beer();
    //set the beer properties that came from the POST data
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    beer.userId = req.user._id;

    console.log(beer);
    beer.save(function(err, data) {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        else
        {
            console.log(data);
            res.send({ message : 'Beer added to the locker!',data: beer });

        }
    });
};

//Creates endpoint /api/beers for GET
exports.getBeers = function(req, res) {
    //use the Beer model to find all beer
    Beer.find({userId: req.user._id}, function(err, beers) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(beers);            
        }
    });
};

//Create endpoints /api/beers/:beer_id for GET
exports.getBeer = function(req, res) {
    //use the Beer model to find a specific beer
    Beer.find({userId: req.user._id, _id: req.params.beer_id}, function(err, beer) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json(beer);
        }
    //     //update the existing beer quantity
    //     beer.quantity = req.body.quantity;
    //     //save the beer and check for errors
    //     beer.save(function(err) {
    //         if(err)
    //         {
    //             res.send(err);
    //         }
    //         else
    //         {
    //             res.json(beer);
    //         }
    //     });
     });
};

//creates endpoint /api/beers/:beer_id for PUT
exports.putBeer = function(req, res) {
    //use the beer model to find a specific beer
    Beer.findById({userId: req.user._id, _id: req.params.beer_id},
        function(err, beer) {
        if(err) {
            res.send(err);
        }
        else
        {
            res.send({ message: num + 'updated'});
        }
        //update the existing beer quantity
        var beer = new Beer();
        
        beer.name = req.body.name;
        beer.type = req.body.type;
        beer.quantity = req.body.quantity;
        beer.userId = req.user._id;

        //save the beer and check for error
        beer.save(function(err) {
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.json(beer);
            }
        });
    });
};

//creates endpoint /api/beers/:beer_id for DELETE
exports.deleteBeer =  function(req, res) {
    //use the beer model to find a specific beer and remove it
    Beer.remove({userId: req.user._id, _id: req.params.beer_id}, function(err) {
        if(err) {
            res.send(err);
        }
        else
        {
            res.send({ message: 'Beer removed from the locker!'});
        }
    });
};  