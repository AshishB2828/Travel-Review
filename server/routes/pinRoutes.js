const router = require("express").Router();
const pinControllers = require("../controllers/pinController");
const auth  = require("../middleware/auth");
const Pin = require("../models/Pin");


router.get("/", pinControllers.getAllPins)
router.post("/",auth, pinControllers.createNewPin);
router.put("/update/:id",auth,pinControllers.updatePin);
router.delete("/delete/:id",auth, pinControllers.deletePin)


module.exports = router;