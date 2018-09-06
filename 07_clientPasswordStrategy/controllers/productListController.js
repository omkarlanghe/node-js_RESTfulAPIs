var mongoose = require('mongoose');
var Product = mongoose.model('Product');

exports.getProduct = function(req, res)
{
    Product.find({}, function(err, product) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(product);
        }
    });
};

exports.postProduct = function(req, res)
{
    var p = new Product(req.body);
    p.save(function(err, product) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send({message : "Product Successfully created"});
        }
    });
};

exports.readProduct = function(req, res)
{
    Product.findById(req.params._id, function(err, product) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(product);
        }
    });
};

exports.updateProduct = function(req, res)
{
    Product.findOneAndUpdate({_id: req.params._id}, req.body, {new : true}, function(err, product) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send({message : 'Product Updated Successfully'});
        }
    });
};

exports.deleteProduct = function(req, res)
{
    Product.remove({_id: req.params._id}, function(err, product) {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send({message: 'Product Deleted Successfully'});
        }
    });
};