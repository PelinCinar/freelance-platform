const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const {verifyAccessToken, verifyRefreshToken,} = require("../middlewares/authMiddleware.js");
const { validateRegistration, validateLogin,} = require("../validators/authValidator.js");
const validate = require("../middlewares/validatorMiddleware.js");

router.post( "/register",validateRegistration, validate, authController.register);
router.post("/login", validateLogin, validate, authController.login);
//Access Token süresi dolarsa yeni bir tane alması için kullan
router.post("/refresh-token", verifyRefreshToken, authController.refreshTokens);
router.post("/logout", verifyAccessToken, authController.logout);

module.exports = router;
