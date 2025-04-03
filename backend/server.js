require("dotenv").config(); // .env dosyasını yükle
const express = require("express"); // express'i dahil et
const path = require('path'); // path modülünü dahil et
const connectDB = require("./src/config/dbConfig"); // Veritabanı bağlantısı
const http = require("http"); // http modülünü dahil et
const socketIo = require("socket.io"); // socket.io'yu dahil et

const app = express(); // express uygulamasını başlat
const PORT = process.env.PORT || 5000; // Portu ayarla


app.use(express.static(path.join(__dirname, 'src', 'views')));

app.get('/chat.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'views', 'chat.html'));
});

// HTTP sunucusunu oluştur
const server = http.createServer(app);

// Socket.io yapılandırması
const io = socketIo(server, {
  cors: {
    origin: "*", // Güvenlik için production'da spesifik domain belirtilmeli
    methods: ["GET", "POST"]
  }
});

connectDB();

//! chat.js modülünü dahil ediyoruz
const chatHandler = require('./chat'); // chat.js dosyasını dahil et

chatHandler(io);// Socket.io işlevlerini chat.js dosyasından alıyoruz


server.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
