const questions = [
    {
        type: 'choice',
        text: '1. Какой результат вернёт выражение typeof NaN?',
        options: ['number', 'NaN', 'undefined', 'object'],
        correct: 0
    },

    {
        type: 'choice',
        text: '2. Что делает метод addEventListener?',
        options: ['Удаляет элемент', 'Добавляет обработчик события', 'Изменяет стиль', 'Создаёт элемент'],
        correct: 1
    },

    {
        type: 'choice',
        text: '3. Какой метод массива добавляет элемент в конец?',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correct: 0
    },

    {
        type: 'choice',
        text: '4. Какой оператор сравнивает и значение, и тип?',
        options: ['==', '===', '!=', '='],
        correct: 1
    },

    {
        type: 'choice',
        text: '5. Какой оператор используется для присваивания значения переменной?',
        options: ['==', '=', '===', '=>'],
        correct: 1
    },

    {
        type: 'text',
        text: '6. Напиши ключевое слово, с помощью которого можно объявить переменную, значение которой нельзя изменить.',
        correct: ['const', 'cnost', 'cost'],
        requiredKeyword: 'const',
        keywordsRequired: 1
    },

    {
        type: 'text',
        text: '7. Что делает метод querySelector()? Объясни коротко.',
        correct: ['находит', 'выбирает', 'элемент', 'селектор'],
        requiredKeyword: 'первый',
        keywordsRequired: 2
    },

    {
        type: 'text',
        text: '8. Как проверить, является ли число чётным? Напиши условие или ключевые части выражения.',
        correct: [
            '%', '=== 0', '== 0', 'mod', 'остаток', 'делится', 'без остатка',
            'x % 2', 'число', 'чётное', 'even', 'условие', 'if', '2'
        ],
        requiredKeyword: '%',
        keywordsRequired: 3
    },

    {
        type: 'text',
        text: '9. Что такое массив в JavaScript? Приведи пример или объясни.',
        correct: [
            'массив', 'массивы', 'array',
            '[', ']', 'скобки', 'квадратные скобки',
            'элемент', 'элементы', 'значение', 'значения',
            'индекс', 'индексы', 'по индексу', 'доступ',
            'перебор', 'перебрать', 'перебирает', 'цикл', 'for',
            'length', 'длина', 'тип', 'структура',
            'хранит', 'содержит', 'хранение', 'данные'
        ]
    },

    {
        type: 'text',
        text: '10. Что такое функция в JavaScript? Объясни коротко или приведи пример.',
        correct: [
            'функция', 'function', 'функции', 'функцией',
            '(', ')', '{', '}', '()', '{}', '=>',
            'return', 'возврат', 'вернуть',
            'аргументы', 'аргумент', 'параметры', 'параметр',
            'вызов', 'вызвать', 'объявление', 'объявить',
            'тело', 'код', 'выполняет', 'выполнить', 'выполнение',
            'действие', 'действия', 'результат', 'значение'
        ],
        keywordsRequired: 3
    }
];

let currentIndex = 0;
let score = 0;

const startBtn = document.getElementById('startBtn');
const questionContainer = document.getElementById('questionContainer');
const resultContainer = document.getElementById('resultContainer');
const restartBtn = document.getElementById('restartBtn');

startBtn.onclick = () => {
    startBtn.style.display = 'none'; // скрываем кнопку
    currentIndex = 0;
    score = 0;
    resultContainer.innerHTML = '';
    showQuestion(); // отображаем первый вопрос
};

