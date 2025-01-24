document.addEventListener('DOMContentLoaded', function () {
  // Подключаем конфигурацию
  const scriptConfig = document.createElement('script');
  scriptConfig.src = 'config.js'; // Подключаем config.js
  scriptConfig.onload = function () {
    // После загрузки config.js используем данные
    const webAppUrl = config.webAppUrl;

    // Функция для обработки данных
    window.handleData = function (data) {
      console.log('Данные получены:', data);

      // Обрабатываем технические навыки
      const technicalSkillsList = document.getElementById('technical-skills-list');
      technicalSkillsList.innerHTML = '';
      data.technicalSkills.slice(1).forEach(skill => {
        const li = document.createElement('li');
        li.className = 'tech-skill-item'; // Отдельный класс для технических навыков
        li.innerHTML = `
          <div class="skill-name">${skill[0]}</div>
          <div class="progress-bar">
            <div class="progress-bar-inner" style="width: ${skill[1] * 100}%;"></div>
          </div>
        `;
        technicalSkillsList.appendChild(li);
      });

      // Обрабатываем софт-скиллы
      const softSkillsList = document.getElementById('soft-skills-list');
      softSkillsList.innerHTML = '';
      data.softSkills.slice(1).forEach(skill => {
        const li = document.createElement('li');
        li.className = 'soft-skill-item'; // Отдельный класс для софт-скиллов
        li.innerHTML = `<div class="skill-name">${skill[0]}</div>`;
        softSkillsList.appendChild(li);
      });

      // Обрабатываем хард-скиллы
      const hardSkillsList = document.getElementById('hard-skills-list');
      hardSkillsList.innerHTML = '';
      data.hardSkills.slice(1).forEach(skill => {
        const li = document.createElement('li');
        li.className = 'hard-skill-item'; // Отдельный класс для хард-скиллов
        li.innerHTML = `<div class="skill-name">${skill[0]}</div>`;
        hardSkillsList.appendChild(li);
      });
    };

    // Загружаем данные через JSONP
    const script = document.createElement('script');
    script.src = webAppUrl;
    document.body.appendChild(script);
  };
  document.body.appendChild(scriptConfig);
});

// Функции для открытия и закрытия модального окна
function openModal() {
  document.getElementById('telegramModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('telegramModal').style.display = 'none';
}

// Обработка отправки формы
document.getElementById('telegramForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Предотвращаем стандартную отправку формы

  const botToken = config.botToken; // Используем токен из config.js
  const chatId = config.chatId; // Используем chat_id из config.js
  const username = document.getElementById('username').value;
  const message = document.getElementById('message').value;

  // Проверка длины имени и текста
  if (username.length > 20) {
    alert('Имя не должно превышать 30 символов.');
    return;
  }
  if (message.length > 350) {
    alert('Текст сообщения не должен превышать 550 символов.');
    return;
  }

  const text = `Новое сообщение от ${username}:\n${message}`;

  // Отправка сообщения через Telegram Bot API
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        closeModal(); // Закрываем модальное окно после успешной отправки
        document.getElementById('telegramForm').reset(); // Очищаем форму
      } else {
        console.error('Ошибка при отправке сообщения:', data);
      }
    })
    .catch(error => {
      console.error('Произошла ошибка при отправке сообщения:', error);
    });
});

// Закрытие модального окна при клике вне его области
window.onclick = function (event) {
  const modal = document.getElementById('telegramModal');
  if (event.target === modal) {
    closeModal();
  }
};

// Ограничение длины имени и текста
document.getElementById('username').addEventListener('input', function () {
  if (this.value.length > 30) {
    this.value = this.value.slice(0, 30); // Обрезаем текст до 30 символов
  }
});

document.getElementById('message').addEventListener('input', function () {
  if (this.value.length > 550) {
    this.value = this.value.slice(0, 550); // Обрезаем текст до 550 символов
  }
});

// Плавный скролл для пунктов меню
const menuLinks = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener("click", function (e) {
    e.preventDefault(); // Отменяем стандартное поведение ссылки
    const targetId = this.getAttribute("data-link"); // Получаем data-link
    const targetSection = document.getElementById(targetId); // Находим секцию по ID

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" }); // Плавный скролл
    }
  });
}

// Плавный скролл для кнопки "Написать сообщение" (если нужно)
const writeMessageButton = document.querySelector(".chat_telegram");
if (writeMessageButton) {
  writeMessageButton.addEventListener("click", function (e) {
    e.preventDefault(); // Отменяем стандартное поведение
    document.getElementById("buttons-blue").scrollIntoView({ behavior: "smooth" });
  });
}

// Плавный скролл для кнопки "Скачать резюме" (если нужно)
const downloadResumeButton = document.querySelector(".download_resume");
if (downloadResumeButton) {
  downloadResumeButton.addEventListener("click", function (e) {
    e.preventDefault(); // Отменяем стандартное поведение
    document.getElementById("buttons-blue").scrollIntoView({ behavior: "smooth" });
  });
}

//Принудительное скачивание
function downloadFile(event) {
  event.preventDefault(); // Отменяем стандартное поведение ссылки
  const link = document.createElement('a');
  link.href = event.target.href;
  link.download = 'resume_QA_Chechil.pdf'; // Имя файла для скачивания
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}