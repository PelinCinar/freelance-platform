const User = require("../models/User.js");

const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      password: req.user.password, //şifre döndür
      role: req.user.role, // Kullanıcının rolü varsa
      createdAt: req.user.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Sunucu hatası", error: error.message });
  }
}

// export işlemi
module.exports = { getProfile };
