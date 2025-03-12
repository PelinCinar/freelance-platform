const userValidationRules = require("./userValidator");

//kullanıı kaydı için doğrulama kurallarını yazacağız.
const validateRegistration = [
  userValidationRules.email,
  userValidationRules.password,
  userValidationRules.name,
];

//kullancı giriş için gerekli doğrulama kurallını yazacğaız bu sefer

const validateLogin = [userValidationRules.email, userValidationRules.password];

module.exports = { validateRegistration, validateLogin };
