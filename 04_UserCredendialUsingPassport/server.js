//Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var port = process.env.PORT || 8090;

//connect to the beerlocker mongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

//creates our Express application
var app = express();
//use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//use the passport package in our application
app.use(passport.initialize());

//create our express router
var router = express.Router();

//create endpoint handlers for /beers
router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);

//creates endpoint handlers for /beer/:beer_id
router.route('/beers/:beer_id')
.get(authController.isAuthenticated, beerController.getBeer)
.put(authController.isAuthenticated, beerController.putBeer)
.delete(authController.isAuthenticated, beerController.deleteBeer);

//create endpoint handlers for /users
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers);

//start the server
app.use(cors());
app.use('/api',router);
app.listen(port);
console.log('REST Api is running on port at '+ port);

