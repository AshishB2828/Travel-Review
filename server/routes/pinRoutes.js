const router = require("express").Router();
const pinControllers = require("../controllers/pinController");
const Pin = require("../models/Pin");


router.get("/", pinControllers.getAllPins)
router.post("/",pinControllers.createNewPin);
router.put("/update/:id",pinControllers.updatePin);
router.delete("/delete/:id", pinControllers.deletePin)


module.exports = router;