const Validator = require("validator");
const isEmpty = require("is-empty");

const User = require('../models/user.model');

const UserServices = require('../services/users.services');

module.exports = async function validateLoginInput (data) {

    const errors = [];

    //Todo: Convert empty fields to an empty string so we can use validator functions
    data.username = !isEmpty(data.username) ? data.username : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    //! Username checks
    if (Validator.isEmpty(data.username)) {
        errors.push({message: "Username field is required"});
    }
    const user = await UserServices.findOneByUsername(data.username);
    //Check if user exist
    if (!user) {
        errors.push({ message: "User not exist" });
    } else {
        //Check if password match
        const isMatch = await user.comparePassword(data.password)
        if (!isMatch) {
            errors.push({ message: "Password Incorrect" });
        }
    }

    //! Password checks
    if (Validator.isEmpty(data.password)) {
        errors.push({message: "Password field is required"});
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };

};