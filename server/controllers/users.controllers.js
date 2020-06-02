const bcrypt = require('bcryptjs');

const UserServices = require('../services/users.services');

// Loading input validation
const validateRegisterInput = require("../validator/register.validator");
const validateLoginInput = require("../validator/login.validator");

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
    // Validation
    const { errors, isValid } = await validateLoginInput(req.body);
    // Check Validation
    if (!isValid) {
        res.json({loginSucces: false, data: errors});
    } else {
        res.status(200).json({loginSucces: true, message: "Succesfully loged!"});
    }
}

async function register (req, res) {
    // Validation
    const { errors, isValid } = await validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
        res.json({registerSucces: false, data: errors});
    } else {
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        newUser.password = await User.encryptPassword(password);
        res.status(200).json({registerSucces: true, message: "Succesfully registered!"});        
    }
}

module.exports = {
    login,
    register,
    getUsers,
    getUserById,
    deleteUser
}