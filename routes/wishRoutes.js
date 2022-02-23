const express = require("express");
const User = require("../models/userModel");

const Wish = require("../models/wishModel");
const auth = require("../utils/auth");
const createWishValidation = require("../validation/createWishValidation");
const wishCommentValidation = require("../validation/wishCommentValidation");

const router = express.Router();

// Route to create a new wish
// POST /wishes
router.post("/", auth, async (req, res) => {
    const { errors, isValid } = createWishValidation(req.body);

    //Check if the data is valid
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newWish = new Wish({
        owner: req.user._id,
        desc: req.body.desc,
        heading: req.body.heading,
    });

    try {
        const createdWish = await newWish.save();
        createdWish.owner = req.user;
        res.status(200).json(createdWish);
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Cannot create a wish right now",
        });
    }
});

// Route to get wishes
// GET /wishes
router.get("/", auth, async (req, res) => {
    try {
        const wishes = await Wish.find().populate("owner").sort({ date: -1 });
        res.status(200).json(wishes);
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Cannot get the wishes right now",
        });
    }
});

// Route to get my wishes
// GET /wishes/mywishes
router.get("/mywishes", auth, async (req, res) => {
    const foundWishes = await Wish.find({ owner: req.user._id }).populate(
        "owner"
    );
    res.status(200).json(foundWishes);
});

// Route to get my pocketed wishes
// /wishes/mypocket
router.get("/mypocket", auth, async (req, res) => {
    const data = await User.findById(req.user.id).populate("mypocket");
    const pocket = data.mypocket;
    const updatedPocket = pocket.forEach((el) => (el.owner = req.user));
    res.status(200).json(pocket);
});

// Route to get top wishes
// /wishes/top
router.get("/topwishes", auth, async (req, res) => {
    const wishes = await Wish.find()
        .sort({ "count.likes": -1 })
        .populate("owner");
    res.status(200).json(wishes);
});

// Route to get a wish
// GET /wishes/:id
router.get("/:id", auth, async (req, res) => {
    try {
        const foundWish = await Wish.findById(req.params.id).populate(
            "comments.user"
        );
        foundWish.owner = req.user;
        if (!foundWish) {
            return res.status(404).json({
                status: "error",
                message: "Wish not found",
            });
        }

        res.status(200).json(foundWish);
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Cannot get a wish right now",
        });
    }
});

// Route to delete a wish
// DELETE /wishes/:id
router.delete("/:id", auth, async (req, res) => {
    try {
        const foundWish = await Wish.findByIdAndRemove(req.params.id);

        if (!foundWish) {
            return res.status(404).json({
                status: "error",
                message: "Wish not found",
            });
        }

        const foundWishes = await Wish.find({ owner: req.user._id }).populate(
            "owner"
        );
        res.status(200).json(foundWishes);
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Cannot delete a wish right now",
        });
    }
});

// Route to like a wish
// POST /wishes/like/:id
router.post("/like/:id", auth, async (req, res) => {
    try {
        let foundWish = await Wish.findById(req.params.id);

        const foundLike = foundWish.likes.filter(
            (like) => like.user.toString() === req.user._id.toString()
        );

        if (foundLike.length > 0) {
            const index = foundWish.likes
                .map((el) => el.user.toString())
                .indexOf(req.user._id);
            foundWish.likes.splice(index, 1);
            foundWish.count.likes -= 1;
        } else {
            foundWish.likes.unshift({
                user: req.user._id,
            });
            foundWish.count.likes += 1;
        }

        await foundWish.save();
        res.status(200).json(foundWish);
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Cannot like a wish right now",
        });
    }
});

// Route to pocket a wish
// POST /wishes/pocket/:id
router.post("/pocket/:id", auth, async (req, res) => {
    try {
        let foundWish = await Wish.findById(req.params.id);

        const foundPocket = foundWish.pockets.filter(
            (pocket) => pocket.user.toString() === req.user._id.toString()
        );

        if (foundPocket.length > 0) {
            const index = foundWish.pockets
                .map((el) => el.user.toString())
                .indexOf(req.user._id);
            foundWish.pockets.splice(index, 1);
        } else {
            foundWish.pockets.unshift({
                user: req.user._id,
            });
        }

        await foundWish.save();
        res.status(200).json(foundWish);
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Cannot pocket a wish right now",
        });
    }
});

// Route to post a comment
// /wishes/comment/:id
router.post("/comment/:id", auth, async (req, res) => {
    const { errors, isValid } = wishCommentValidation(req.body);

    //Check if the data is valid
    if (!isValid) {
        return res.status(400).json(errors);
    }

    try {
        const foundWish = await Wish.findById(req.params.id);
        const comment = {
            desc: req.body.desc,
            user: req.user._id,
        };

        foundWish.comments.unshift(comment);
        // const savedWish = await foundWish.save();
        await foundWish.save();
        // const newSavedWish = await Wish.populate(savedWish, {
        //     path: "comments.user",
        // });
        req.user.count.comments += 1;
        await req.user.save();
        res.status(200).json(foundWish);
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Cannot comment a wish right now",
        });
    }
});

// Route to delete a comment
// /wishes/comment/:id/:comment_id
router.delete("/comment/:id/:commentId", auth, async (req, res) => {
    try {
        const foundWish = await Wish.findById(req.params.id);

        if (
            foundWish.comments.filter(
                (comment) => comment._id.toString() === req.params.commentId
            ).length === 0
        ) {
            return res.status(404).json({
                status: "error",
                message: "Comment not found",
            });
        }

        const index = foundWish.comments
            .map((el) => el._id.toString())
            .indexOf(req.params.commentId);

        foundWish.comments.splice(index, 1);
        await foundWish.save();
        req.user.count.comments -= 1;
        await req.user.save();
        res.status(200).json(foundWish);
    } catch (err) {
        res.status(400).json({
            status: "error",
            message: "Cannot delete a comment at this time",
        });
    }
});

module.exports = router;
