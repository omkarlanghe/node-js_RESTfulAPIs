var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var product = require('./product');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
var port = process.env.PORT || 8090;
var router = express.Router();

//connecting to mongodb server
mongoose.connect('mongodb://localhost:27017/product').catch(err=>{
    console.log(err);
});
router.use(function(req, res, next) {
    //do logging
    //do authentication
    console.log('Logging of request will be done here');
    next(); //make sure we go to the next routes and don't stop here
    
});

//creating a record using POST(CREATE)
router.route('/product').post(function(req, res) {
    console.log("in add");
    var p = new product();
    //p._id = req.body._id;
    p.productname = req.body.productname;
    p.productprice = req.body.productprice;
    p.avail = req.body.productAvailability;
    console.log(p);
    
    p.save(function(err, data) {
        if(err) {
            console.log(err);
            res.send(err);
        }
        else{
            console.log(data);
        res.send({ message : ' Product Created !' })
        }
        
    })
});


//Reading the record using GET(READ)
router.route('/product').get(function(req, res) {
    console.log("in read");
    product.find(function(err, product) { //mongoose funtion to fetch all records from MongoDb collection
        if(err)
        {
            res.send(err);
        }
        else
        {
            console.log(product);
            res.send(product);
        }
          
    });
    console.log("in togf");
   // res.send("products");  
});         

//Returning a particular record from mongodb collection
router.route('/product/:_id').get(function(req, res) {

    product.findById(req.params._id, function(err, prod) {
        if(err) {
            res.send(err);
        }
        else
        {
            res.json(prod);
        }
    });
});

//Updating Record in mongodb collection using PUT(UPDATE)
 router.route('/product/:_id').put(function(req, res) {
 
    product.findById(req.params._id, function(err,prod) {
        if(err)
        {
            res.send(err);
        }

            prod.productname = req.body.productname;
            prod.productprice = req.body.productprice;
            prod.avail = req.body.avail;
            prod.save(function(err) {
            if(err)
            {
                res.send(err);
            }
            else
            {
                res.send( {message : "Product Updated!" } );
            }
       });
    });
});

//Deleting Record in monogodb collection using delete(DELETE)

router.route('/product/:_id').delete(function(req, res) {
    console.log(req.params._id);
    product.remove({_id : req.params._id}, function(err, prod) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.json({message : 'Deleted Successfully'});
        }
    });
});

app.use(cors());
app.use('/api',router);
app.listen(port);
console.log('REST Api is running on port at '+ port);


