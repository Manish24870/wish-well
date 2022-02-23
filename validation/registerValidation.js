const validator = require("validator");
const isEmpty = require("./is-empty");

const validateRegisterInput = (data) => {
    let errors = {};

    data.username = !isEmpty(data.username) ? data.username : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (
        !validator.isLength(data.username, {
            min: 5,
            max: 30,
        })
    ) {
        errors.username = "Username must be at least 5 characters";
    }

    if (validator.isEmpty(data.username)) {
        errors.username = "Username is required";
    }

    if (!validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    if (
        !validator.isLength(data.password, {
            min: 5,
            max: 50,
        })
    ) {
        errors.password = "Password must be atleast 5 characters";
    }

    if (validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = validateRegisterInput;
