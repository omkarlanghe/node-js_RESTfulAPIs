//load required package
var mongoose = require('mongoose');

//define our client schema
var ClientSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true},
    id: {type: String, required: true }, //part of OAuth2 flow
    secret: {type: String, required: true}, //part of OAuth2 flow
    userId: {type: String, required: true}
});
//export the mongoose model
module.exports = mongoose.model('Client', ClientSchema);

//created the client model.