// config.js
const config = {
  botToken: '7627304083:AAFwcQpKZBcgi8lopCfK_g8VffNcps7ghrs', // Ваш токен бота
  chatId: '737316484', // Ваш chat_id
  webAppUrl: 'https://script.google.com/macros/s/AKfycbyTS7DlTiPKv-9wSggkex2LeM8yOhQVyHTeiAPzCM4ph690PNdWCOmx0Pc1R0pN99gZeQ/exec?callback=handleData', // URL веб-приложения
};

// Экспортируем конфигурацию
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config; // Для Node.js
} else {
  window.config = config; // Для браузера
}
