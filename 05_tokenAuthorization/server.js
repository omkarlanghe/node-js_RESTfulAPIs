
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var userController = require('./controllers/userController');
var authController = require('./controllers/auth');
var userModel = require('./models/userModel');
var productListModel = require('./models/productListModel');
var productList = require('./controllers/productListController');

var jsonwebtoken = require('jsonwebtoken');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(session({
    secret : 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));
app.use(function(req, res, next) {
    if(req.headers && req.headers.authorization
         && req.headers.authorization.split(' ')[0] == 'JWT')
         {
             jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
                 if(err)
                 {
                     req.user = undefined;
                 }
                 else
                 {
                     req.user = decode;
                     next();
                 }
             });
         }
         else
         {
             req.user = undefined;
             next();
         }
});

var port = process.env.PORT || 8090;
var router = express.Router();

//connecting to mongodb server
mongoose.connect('mongodb://localhost:27017/product').catch(err=>{
    console.log(err);
});
router.use(function(req, res, next) {
    //do logging 
    //do authentication
    console.log('Logging off request will done here');
    next();
});


router.route('/product')
    .get(productList.getProduct)
    .post(userController.loginRequired, productList.postProduct);

router.route('/product/:_id')
    .get(productList.readProduct)
    .put(productList.updateProduct)
    .delete(productList.deleteProduct);
    
router.route('/users')
    .post(userController.register)
    .get(authController.isAuthenticated, userController.getRegister);

router.route('/sign_in')
    .post(userController.sign_in);

// module.exports = function(app)
// {
//     var userHandlers = require('./controllers/userController');

//     app.route('auth/sign_in')
//     .post(userHandlers.sign_in);
// };



//start the server
app.use(cors());
app.use('/api',router);
app.listen(port);
console.log('RESTAPI is running on port at '+ port);
module.exports = app;
