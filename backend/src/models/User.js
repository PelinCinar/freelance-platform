const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ROLES = require("../constants/roles.js");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.EMPLOYER, ROLES.FREELANCER],
      default: ROLES.FREELANCER,
    },
  },
  { timestamps: true }
);

//Hashleme işlemlerini yapalım. pre("save") ile middlewarei ekliyoruz.
//vt kaydedilmeden önce çalışır. Şifreyi hashle ve güvenli hale getir.
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();//ismodified ile tekrar hashleme yapmaması için kullanırız
  try {
    //rastgele salt üreterek şifreyi güvenli hale getir
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);//salt ? daha güvenli hale getirmek için 10 değeri kullanılır ? 
    next();
  } catch (error) {
    next(error);
  }
});

//Kullanıcının girdiği şifre ile veritabanındaki hashlenmiş şifreyi karşılaştır.
UserSchema.methods.comparePassword = async function (password) { ///compare ile karşılaştırırız.
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model("User", UserSchema);