// Отображение вопроса
function showQuestion() { // Объявляем функцию
    questionContainer.innerHTML = ''; // Очистка контейнера questionContainer, чтобы подготовить его к новому вопросу.
    const question = questions[currentIndex]; // Получение текущего вопроса — из массива questions берётся объект по индексу currentIndex.

    const questionText = document.createElement('p'); // Создание абзаца — создаётся HTML-элемент <p>, который будет содержать текст вопроса.
    questionText.textContent = question.text; // в абзац вставляется текст из свойства text текущего вопроса.
    questionContainer.appendChild(questionText); // Добавление вопроса в DOM — абзац вставляется внутрь questionContainer, чтобы отобразиться на странице.

    if (question.type === 'choice') { // Проверяем тип вопроса. Если это вопрос с вариантами (choice), переходим к созданию кнопок.
        question.options.forEach((option, i) => { // Перебираем массив вариантов ответа (options) и создаём кнопку для каждого.
            const btn = document.createElement('button'); // Создаём HTML-кнопку для варианта ответа.
            btn.textContent = option; // Устанавливаем текст кнопки — сам вариант ответа.
            btn.onclick = () => handleChoiceAnswer(i); // Назначаем обработчик клика, 
            // который передаёт индекс выбранного варианта в функцию handleChoiceAnswer.
            questionContainer.appendChild(btn); // Добавляем кнопку в DOM, чтобы она была видна пользователю.
        });
    } else if (question.type === 'text') { // Если тип вопроса — text, значит это открытый вопрос, 
        // и нужно отобразить поле ввода.
        const input = document.createElement('input'); // Создаём поле ввода для текста.
        input.type = 'text'; // Указываем, что это обычное текстовое поле.
        input.placeholder = 'Введите ответ...'; // Устанавливаем текст-подсказку внутри поля ввода.
        input.id = 'textInput'; // Присваиваем ID, чтобы потом легко получить значение.
        questionContainer.appendChild(input); // Добавляем поле ввода в DOM.

        const submitBtn = document.createElement('button'); // Создаём кнопку "Ответить".
        submitBtn.textContent = 'Ответить'; // Устанавливаем текст кнопки.
        submitBtn.onclick = () => {
            const userInput = document.getElementById('textInput').value; // Получаем значение из текстового поля.
            handleTextAnswer(userInput); // Передаём его в функцию обработки ответа.
        };
        questionContainer.appendChild(submitBtn); // Добавляем кнопку "Ответить" в DOM.
    }
}

// Функция для вопросов с вариантами ответа
function handleChoiceAnswer(index) { // Объявляем функцию
    const question = questions[currentIndex]; // Получаем текущий вопрос из массива по индексу.
    const isCorrect = index === question.correct; // Проверяем, совпадает ли выбранный вариант с правильным.

    const buttons = document.querySelectorAll('#questionContainer button'); // Получаем все кнопки вариантов ответа.
    //  Это нужно, чтобы: отключить их после выбора и изменить их стили (цвет фона)

    buttons.forEach((btn, i) => { // Начинается перебор всех кнопок. btn — сама кнопка, i — её индекс
        btn.disabled = true; // Каждая кнопка становится неактивной, чтобы пользователь не мог изменить выбор после ответа.
        if (i === question.correct) btn.style.backgroundColor = '#c8e6c9'; // Если кнопка соответствует правильному ответу.
        if (i === index && !isCorrect) btn.style.backgroundColor = '#ffcdd2'; // Если пользователь выбрал неправильный вариант.
    });

    const feedback = document.createElement('p'); //  Создаём новый элемент <p> для обратной связи.

    if (isCorrect) { // Проверяем, был ли выбран правильный вариант ответа.
        feedback.textContent = "Правильный ответ!"; // Устанавливаем текст
        feedback.style.color = "#2e7d32"; // и цвет для правильного ответа.
        score++; // Увеличиваем значение переменной score на единицую (Начисляем балл за правильный ответ.)
    } else { // Если ответ неверный 
        const correctAnswer = question.options[question.correct]; // Извлекаем правильный ответ по индексу question.correct.
        const message = `<span style="color: #d32f2f;">Неверно!</span> Правильный ответ: ${correctAnswer}`; // Формируем HTML-сообщение
        feedback.innerHTML = message; //  Вставляем HTML-сообщение в элемент <p>
    }

    questionContainer.appendChild(feedback); // Добавляем элемент обратной связи в DOM. Показываем сообщение на странице, внутри контейнера с вопросом.

    // Автоматический переход через 2 секунды
    setTimeout(nextQuestion, 2000);
}

