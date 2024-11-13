const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const JWT_SECRET = 'Harryisagoodboy';

//Route 1: Creating a user using POST request hit at "/api/auth/createUser". No login required (Signup) 
router.post(
  "/createUser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    
    let success = false;

    //If errors are encountered return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
      //Check whether the user with the given email exists
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "User with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPwd = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPwd,
        email: req.body.email,
      });

      data = {
        user: {
          id: user.id, // id of the user in the MongoDb database
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET)
      //the jwt.sign is a sync function thus, there is no need of using async-await
      success=true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message })
    }
  }
);

//Route 2: Loggin in a user using POST request hit at "/api/auth/login".(Signin) 
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be empty/blank").exists(),
  ],
  async (req, res) => {

    let success = false;
    //If errors are encountered return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      //Check whether the user with the given email exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: "No user found" });
      }

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return res.status(400).json({ success, error: "Please try to login with correct credentials" });
      }

      data = {
        user: {
          id: user.id, // id of the user in the MongoDb database
        }
      }
      const authToken = jwt.sign(data, JWT_SECRET);

      success = true;

      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ success, message: error.message })
    }
  }
);

//Route 3: GET loggedin user's details using POST request hit at "/api/auth/getUser". Login required
router.post("/getUser", fetchUser, async (req, res) => {

  // fetchUser is called first and then below code runs as next() function
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message })
  }
});

module.exports = router;
