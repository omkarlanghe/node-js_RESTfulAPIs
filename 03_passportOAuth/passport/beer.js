//creating a model which represent my data
var mongoose = require('mongoose'); //mongoose is an ODM
var Schema = mongoose.Schema;
var BeerSchema = new Schema({
    name : String,
    type : String,
    quantity : Number,
    userId : String
});
//Export then mongoose model
module.exports = mongoose.model('Beer',BeerSchema);