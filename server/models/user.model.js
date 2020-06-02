const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = Schema({
    username: { type:String, maxlength:50 },
    email: { type:String, trim:true, unique: 1 },
    password: { type: String, minglength: 5 },
    firstname: { type:String, maxlength:50 },
    lastname: { type:String, maxlength: 50 },
    bio: { type:String },
    date: { type: Date, default: Date.now }
})

UserSchema.methods.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

UserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model('User', UserSchema);