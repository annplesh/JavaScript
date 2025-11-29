// 1. Создай форму для ввода контактной информации (имя, телефон, email). 
// Сохрани данные в LocalStorage в виде объекта JSON. 
// Затем извлеки данные из LocalStorage, 
// преобразуй их обратно в объект и отобрази контактную информацию на странице;

// Находим элементы формы и блока вывода
const form = document.getElementById('contactForm');
const output = document.getElementById('output');

// Обработчик отправки формы
form.addEventListener('submit', function (event) {
    event.preventDefault(); // отменяем стандартное поведение

    // Собираем данные из полей
    const contact = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim()
    };

    // Сохраняем объект в LocalStorage как JSON-строку
    localStorage.setItem('contactInfo', JSON.stringify(contact));

    showContact(); // показывем новые данные после сохранения
});

// Извлечение и отображение данных
function showContact() {
    const savedData = localStorage.getItem('contactInfo');
    if (savedData) {
        const contactObj = JSON.parse(savedData); // преобразуем обратно в объект
        output.innerHTML = `
      <p><strong>Имя:</strong> ${contactObj.name}</p>
      <p><strong>Телефон:</strong> ${contactObj.phone}</p>
      <p><strong>Email:</strong> ${contactObj.email}</p>
    `;
    } else {
        output.innerHTML = "<p>Нет сохранённых данных</p>";
    }
}

showContact(); // показываем уже сохранённые данные при загрузке страницы

// 2. Создай приложение для учета расходов. 
// Сохрани каждую запись расхода (описание, сумма, дата) в LocalStorage в виде массива объектов JSON. 
// Затем извлеки данные из LocalStorage и отобрази список расходов. 
// Также реализуй функцию удаления записи из LocalStorage;

// Получаем элементы формы и списка
const expenseForm = document.getElementById('expenseForm');
const expenseList = document.getElementById('expenseList');

// Загружаем расходы из LocalStorage
function loadExpenses() { // функция ничего не принимает, но всегда возвращает массив расходов
    const data = localStorage.getItem('expenses'); // достаём строку по ключу "expenses" (если данных нет, вернётся null)

    return data ? JSON.parse(data) : [];
    // если данные есть → превращаем JSON-строку обратно в массив объектов
    // если данных нет → возвращаем пустой массив []
}

// Сохраняем массив расходов в LocalStorage:
// устанавливаем ключ "expenses" и преобразуем массив объектов в строку JSON
function saveExpenses(expenses) {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Вывод всех расходов в таблицу
function renderExpenses() { // функция ничего не принимает, но выводит данные в таблицу
    const expenses = loadExpenses(); // вызываем функцию loadExpenses(), которая достаёт массив объектов из LocalStorage
    expenseList.innerHTML = ''; // очищаем содержимое <tbody id="expenseList">, чтобы при перерисовке не было дублей

    expenses.forEach((expense, index) => { // Перебор массива
        // expense — текущий объект (одна запись расхода)
        // index — его порядковый номер в массиве(нужен для удаления)

        const tableRow = document.createElement('tr'); // создаём строку таблицы
        // заполняем строку данными: описание, сумма, дата, кнопка удаления

        // динамически формируем содержимое строки:
        // - описание расхода
        // - сумма (с округлением до 2 знаков)
        // - дата
        // - кнопка "Удалить", которой присваиваем data-index="${index} - это номер элемента в массиве expenses
        //   это позволяет при клике понять, какую именно запись удалить
        tableRow.innerHTML = `
            <td>${expense.description}</td>
            <td>${Number(expense.amount).toFixed(2)} руб.</td>
            <td>${expense.date}</td>
            <td><button class="delete-btn" data-index="${index}">Удалить</button></td> 
        `;

        expenseList.appendChild(tableRow); // добавляем строку в таблицу
    });
}

// Удаление записи
function deleteExpense(index) { // функция принимает параметр index — порядковый номер записи в массиве
    const expenses = loadExpenses(); // загружаем текущий массив расходов из LocalStorage
    expenses.splice(index, 1); // удаляем один элемент массива по индексу (index)
    saveExpenses(expenses); // сохраняем обновлённый массив обратно в LocalStorage
    renderExpenses(); // перерисовываем таблицу, чтобы изменения сразу отобразились на экране
}

// Делегируем обработку клика на общий контейнер expenseList
expenseList.addEventListener('click', (event) => {
    // проверяем: кликнули ли по кнопке "Удалить"
    if (event.target.classList.contains('delete-btn')) {
        // получаем индекс записи из атрибута data-index
        const index = parseInt(event.target.dataset.index, 10);
        // удаляем запись по индексу
        deleteExpense(index);
    }
});

// Обработчик отправки формы добавления расхода
expenseForm.addEventListener('submit', (event) => {
    event.preventDefault(); // отменяем стандартное поведение формы (перезагрузку страницы)

    // получаем значения из полей формы
    const description = document.getElementById('description').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const date = document.getElementById('date').value;

    // проверяем, что все поля заполнены
    if (description && amount && date) {
        const expenses = loadExpenses(); // загружаем текущий массив расходов
        expenses.push({ description, amount: parseFloat(amount), date }); // добавляем новый объект в массив
        saveExpenses(expenses); // сохраняем обновлённый массив в LocalStorage
        renderExpenses(); // перерисовываем таблицу с учётом нового расхода
        expenseForm.reset(); // очищаем форму после добавления
    }
});

// При загрузке страницы сразу показываем список
document.addEventListener('DOMContentLoaded', renderExpenses);

// 3. Создай счетчик, который отслеживает и отображает активное время пользователя на странице. 
// Время должно обновляться каждую секунду и сохраняться в SessionStorage.

let seconds = 0; // переменная для хранения количества секунд

// если в SessionStorage уже есть значение — берём его
if (sessionStorage.getItem('activeTime')) {
    seconds = parseInt(sessionStorage.getItem('activeTime'), 10);
}

// создаём элемент для отображения времени
const timerDisplay = document.createElement('div');
timerDisplay.id = 'timerDisplay';
timerDisplay.style.marginTop = '20px';
timerDisplay.style.fontWeight = 'bold';
timerDisplay.style.fontSize = '24px';
document.body.appendChild(timerDisplay);

// функция обновления счётчика
function updateTimer() {
    seconds++; // увеличиваем время на 1 секунду
    sessionStorage.setItem('activeTime', seconds); // сохраняем в SessionStorage
    timerDisplay.textContent = `Активное время на странице: ${seconds} сек.`; // выводим на экран
}

// запускаем обновление каждую секунду
setInterval(updateTimer, 1000);

// сразу показываем текущее значение при загрузке
timerDisplay.textContent = `Активное время на странице: ${seconds} сек.`;