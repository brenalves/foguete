const { Router } = require("express");

const router = Router();

const userController = require("./controllers/userController");

router.post("/user/create", userController.create);
router.get("/user/", userController.get);

module.exports = router;