// Функция для открытых вопросов
function handleTextAnswer(input) { // Объявляем функцию
    const question = questions[currentIndex]; // Получаем текущий вопрос
    const normalized = input.trim().toLowerCase(); // Приводим ввод к нижнему регистру и убираем лишние пробелы для надежного сравнения
    let matchCount = 0; // Счётчик совпавших ключевых слов.

    // Проверяем наличие ключевых слов
    question.correct.forEach(keyword => { // Перебираем все ключевые слова из correct
        if (normalized.includes(keyword)) matchCount++; // и увеличиваем matchCount, если они встречаются в ответе
    });

    const required = question.keywordsRequired || 1; // Устанавливаем минимальное количество ключевых слов, которое нужно для зачёта. Если не указано — по умолчанию 1.
    const requiredKeyword = question.requiredKeyword; // Извлекаем обязательное слово, если оно есть.
    const hasRequired = requiredKeyword ? normalized.includes(requiredKeyword) : true; // Проверяем, содержится ли обязательное слово в ответе. Если оно не задано — считаем, что условие выполнено.

    const enoughKeywords = matchCount >= required; // Проверка: найдено ли нужное количество ключевых слов.
    const isCorrect = enoughKeywords && hasRequired; // Итоговая проверка: ответ считается правильным, если достаточно ключевых слов и есть обязательное слово (если оно задано).

    // Удаляем старую обратную связь, если она есть
    const oldFeedback = document.getElementById("feedback");
    if (oldFeedback) oldFeedback.remove();

    // Создаём новый элемент обратной связи
    const feedback = document.createElement("p");
    feedback.id = "feedback";

    if (isCorrect) { // Если ответ правильный
        feedback.innerHTML = "Правильный ответ!";
        feedback.style.color = "#2e7d32";
        score++; // Начисляем балл
    } else { // Если ответ неверный
        let message = `<span style="color: #d32f2f;">Ответ не засчитан.</span>`;

        // Обратная связь по ключевым словам
        if (!enoughKeywords) {
            message += ` Найдено ключевых слов: ${matchCount} из ${required}.`; // Если недостаточно ключевых слов — добавляем пояснение.
        }

        // Обратная связь по обязательному слову
        if (requiredKeyword && !hasRequired) {
            message += ` Обязательное слово "<strong>${requiredKeyword}</strong>" отсутствует.`; // Если отсутствует обязательное слово — добавляем предупреждение.
        }

        feedback.innerHTML = message; // Вставляем сформированное сообщение в элемент feedback
    }

    questionContainer.appendChild(feedback); // Добавляем сообщение обратной связи в DOM, чтобы оно появилось на странице

    // Автоматический переход к следующему вопросу через 5 секунд
    setTimeout(nextQuestion, 4000);
}

// Переход к следующему вопросу
function nextQuestion() { // Объявляем функцию
    currentIndex++; // Увеличиваем индекс текущего вопроса — переходим к следующему
    if (currentIndex < questions.length) { // Проверяем: остались ли ещё вопросы в массиве questions
        showQuestion(); // Если да — вызываем функцию, которая отображает следующий вопрос.
    } else {
        showResult(); // Если вопросов больше нет — вызываем showResult() для отображения финального результата.
    }
}

function showResult() { // Объявляем функцию
    questionContainer.innerHTML = ''; // Очищаем контейнер с вопросами — скрываем всё, что было на экране
    const percent = Math.round((score / questions.length) * 100); // Вычисляем процент правильных ответов.
    resultContainer.innerHTML = `<p>Тест завершён! Ваш результат: ${percent}% (${score} из ${questions.length})</p>`; // Выводим сообщение с результатом: процент и количество правильных ответов.

    restartBtn.style.display = 'inline-block'; // Показываем кнопку "Перезапустить тест", чтобы пользователь мог пройти его снова.
    restartBtn.onclick = () => { // Назначаем обработчик клика на кнопку перезапуска.
        currentIndex = 0; // Сбрасываем индекс 
        score = 0; // и счёт — начинаем тест заново.
        resultContainer.innerHTML = ''; // Очищаем сообщение с результатом.
        restartBtn.style.display = 'none'; // Скрываем кнопку перезапуска — она снова появится после завершения нового теста.
        showQuestion(); // Показываем первый вопрос — начинается новый цикл.
    };
}

