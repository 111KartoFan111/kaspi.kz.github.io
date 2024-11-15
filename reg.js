document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll('.rekitem');

  inputs.forEach((input, index) => {
    const savedValue = localStorage.getItem('input_' + index);
    if (savedValue) {
      input.value = savedValue;
    }
    input.addEventListener('input', function () {
      localStorage.setItem('input_' + index, input.value);
    });
  });
});
