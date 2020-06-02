const Validator = require("validator");
const isEmpty = require("is-empty");

const UserServices = require('../services/users.services');

module.exports = async function validateRegisterInput (data) {

    const errors = [];

    //Todo: Convert empty fields to an empty string so we can use validator functions
    data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
    data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

    //! Name checks
    if (Validator.isEmpty(data.firstname)){
        errors.push({message: "FirstName field is required"});
    }
    if (Validator.isEmpty(data.lastname)){
        errors.push({message: "LastName field is required"});
    }

    //! Username checks
    if (Validator.isEmpty(data.username)) {
        errors.push({message: "Username field is required"});
    }

    //! Email checks
    if (Validator.isEmpty(data.email)) {
        errors.push({message: "Email field is required"});
    } else if (!Validator.isEmail(data.email)) {
        errors.push({message: "Email no valido"});
    }

    //! Password checks
    if (Validator.isEmpty(data.password)) {
        errors.push({message: "Password field is required"});
    }

    if (Validator.isEmpty(data.confirmPassword)) {
        errors.push({message: "Confirm password field is required"});
    }

    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
        errors.push({message: "Password must be at least 8 characters"});
    }

    if (!Validator.equals(data.password, data.confirmPassword)) {
        errors.push({message: "Passwords not match"});
    }

    //! Check if user credentials are in use
    const emailExist = await UserServices.findOneByEmail({email: data.email});
    const usernameExist= await UserServices.findOneByUsername({username: data.username});
    if (emailExistente) {
        errors.push({ msg: "Email already exists" });
    }
    if (usernameExistente) {
        errors.push({ msg: "Username already exists" });
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};