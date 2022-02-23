const mongoose = require("mongoose");

const wishSchema = new mongoose.Schema(
    {
        desc: {
            type: String,
            required: true,
            trim: true,
        },
        heading: {
            type: String,
            trim: true,
            default: "",
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        count: {
            likes: {
                type: Number,
                default: 0,
            },
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        comments: [
            {
                desc: {
                    type: String,
                    required: true,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        pockets: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
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

const Wish = mongoose.model("Wish", wishSchema);

module.exports = Wish;
