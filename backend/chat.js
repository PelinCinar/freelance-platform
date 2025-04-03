module.exports = (io) => {
    // Aktif kullanıcılar Map'ini tanımlıyoruz
    const activeUsers = new Map();
    
    // Geçmiş mesajlar dizisi (Bu diziyi veritabanına kaydedebilirsiniz, şu anlık hafızada tutuyoruz)
    const messageHistory = [];

    // Online kullanıcı sayısını güncelle ve gönder
    const updateOnlineUsers = () => {
        io.emit('onlineUsers', {
            count: activeUsers.size,
            users: Array.from(activeUsers.values())
        });
    };

    // Socket bağlantılarını dinle
    io.on('connection', (socket) => {
        console.log('Yeni bir kullanıcı bağlandı:', socket.id);

        // Kullanıcı adı ayarlandığında
        socket.on('setUsername', (username) => {
            // Kullanıcıyı aktif kullanıcılar listesine ekle
            activeUsers.set(socket.id, username);
            console.log(`${username} sohbete katıldı`);
            
            // Yeni kullanıcıya geçmiş mesajları gönder
            socket.emit('messageHistory', messageHistory);

            // Online kullanıcı sayısını güncelle
            updateOnlineUsers();
        });

        // Kullanıcı mesaj gönderdiğinde
        socket.on('sendMessage', (data) => {
            // Mesajı tüm bağlı kullanıcılara ilet
            const messageData = {
                userId: socket.id,
                username: activeUsers.get(socket.id),
                text: data.text,
                timestamp: new Date()
            };

            // Mesajı geçmişe ekle
            messageHistory.push(messageData);
            
            // Geçmiş mesajlar 1000'den fazla olursa ilk mesajı sil
            if (messageHistory.length > 1000) {
                messageHistory.shift();
            }

            // Mesajı tüm kullanıcılara ilet
            io.emit('message', messageData);
        });

        // Kullanıcı yazıyor durumunu gönderdiğinde
        socket.on('typing', (data) => {
            // Diğer kullanıcılara bildir
            socket.broadcast.emit('userTyping', {
                userId: socket.id,
                username: activeUsers.get(socket.id),
                isTyping: data.isTyping
            });
        });

        // Kullanıcı bağlantısı koptuğunda
        socket.on('disconnect', () => {
            const username = activeUsers.get(socket.id);
            console.log(`${username || 'Bir kullanıcı'} ayrıldı:`, socket.id);
            // Kullanıcıyı aktif listeden çıkar
            activeUsers.delete(socket.id);
            // Online kullanıcı sayısını güncelle
            updateOnlineUsers();
        });
    });
};
