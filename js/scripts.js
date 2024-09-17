// const textarea = document.getElementById('prompt-textarea');
// const sendButton = document.querySelector('.dialog__send-button')

// textarea.addEventListener('input', function() {
//   if (textarea.textContent.trim() !== '') {
//     textarea.classList.add('has-content');
//     sendButton.disabled = false;
//   } else {
//     textarea.classList.remove('has-content');
//     sendButton.disabled = true;
//   }
// });

// if (textarea.textContent.trim() !== '') {
//   textarea.classList.add('has-content');
//   sendButton.disabled = false;
// } else {
//   textarea.classList.remove('has-content');
//   sendButton.disabled = true;
// }

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.getElementById('prompt-textarea');
  const sendButton = document.querySelector('.dialog__send-button');

  // Обработчик ввода текста
  textarea.addEventListener('input', function() {
      // Проверяем, содержит ли textarea текст
      if (textarea.textContent.trim() !== '') {
          textarea.classList.add('has-content');
          sendButton.disabled = false;
      } else {
          textarea.classList.remove('has-content');
          sendButton.disabled = true;
      }
  });

  // Обработчик события paste для очистки HTML-кода и вставки только текста
  textarea.addEventListener('paste', function(e) {
      e.preventDefault(); // Предотвращаем стандартное поведение вставки

      // Получаем текст из буфера обмена
      navigator.clipboard.readText().then(text => {
        // Вставляем только текст, без HTML
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(textarea);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        document.execCommand('insertText', false, text);

          // Обновляем состояние кнопки отправки
          if (textarea.textContent.trim() !== '') {
              textarea.classList.add('has-content');
              sendButton.disabled = false;
          } else {
              textarea.classList.remove('has-content');
              sendButton.disabled = true;
          }
      }).catch(err => {
          console.error('Не удалось прочитать содержимое буфера обмена: ', err);
      });
  });

  // Инициализация состояния кнопки отправки на основе начального содержимого
  if (textarea.textContent.trim() !== '') {
      textarea.classList.add('has-content');
      sendButton.disabled = false;
  } else {
      textarea.classList.remove('has-content');
      sendButton.disabled = true;
  }
});