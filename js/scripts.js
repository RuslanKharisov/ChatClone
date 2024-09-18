const textarea = document.getElementById("prompt-textarea");
const sendButton = document.querySelector(".dialog__send-button");
const theme = document.querySelector("#theme");
const wellcome__page = document.getElementById("wellcome__page");
const btns_grid = document.getElementById("btns_grid");
const chat = document.getElementById("chat");

theme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Применить тему при загрузке страницы
const systemPrefersDark = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

applyTheme(systemPrefersDark ? "dark" : "light");
// / Применить тему при загрузке страницы

sendButton.addEventListener("click", (event) => {
  event.preventDefault();
  console.log("click");
  wellcome__page.style.display = "none";
  btns_grid.style.display = "none";
  if (
    wellcome__page.style.display === "none" &&
    btns_grid.style.display === "none"
  ) {
    chat.style.display = "block";
  }
});

initPopoverAuth();
initModalClearChat();
initPopoverAdditional();

textarea.addEventListener("input", function () {
  if (textarea.textContent.trim() !== "") {
    textarea.classList.add("has-content");
    sendButton.disabled = false;
  } else {
    textarea.classList.remove("has-content");
    sendButton.disabled = true;
  }
});

if (textarea.textContent.trim() !== "") {
  textarea.classList.add("has-content");
  sendButton.disabled = false;
} else {
  textarea.classList.remove("has-content");
  sendButton.disabled = true;
}

// Инициализация popover с авторизацией
function initPopoverAuth() {
  // Кнопка при нажатии на которую будет высвечиваться popup
  const popoverAuthTrigger = document.getElementById("popover-auth--trigger");

  // Сам popup
  const popoverAuth = document.getElementById("popover-auth");

  // Показываем popover при клике на триггер
  popoverAuthTrigger.addEventListener("click", (event) => {
    event.stopPropagation(); // Останавливаем всплытие события

    if (popoverAuth.classList.contains("active")) {
      popoverAuth.classList.remove("active");
    } else {
      popoverAuth.classList.add("active");
    }
  });

  // Убираем активность при клике вне popoverAuth
  document.addEventListener("click", (event) => {
    if (
      !popoverAuth.contains(event.target) &&
      event.target !== popoverAuthTrigger
    ) {
      popoverAuth.classList.remove("active");
    }
  });

  // Останавливаем всплытие события, чтобы клик на popover не закрыл его
  popoverAuth.addEventListener("click", (event) => {
    event.stopPropagation();
  });
}

// Инициализация модального окна для очистки чата
function initModalClearChat() {
  // Кнопка при нажатии на которую будет высвечиваться модалка
  const clearChatTrigger = document.getElementById("clearChat--trigger");
  const clearChatClose = document.getElementById("clearChat--close");

  // Сама модалка
  const clearChat = document.getElementById("clearChat");

  // Открытие
  clearChatTrigger.addEventListener("click", () => {
    clearChat.classList.add("active");
  });

  // Закрытие
  clearChatClose.addEventListener("click", () => {
    clearChat.classList.remove("active");
  });

  // Закрытие модального окна при клике вне модального окна
  clearChat.addEventListener("click", (event) => {
    if (event.target === clearChat) {
      clearChat.classList.remove("active");
    }
  });
}

// Инициализация popover при нажатии на знак вопроса внизу справа
function initPopoverAdditional() {
  const popover = document.getElementById("popover-additional");
  const trigger = document.getElementById("popover-additional--trigger");

  trigger.addEventListener("click", () => {
    popover.classList.toggle("visible");
  });

  // Закрытие поповера при клике вне его области
  document.addEventListener("click", (event) => {
    if (!popover.contains(event.target) && !trigger.contains(event.target)) {
      popover.classList.remove("visible");
    }
  });
}

// Добавление ночного режима
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    document.body.classList.remove("light-theme");
  } else {
    document.body.classList.add("light-theme");
    document.body.classList.remove("dark");
  }
}

// document.addEventListener('DOMContentLoaded', () => {
//   const textarea = document.getElementById('prompt-textarea');
//   const sendButton = document.querySelector('.dialog__send-button');

//   // Обработчик ввода текста
//   textarea.addEventListener('input', function() {
//       // Проверяем, содержит ли textarea текст
//       if (textarea.textContent.trim() !== '') {
//           textarea.classList.add('has-content');
//           sendButton.disabled = false;
//       } else {
//           textarea.classList.remove('has-content');
//           sendButton.disabled = true;
//       }
//   });

//   // Обработчик события paste для очистки HTML-кода и вставки только текста
//   textarea.addEventListener('paste', function(e) {
//       e.preventDefault(); // Предотвращаем стандартное поведение вставки

//       // Получаем текст из буфера обмена
//       navigator.clipboard.readText().then(text => {
//         // Вставляем только текст, без HTML
//         const range = document.createRange();
//         const sel = window.getSelection();
//         range.selectNodeContents(textarea);
//         range.collapse(false);
//         sel.removeAllRanges();
//         sel.addRange(range);
//         document.execCommand('insertText', false, text);

//           // Обновляем состояние кнопки отправки
//           if (textarea.textContent.trim() !== '') {
//               textarea.classList.add('has-content');
//               sendButton.disabled = false;
//           } else {
//               textarea.classList.remove('has-content');
//               sendButton.disabled = true;
//           }
//       }).catch(err => {
//           console.error('Не удалось прочитать содержимое буфера обмена: ', err);
//       });
//   });

//   // Инициализация состояния кнопки отправки на основе начального содержимого
//   if (textarea.textContent.trim() !== '') {
//       textarea.classList.add('has-content');
//       sendButton.disabled = false;
//   } else {
//       textarea.classList.remove('has-content');
//       sendButton.disabled = true;
//   }
// });
