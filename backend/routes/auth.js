const express = require('express')
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'HelloEveryone!'



// ROUTE 1: Create a User using : POST "/api/auth/createuser". Doesn't require auth

router.post('/createuser', [
  body('name', 'Password must be at least 3 Characters').isLength({ min: 3 }),
  body('email', 'Enter a Valid email').isEmail(),
  body('password', 'Password must be at least 5 Characters').isLength({ min: 5 }),

], async (req, res) => {
  // If there are errors , Return Bad Request and Error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Check Whether email resgistered or Not
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({success, error: "Sorry Email Already Registered" })
    }
    const salt = await bcrypt.genSalt(10)
    secPass = await bcrypt.hash(req.body.password, salt)
    // Creating a new User
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    success = true
    res.json({success, authtoken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");

  }

})

//ROUTE 2: Autheticate A User

router.post('/login', [
  body('email', 'Enter a Valid email').isEmail(),
  body('password', 'Password Cannot be blank').exists(),

], async (req, res) => {

  // If there are errors , Return Bad Request and Error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credientials" })
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      res.status(400).json({ success,error: "Please try to login with correct credientials" })
      success = false
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // res.json(user)
    success = true;
    res.json({ success, authtoken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }

})

//ROUTE 3: Get Login details using Post "/api/auth/getuser". login required


router.post('/getuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id
    const user = await User.findById(userId).select("-password")
    res.send(user)

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router