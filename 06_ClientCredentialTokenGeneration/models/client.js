//Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//Define our client schema
var ClientSchema = new mongoose.Schema({
    clientId : {
        type : String,
        unique : true,
        required : true
    },
    clientSecret : {
        type : String,
        required : true
    },
    grant_type: {
        type : String, 
        default: "client_credentials"
    }
});

//Execute before each client.save() call
ClientSchema.pre('save', function(callback) {
    var client = this;

    //break if the clientSecret hasn't changed
    if(!client.isModified('clientSecret'))
    {
        return callback();
    }

    //clientId changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
        if(err)
        {
            return callback(err);
        }
        bcrypt.hash(client.clientSecret, salt, null, function(err, hash) {
            if(err)
            {
                return callback(err);
            }
            else
            {
                client.clientSecret = hash;
                callback();
            }
        });
    });
});

ClientSchema.methods.verifyclientSecret = function(clientSecret, cb) {
    bcrypt.compare(clientSecret, this.clientSecret, function(err, isMatch) {
        if(err)
        {
            return cb(err);
        }
        cb(null, isMatch);
    });
};
ClientSchema.methods.compareclientSecret = function(clientSecret) {
    return bcrypt.compareSync(clientSecret, this.clientSecret);
  };

//Export the mongoose model
module.exports = mongoose.model('Client', ClientSchema);

