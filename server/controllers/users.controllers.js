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
    const { errors, isValid, user } = await validateLoginInput(req.body);
    // Check Validation
    if (!isValid) {
        return res.json({loginSuccess: false, data: errors});
    } else {
        user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("w_authExp", user.tokenExp);
            res
                .cookie("w_auth", user.token)
                .status(200);
            return res.status(200).json({loginSuccess: true, message: "Succesfully loged!", userId: user._id});
        });
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

async function logout (req, res) { 
    UserServices.findAndUpdate( req.user._id, { token: "", tokenExp: "" });
    return res.status(200).json({message: "See you soon!"});
}

async function authentication (req, res) {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
}

module.exports = {
    login,
    register,
    getUsers,
    getUserById,
    deleteUser,
    logout,
    authentication
}