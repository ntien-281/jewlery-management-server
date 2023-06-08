const express = require('express');
const router = express.Router();
const userAuth = require('../../middleware/userauth.js')
const {
    login,
    signup,
} = require("../../controllers/user.controller.js");

router.post('/signup', userAuth.saveUser, signup);
router.post('/login', login);

module.exports = router;