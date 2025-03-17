//Frontend üzerinden fetchleme işlemli ile swaggerapiye erişmek isterse o zaman corsa ihtiyac var.
//Sadece tarayıcı bazlı istekleri kontrol eder. fronttan backende istek atarsan cors devreye girer
const corsOptions = {
    origin: function (origin, callback) {
      // İzin verilen origins listesi
      const whiteList = [
        "http://localhost:8080",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
      ];
  
      if (whiteList.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("CORS politikası tarafından engellendiniz."));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    maxAge: 86400, // 24 saat
  };
  
  module.exports = corsOptions; 