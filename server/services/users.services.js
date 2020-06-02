const User = require('../models/user.model')

async function findUserById (id) {
    const user = await User.findById(id);
    return user;
}

async function findUsers () {
    const users = await User.find();
    return users;
}

async function saveUser (user) {
    await user.save();
}

async function deleteUserById (id) {
    await User.findByIdAndDelete(id);
}

async function findOneByUsername (username) {
    const user = await User.findOne({username: username});
    return user;
}

async function findOneByEmail (email) {
    const user = await User.findOne({email: email});
    return user;
}

module.exports = {
    findUserById,
    findUsers,
    saveUser,
    deleteUserById,
    findOneByUsername,
    findOneByEmail
}