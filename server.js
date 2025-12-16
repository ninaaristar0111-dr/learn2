const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Токен вашего бота и ваш ID (замените на реальные значения)
const BOT_TOKEN = '8302315415:AAGhTfLfK4Z0Ia7LkI1aiSA5vJxJO1zOD7g';
const CHAT_ID = '1066370255';


// Middleware для обработки JSON и URL-encoded данных
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Статические файлы (если есть)

// Маршрут для приёма данных из формы
app.post('/send-to-telegram', async (req, res) => {
  try {
    // Получаем данные из формы
    const { name, phone, message } = req.body;


    // Проверяем, что все поля заполнены
    if (!name || !phone || !message) {
      return res.status(400).send('Все поля обязательны для заполнения.');
    }

    // Формируем текст сообщения для Telegram
    const text = `
      Новая заявка с сайта!

      Имя: ${name}
      Телефон: ${phone}
      Сообщение: ${message}
    `;

    // Отправляем запрос к API Telegram
    await axios.get(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      params: {
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'HTML'
      }
    });

    // Отвечаем клиенту
    res.send('Заявка успешно отправлена!');
  } catch (error) {
    console.error('Ошибка при отправке в Telegram:', error.message);
    res.status(500).send('Произошла ошибка при отправке заявки.');
  }
});

// Запускаем сервер
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
