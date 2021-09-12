const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const userController = require("../controllers/userController");

router.post("/register", userController.registerNewUser);

router.post("/login", userController.loginNewUser);

module.exports = router;