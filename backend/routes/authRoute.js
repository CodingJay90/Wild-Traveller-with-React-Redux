const router = require('express').Router()
const isLoggedIn = require("../middleware/isLoggedIn");

const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//HANDLE SIGNUP LOGIC
router.post("/register", async (req, res) => {
  const { email, username, avatar, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt
    .hash(password, salt)
    .catch((err) => console.log(err));

  try {
    const newUser = await User.create({
      email,
      avatar,
      username,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id, username: username }, "secret key");
    res.header("Authorization", token);
    res.status(200).json({success: true, user: newUser, token });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({success: false, message:err.message});
  }
});

//HANDLE LOGIN LOGIC  
router.post('/login', async (req, res) => {
   try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      console.log("User not found");
      return res.json({success: false, message:"User not found"});
    }
    const validatePassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validatePassword) {
      return res.json({success: false, error: "Invalid Credentials. Password do not match" });
    }
    const token = jwt.sign({ id: foundUser._id, username: foundUser.username }, "secret key");
    res.status(200).json({success: true, token, user: foundUser})
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ success: false, message: err.message });
    }
})

//ACCESS USER
router.get("/user", isLoggedIn, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user))
    .catch(err => console.log(err));
});

module.exports = router