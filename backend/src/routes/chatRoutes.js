const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');
const authMiddleware = require('../middlewares/authMiddleware');

// Yeni mesaj gönderme
router.post('/send', authMiddleware.verifyAccessToken, messageController.sendMessage);

// Kullanıcının mesajlarını alma
router.get('/messages/:userId', authMiddleware.verifyAccessToken, messageController.getMessages);

module.exports = router;
