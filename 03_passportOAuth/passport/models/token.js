//load requied packages
var mongoose = require('mongoose');

//define our tocken schema
var TokenSchema = new mongoose.Schema({
    value : {type: String, required : true}, //actual token value accessing the API on behalf of user
    userId: {type: String, required: true},
    clientId : {type: String, required: true}
});

module.exports = mongoose.model('Token', TokenSchema);  