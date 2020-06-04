const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require("moment");

const UserSchema = Schema({
    username: { type:String, maxlength:50 },
    email: { type:String, trim:true, unique: 1 },
    password: { type: String, minglength: 5 },
    firstname: { type:String, maxlength:50 },
    lastname: { type:String, maxlength: 50 },
    bio: { type:String },
    date: { type: Date, default: Date.now },
    role : { type: Number, default: 0 },
    image: { type: String },
    token : { type: String },
    tokenExp :{ type: Number }
})

UserSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function (cb) {
    var user = this;
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save( function (err, user) {
        if(err) return cb(err)
        cb(null, user);
    })
}

UserSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, 'secret', function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })
    });
}

module.exports = model('User', UserSchema);