const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.get("/profile", authMiddleware.verifyAccessToken, userController.getProfile);  

module.exports = router;
