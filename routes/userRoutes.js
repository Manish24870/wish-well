const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const path = require("path");

const User = require("../models/userModel");
const Wish = require("../models/wishModel");
const auth = require("../utils/auth");
const registerValidation = require("../validation/registerValidation");
const loginValidation = require("../validation/loginValidation");

const router = express.Router();

// Route to register a new user
// POST /users/register
router.post("/register", async (req, res) => {
  const { errors, isValid } = registerValidation(req.body);

  //Check if the data is valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    //check if the email is already taken
    const userFound = await User.findOne({
      email: req.body.email,
    });

    if (userFound) {
      errors.email = "This email is taken";
      return res.status(400).json(errors);
    }

    //create a new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      avatar: "defaultuser.jpg",
    });
    await newUser.save();
    newUser.password = undefined;

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "Cannot register a user right now",
    });
  }
});

// Route to login a user
// POST /users/login
router.post("/login", async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET;
  const { errors, isValid } = loginValidation(req.body);

  //Check if the data is valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    //Check if the user exists
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Compare password
    const match = await bcrypt.compare(req.body.password, foundUser.password);
    if (match) {
      //Create a jwt
      const payload = {
        _id: foundUser._id,
        username: foundUser.username,
        avatar: foundUser.avatar,
      };

      const token = jwt.sign(payload, jwtSecret);
      res.status(200).json({
        token: "Bearer " + token,
      });
    } else {
      errors.password = "Incorrect password";
      return res.status(400).json(errors);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: "Cannot login a user right now",
    });
  }
});

// ##########################################
// PROFILE ROUTES
// ##########################################

// Route to get your profile
// GET /users/profile
router.get("/profile", auth, async (req, res) => {
  const user = req.user;
  const wishesCount = await Wish.countDocuments({ owner: req.user._id });
  const commentsFetch = await User.findById(req.user._id).select("count -_id");
  const commentsCount = commentsFetch.count.comments;
  const likesFetch = await Wish.find({ owner: req.user._id }).select(
    "likes -_id"
  );
  let likesCount = 0;
  likesFetch.forEach((like) => {
    likesCount = likesCount + like.likes.length;
  });

  res.status(200).json({
    user: req.user,
    count: {
      wishesCount,
      commentsCount,
      likesCount,
    },
  });
});

// Route to edit the username
// POST /users/profile/newusername
router.post("/profile/newusername", auth, async (req, res) => {
  const foundUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      username: req.body.username,
    },
    { new: true }
  );
  res.status(200).json(foundUser);
});

// Route to edit password
// POST /users/profile/newpassword
router.post("/profile/newpassword", auth, async (req, res) => {
  const foundUser = await User.findById(req.user._id);
  foundUser.password = req.body.password;
  await foundUser.save();
  res.status(200).json(foundUser);
});

const appDir = path.dirname(require.main.filename);
// SET MULTER CONFIG
const storage = multer.diskStorage({
  destination: `${appDir}/images/`,
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("avatar");

// Route to upload a profile picture
// POST /users/profile/avatar
router.post("/profile/avatar", auth, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({
        status: "error",
        message: "Image upload failed",
      });
    } else {
      const appDir = path.dirname(require.main.filename);
      req.user.avatar = req.file.filename;
      await req.user.save();
      res.send(req.user);
    }
  });
});

// Route to delete a user
// POST /users/delete
// router.delete("/delete", auth, async (req, res) => {
//     try {
//         const user = await User.findByIdAndRemove(req.user._id);
//         res.status(200).json(user);
//     } catch (e) {
//         res.status(500).send({
//             status: "error",
//             message: "Failed to delete user",
//         });
//     }
// });

module.exports = router;
