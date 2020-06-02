const UserServices = require('../services/users.services');

// Loading input validation
const validateRegisterInput = require("../validators/register.validator");
const validateLoginInput = require("../validators/login.validator");

const User = require('../models/user.model');

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
        return res.status(400).json({ status: 400, message: "User not found!" });
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
        return res.status(400).json({ status: 400, message: "Are not users!" });
    }
}

async function deleteUser (req, res) {
    const id = req.params.id;
    const user = await UserServices.findUserById(id);
    if (user) {
        await UserServices.deleteUserById(id);
        return res.status(200).json({ status: 200, message: "User Succesfully Deleted!" });
    } else {
        return res.status(400).json({ status: 400, message: "User not found!" });
    }
    
}

async function login (req, res) {
    // Validation
    const { errors, isValid } = await validateLoginInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.json({loginSuccess: false, data: errors});
    } else {
        return res.status(200).json({loginSuccess: true, message: "Succesfully loged!"});
    }
}

async function register (req, res) {
    // Validation
    const { errors, isValid } = await validateRegisterInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.json({registerSuccess: false, data: errors});
    } else {
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });
        newUser.password = await newUser.encryptPassword(req.body.password);
        await UserServices.saveUser(newUser);
        return res.status(200).json({registerSuccess: true, message: "Succesfully registered!"});        
    }
}

module.exports = {
    login,
    register,
    getUsers,
    getUserById,
    deleteUser
}