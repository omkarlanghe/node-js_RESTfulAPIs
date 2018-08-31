//Creating a model
var mongoose = require('mongoose'); //mongoose is an ODM i.e Object Document Mapper
var Schema = mongoose.Schema;
var ProductSchema = new Schema({ //Contains 4 properties of different types.
    //_id : String,
    productname : String,
    productprice:Number,
    avail : Boolean,
});
module.exports = mongoose.model('Product',ProductSchema);