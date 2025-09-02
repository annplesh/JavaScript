// 1. Назначь для кнопки обработчик события click, который будет изменять текст этой кнопки при нажатии;

const button = document.getElementById('myButton');
button.addEventListener('click', () => {
    button.textContent = 'Кнопка нажата!';
});

// 2. Назначь для любого элемента обработчик события mouseover, который будет изменять размер элемента при наведении;

const box = document.getElementById('myBox');
box.addEventListener('mouseover', () => {
    console.log('Навели');
    box.style.fontSize = '30px';
});
box.addEventListener('mouseout', () => {
    console.log('Убрали');
    box.style.fontSize = '';
});

// 3. Назначь для инпута обработчик события keyup, который будет выводить отпущенную клавишу в консоль;

const input = document.getElementById('myInput');

input.addEventListener('keyup', (event) => {
    console.log(`Отпущена клавиша: ${event.key}`);
});

// 4. Создай форму и добавь обработчик события submit, который будет показывать сообщение об успешной отправке;

const form = document.getElementById('myForm');
const message = document.getElementById('successMessage');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // чтобы форма не перезагружала страницу и можно было показать сообщение об успешной отправке

    const name = form.name.value; // Получаем значения из полей формы для вывода
    const email = form.email.value;

    console.log('Форма отправлена');
    console.log(`Имя: ${name}`);
    console.log(`Email: ${email}`);

    message.textContent = 'Форма успешно отправлена!';
});

// 5. Пусть на странице есть кнопка с надписью 'Изменить тему', 
// которая позволяет переключать тему страницы. Например, 
// по умолчанию тема светлая: задний фон - белый, текст - черный. 
// Нажимаем на кнопку -> тема меняется на темную: цвет фона - черный, текст - белый. 
// Еще раз нажимаем на кнопку -> тема снова светлая и т. д.

const themeToggleButton = document.getElementById('themeToggle'); // получаем ссылку на кнопку, 
// чтобы назначить обработчик события

let isDark = false; // создаем переменную isDark, которая отслеживает текущую тему.
// - false означает, что сейчас активна светлая тема.

themeToggleButton.addEventListener('click', () => { // назначаем обработчик события click
    if (isDark) { // Проверяем текущее состояние темы: если тёмная, переключаем на светлую
        document.body.style.backgroundColor = 'white';
        document.body.style.color = 'black';
        console.log('Светлая тема активна');
    } else { // если светлая переключаем на темную
        document.body.style.backgroundColor = 'black';
        document.body.style.color = 'white';
        console.log('Тёмная тема активна');
    }
    isDark = !isDark; // Меняем isDark: true становится false, false — true
});

