//Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jsonwebtoken = require('jsonwebtoken');
var session = require('express-session');
var cors = require('cors');
var app = express();
var passport = require('passport');
//var oauthserver = require('oauth2-server');
var productListModel = require('./models/productListModel');
var productList = require('./controllers/productListController');
var clientController = require('./controllers/client');
var authController = require('./controllers/auth');
var port = process.env.PORT || 8090;
var router = express.Router();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(passport.initialize());
app.use(session({
    secret : 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

app.use(function(req, res, next) {
    if(req.headers && req.headers.authorization
         && req.headers.authorization.split(' ')[0] == 'bearer')
         {
             jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
                 if(err)
                 {
                     req.client = undefined;
                 }
                 else
                 {
                     req.client = decode;
                     next();
                 }
             });
         }
         else
         {
             req.client = undefined;
             next();
         }
});



//connect to the product mongodb;
mongoose.connect('mongodb://localhost:27017/product');
router.use(function(req, res, next) 
{
    console.log('Logging off request will done here');
    next();
});
router.route('/product')
    .get(productList.getProduct)
    .post(clientController.loginRequired, productList.postProduct);

router.route('/product/:_id')
    .get(productList.readProduct)
    .put(productList.updateProduct)
    .delete(productList.deleteProduct);

router.route('/clients')
    .post(clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

router.route('/sign_in')
    .post(clientController.sign_in)
    .get(/*authController.isAuthenticated,*/ clientController.getSign_in);

//start the server
app.use(cors());
app.use('/api',router);
app.listen(port);
console.log('REST Api is running on port at' + port);
module.exports = app;


