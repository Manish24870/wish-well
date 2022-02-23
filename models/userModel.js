const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        count: {
            comments: {
                type: Number,
                default: 0,
            },
        },
        avatar: {
            type: String,
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual populate
userSchema.virtual("mypocket", {
    ref: "Wish",
    foreignField: "pockets.user",
    localField: "_id",
});

userSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    },
});

// Hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
