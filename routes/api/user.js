const express = require('express');

const router = express.Router()

// controller functions
const { signupUser, loginUser } = require('../../controllers/userControllers')

// login route
router.post('/login', loginUser);

// login route
router.post('/signup', signupUser);

module.exports = router;