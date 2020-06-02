
const UserServices = require('../services/users.services') 

const User = require('../models/User');

async function getUserById (req, res) {
    const id = req.params.id;
    const user = await UserServices.findUserById(id);
    if (user) {
        return res.status(200).json({ 
            status: 200, 
            data: user, 
            message: "Succesfully User Retrieved" 
        });
    } else {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function getUsers (req, res) {
    const users = await UserServices.findUsers();
    if (users) {
        return res.status(200).json({ 
            status: 200, 
            data: users, 
            message: "Succesfully Users Retrieved" 
        });
    } else {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

async function deleteUser (req, res) {
    const id = req.params.id;
    await UserServices.deleteUserById(id);
    return res.status(200).json({ status: 200, message: "User Succesfully Deleted!" });
}

async function login (req, res) {

}

async function register (req, res) {

}

module.exports = {
    login,
    register,
    getUsers,
    getUserById,
    deleteUser
}