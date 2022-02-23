const validator = require("validator");
const isEmpty = require("./is-empty");

const validateNewComment = (data) => {
    let errors = {};

    data.desc = !isEmpty(data.desc) ? data.desc : "";

    if (validator.isEmpty(data.desc)) {
        errors.desc = "Please enter some text";
    }

    return {
        errors,
        isValid: isEmpty(errors),
    };
};

module.exports = validateNewComment;
