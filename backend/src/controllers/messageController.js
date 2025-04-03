const Message = require('../models/Message');

// Mesaj gönderme işlemi
const sendMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;

  try {
    // Yeni mesajı kaydet
    const newMessage = new Message({
      sender,
      receiver,
      content,
    });

    await newMessage.save();

    // Mesaj başarılı şekilde kaydedildiyse yanıt gönder
    res.status(201).json({
      message: 'Mesaj başarıyla gönderildi',
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ error: 'Mesaj gönderilirken hata oluştu' });
  }
};

// Kullanıcının mesajlarını alma
const getMessages = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Kullanıcının gönderdiği ve aldığı mesajları al
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }],
    })
      .populate('sender', 'username') // Gönderen kullanıcının ismini de dahil et
      .populate('receiver', 'username'); // Alıcı kullanıcının ismini de dahil et

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Mesajlar alınırken hata oluştu' });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
