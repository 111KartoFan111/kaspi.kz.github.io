document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById('img-upl');
    const imgPreview = document.getElementById('img-preview');
    const uploadLabel = document.getElementById('upload-label');

    // Восстанавливаем изображение из localStorage при загрузке страницы
    const savedImage = localStorage.getItem('uploadedImage');
    if (savedImage) {
        imgPreview.src = savedImage;
        imgPreview.style.display = 'block'; // Показываем предварительный просмотр
        uploadLabel.style.display = 'none'; // Скрываем кнопку загрузки
    }

    // Обработчик события для загрузки изображения
    fileInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imgPreview.src = e.target.result;
                imgPreview.style.display = 'block'; // Показываем предварительный просмотр
                uploadLabel.style.display = 'none'; // Скрываем кнопку загрузки

                // Сохраняем изображение в localStorage
                localStorage.setItem('uploadedImage', e.target.result);
            };
            reader.readAsDataURL(file); // Читаем содержимое файла в формате base64
        }
    });
});