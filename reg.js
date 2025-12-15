document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll('.rekitem');
  const copyButtons = document.querySelectorAll('.copyimg');
  const toast = document.getElementById('copy-toast');
  let toastTimer = null;

  inputs.forEach((input, index) => {
    const savedValue = localStorage.getItem('input_' + index);
    if (savedValue) {
      input.value = savedValue;
    }
    input.addEventListener('input', function () {
      localStorage.setItem('input_' + index, input.value);
    });
  });

  // Копирование значения по клику на иконку
  copyButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const input = inputs[index];
      if (!input) return;
      const value = input.value || '';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(showToast).catch(showToast);
      } else {
        // fallback для старых браузеров
        try {
          const tmp = document.createElement('textarea');
          tmp.value = value;
          tmp.style.position = 'fixed';
          tmp.style.opacity = '0';
          document.body.appendChild(tmp);
          tmp.select();
          document.execCommand('copy');
          document.body.removeChild(tmp);
          showToast();
        } catch (e) {
          showToast();
        }
      }

      // Если клик по "Срок действия" (последняя иконка) — блокируем/разблокируем все поля
      if (index === inputs.length - 1) {
        toggleAllReadonly(inputs);
      }
    });
  });

  function showToast() {
    if (!toast) return;
    toast.classList.add('copy-toast--visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('copy-toast--visible');
    }, 1200);
  }

  function toggleAllReadonly(list) {
    if (!list || !list.length) return;
    const locked = list[0].hasAttribute('readonly');
    list.forEach((el) => {
      if (locked) {
        el.removeAttribute('readonly');
        el.classList.remove('input-locked');
      } else {
        el.setAttribute('readonly', 'readonly');
        el.classList.add('input-locked');
      }
    });
  }
});
