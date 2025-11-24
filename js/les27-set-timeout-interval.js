// 1. Напиши функцию, которая использует `setTimeout` для создания таймера обратного отсчета. 
// Таймер должен выводить оставшееся время каждую секунду и остановиться, когда время истечет;

function countdown(seconds) {
    function updateCountdown() {
        if (seconds > 0) {
            console.log("Осталось: " + seconds + " сек.");
            seconds--; // уменьшаем значение переменной на 1 секунду
            setTimeout(updateCountdown, 1000);
        } else {
            console.log("Время вышло!");
        }
    }
    updateCountdown();
}

countdown(5);

// 2. Напиши функцию, которая использует `setInterval` 
// для вывода сообщения "Не забудь выпить воды!" каждые 30 минут;

function waterReminder() {
    console.log('Не забудь выпить воды!');
}

setInterval(waterReminder, 1800000); // 30мин * 60 * 1000 = 1.800000

// 3. Создай HTML-форму, где есть три элемента:
// - поле "Задержка"
// - поле "Текст"
// - кнопка "Начать".
// При клике на кнопку текст выводится в консоль через указанную задержку до тех пор, 
// пока пользователь снова не нажмет начать.
// Если пользователь снова нажмет на кнопку - 
// текст снова начнет выводится в консоль, нажмет еще раз - прекратит и т.д.

let intervalId = null; // Переменная, в которой будет храниться идентификатор таймера, возвращаемый функцией setInterval
// При вызове setInterval(...), JavaScript возвращает уникальный номер(ID) этого таймера.
// Этот ID нужен, чтобы потом остановить таймер через clearInterval(intervalId).
// = null — начальное значение.

let isRunning = false; // Флаг состояния: запущен ли таймер. - false — таймер не работает, true — таймер запущ

const delayEl = document.getElementById('delay'); // достаем элементы по ID -поле ввода задержки (input)
const messageEl = document.getElementById('message'); // поле ввода текста (input)
const startBtn = document.getElementById('startBtn'); // кнопка запуска/остановки

startBtn.addEventListener('click', () => { // Вешаем обработчик события на кнопку и при каждом клике запускаем функцию внутри
    const delaySec = parseInt(delayEl.value, 10); // берём значение из input и переводим в целое число (десятичная система)
    if (!Number.isFinite(delaySec) || delaySec <= 0) { 
        console.warn('Введите задержку больше 0'); // Проверка: если значение не число (NaN) или меньше/равно нулю, выводим предупреждение
        return; // - return прерывает выполнение функции, таймер не запускается.
    }

    const delayMs = delaySec * 1000; // Переводим секунды в миллисекунды (нужно для setInterval).
    const text = messageEl.value.trim() || 'Сообщение пустое'; // Берём текст из поля, trim() убирает лишние пробелы

    if (!isRunning) { // Проверяем: если таймер ещё не запущен (isRunning === false)
        intervalId = setInterval(() => {
            console.log(text);
        }, delayMs);
        // Запускаем таймер: каждые delayMs миллисекунд выводим текст в консоль
        // Сохраняем ID таймера в intervalId

        isRunning = true; // - Меняем флаг состояния на true.
        startBtn.textContent = 'Остановить'; // Меняем надпись кнопки на «Остановить».
    } else {
        clearInterval(intervalId);
        // Если таймер уже работал (isRunning === true):
        // Останавливаем таймер(clearInterval(intervalId))
        intervalId = null; // Сбрасываем ID таймера.
        isRunning = false; // Меняем флаг состояния на false.
        startBtn.textContent = 'Начать'; // Меняем надпись кнопки обратно на «Начать»   
    }
});