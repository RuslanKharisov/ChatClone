const textarea = document.getElementById("prompt-textarea");
const sendButton = document.querySelector(".dialog__send-button");

initPopoverAuth();

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
  const popoverAuth = document.getElementById("popover-auth");
  const popoverAuthTrigger = document.getElementById("popover-auth--trigger");

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
