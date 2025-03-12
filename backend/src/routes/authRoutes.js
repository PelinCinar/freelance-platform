const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const {verifyAccessToken, verifyRefreshToken} = require ("../middlewares/authMiddleware.js") 

router.post("/register", authController.register);
router.post("/login", authController.login);
//Access Token süresi dolarsa yeni bir tane alması için kullan
router.post("/refresh-token", verifyRefreshToken,authController.refreshTokens);
router.post("/logout", verifyAccessToken,authController.logout);

module.exports = router;
