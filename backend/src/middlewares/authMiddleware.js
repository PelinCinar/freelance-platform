const jwt = require("jsonwebtoken");
const { accessToken, refreshToken } = require("../config/jwtConfig.js");
const RefreshToken = require("../models/RefreshToken.js");
const ROLES = require("../constants/roles.js");

//Kullanıcının kimliğini doğrulama Midd. Api isteğinde geçerli bir access token taşımasını zorunlu kıldırdık.
const verifyAccessToken = (req, res, next) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1]; //kullanıcıdan kwt token olup olmadığını ya çerezden ya da auth başlığından olup olmadığını kontrol ediuoruz
  if (!token) {
    return res.status(403).json({ message: "Access token zorunludur." });
  }
  try {
    const decoded = jwt.verify(token, accessToken.secret);//decoded değişkeni içinde token geçerli mi süresi dolmuş mu falan diye kontrol ediyoruz ve token geçerliyse tokenı çözümlüyoru ve req.user içerisinde tutatark bir sonraki middlewarede kullanılmasını sağlıyoruz.
    req.user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Geçersiz veya süresi dolmuş access token." });
  }
};

//Yenileme ve Tokenı doğrulama Midd.

const verifyRefreshToken = async (req, res, next) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;

  if (!token) {
    res.status(403).json({ message: "Refresh token zorunludur." });
  }

  try {
    const storedToken = await RefreshToken.findOne({ token }); // vtbanında bir refresh token var mı? 
    if (!storedToken) {
      return res.status(403).json({ message: "Geçersiz refresh token" });//kullancıı daha önce çıkış yaptı ya da token çalındı koş.
    }
    const decoded = jwt.verify(token, refreshToken.secret); //token geçerliyse ve süresi dolmamışsa decoded değişkenine kullancı bilgilerini hemen ata.
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") { //eğer bu hatayı alırsan hemen refreshtokendeleteone ile vtbanındaki eski refreshtokenı sil diyoruz.VE SONRASIDNA KULLANICI YENİDEN GİRİŞ YAPMAK ZORUNDA KALIR.
      await RefreshToken.deleteOne({ token });
      return res.status(403).json({ message: "Süresi dolmuş refresh token" });
    }
    return res.status(403).json({ message: "Geçersiz refresh token" });
  }
};

module.exports = { verifyAccessToken, verifyRefreshToken };
