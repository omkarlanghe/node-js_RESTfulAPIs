
var mongoose = require('mongoose');
//var Schema = mongoose.Schema;

var ProductSchema = new mongoose.Schema({
    productname : String,
    productprice:Number,
    avail : Boolean
});

module.exports = mongoose.model('Product', ProductSchema);
