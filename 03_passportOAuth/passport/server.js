
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var ejs = require('ejs');
var session =  require('express-session');

var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');
var oauth2Controller = require('./controllers/oauth2');

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json());
//use the passport package in our application
app.use(passport.initialize());

app.use(session({
    secret: 'Super Secret Session key',
    saveUninitialized: true,
    resave: true
}));

//set view engine to ejs
app.set('view engine', 'ejs');

var port = process.env.PORT || 8090;
var router = express.Router();

//connecting to mongodb server
mongoose.connect('mongodb://localhost:27017/beerlocker').catch(err=>{
    console.log(err);
});
router.use(function(req, res, next) {
    //do logging 
    //do authentication
    console.log('Logging off request will done here');
    next(); //make sure we go to the next routes and don't stop here
});

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

//create endpoint handlers for /clients
router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

//create endpoint handlers for oauth2 authorize
router.route('/oauth2/authorize')
    .get(authController.isAuthenticated, oauth2Controller.authorization)    
    .post(authController.isAuthenticated, oauth2Controller.decision);

//create endpoint handlers for oauth2 tokens
router.route('/oauth2/token')
    .post(authController.isClientAuthenticated, oauth2Controller.token);


//start the server
app.use(cors());
app.use('/api',router);
app.listen(port);
console.log('REST Api is running on port at '+ port);
//close