const router = require("express").Router();
const pinControllers = require("../controllers/pinController");
const Pin = require("../models/Pin");

//create a pin
router.post("/",pinControllers.createNewPin);
// get all pins
router.get("/", pinControllers.getAllPins)

module.exports = router;