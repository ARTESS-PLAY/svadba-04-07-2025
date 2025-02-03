const urlLink =
    'https://api.telegram.org/bot6681287357:AAG2v9iKhXAo6tW54B3rgHYNkI7tb8QoS-U/sendMessage?chat_id=-1002360337120&parse_mode=html&text=';

document.querySelector('.submit').addEventListener('click', function () {
    // Получение значений полей
    const name = document.getElementById('name').value.trim();
    const secondName = document.getElementById('second-name').value.trim();

    const will = document.querySelector('.will');
    const notWill = document.querySelector('.notwill');

    const errorMessages = [];
    const errorContainer = document.getElementById('error-messages');
    errorContainer.innerHTML = ''; // Очищаем ошибки перед новой проверкой

    // Проверяем, выбран ли статус
    if (!will.classList.contains('selected') && !notWill.classList.contains('selected')) {
        errorMessages.push('Выберите статус "БУДУ" или "НЕ СМОГУ".');
    }

    const can = will.classList.contains('selected');

    // Проверяем, заполнены ли все поля
    if (!name) errorMessages.push('Пожалуйста, введите ваше имя.');
    if (!secondName) errorMessages.push('Пожалуйста, введите вашу фамилию.');

    if (errorMessages.length > 0) {
        // Если есть ошибки, отображаем их
        errorMessages.forEach((msg) => {
            const error = document.createElement('div');
            error.style.color = 'red';
            error.textContent = msg;
            errorContainer.appendChild(error);
        });
    } else {
        // Если ошибок нет, выполняем AJAX-запрос
        errorContainer.style.color = '#464562';
        errorContainer.textContent = 'Спасибо! Форма успешно отправлена.';
        console.log('тут ajax');

        let str = `<b>Новый ответ на приглашение:</b>\n<b>Имя:</b> ${name}\n<b>Фамилия:</b> ${secondName} \n<b>${
            can ? 'Буду' : 'Не буду'
        }</b>`;
        fetch(encodeURI(urlLink + str));
    }
});

// Добавляем логику для выбора статуса
document.querySelector('.will').addEventListener('click', function () {
    this.classList.add('selected');
    document.querySelector('.notwill').classList.remove('selected');
});

document.querySelector('.notwill').addEventListener('click', function () {
    this.classList.add('selected');
    document.querySelector('.will').classList.remove('selected');
});

document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 1000, // Глобальная длительность
        once: true, // Анимация запускается только один раз
    });
});
