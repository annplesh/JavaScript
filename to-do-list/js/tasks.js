import { loadFromLocalStorage, saveToLocalStorage } from "./storage.js";

/**
 * Получает список задач из Local Storage.
 *
 * @function getTasks
 * @returns {Array<Object>} Массив задач. Если данных нет — возвращает пустой массив.
 *
 * @example
 * const tasks = getTasks();
 * console.log(tasks.length); // количество задач
 */
export function getTasks() {
    return loadFromLocalStorage("my_tasks");
}

/**
 * Добавляет новую задачу в список.
 *
 * Основные шаги:
 * 1. Получает текущие задачи через {@link getTasks}.
 * 2. Создаёт объект новой задачи:
 *    - `id` — уникальный UUID.
 *    - `title` — заголовок задачи.
 *    - `completed` — статус выполнения (по умолчанию `false`).
 *    - `reminder` — напоминание (по умолчанию `null`).
 * 3. Добавляет задачу в начало массива.
 * 4. Сохраняет обновлённый список в Local Storage.
 *
 * @function addTask
 * @param {string} title - Заголовок новой задачи.
 * @returns {Object} Объект добавленной задачи.
 *
 * @example
 * const task = addTask("Купить хлеб");
 * console.log(task.id); // уникальный идентификатор
 */
export function addTask(title) {
    const tasks = getTasks();
    const newTask = {
        id: crypto.randomUUID(), // уникальный UUID
        title,
        completed: false,
        reminder: null
    };
    tasks.unshift(newTask); // добавляем в начало массива
    saveToLocalStorage("my_tasks", tasks);
    return newTask;
}

/**
 * Удаляет задачу по её идентификатору.
 *
 * @function deleteTask
 * @param {string} id - Уникальный идентификатор задачи.
 * @returns {void}
 *
 * @example
 * deleteTask("123e4567-e89b-12d3-a456-426614174000");
 */
export function deleteTask(id) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage("my_tasks", tasks);
}

/**
 * Переключает статус выполнения задачи (completed).
 *
 * Основные шаги:
 * 1. Получает список задач.
 * 2. Находит задачу по идентификатору.
 * 3. Инвертирует её свойство `completed`.
 * 4. Сохраняет обновлённый список.
 *
 * @function toggleTask
 * @param {string} id - Уникальный идентификатор задачи.
 * @returns {void}
 *
 * @example
 * toggleTask("123e4567-e89b-12d3-a456-426614174000");
 */
export function toggleTask(id) {
    const tasks = getTasks();
    const updated = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveToLocalStorage("my_tasks", updated);
}

/**
 * Устанавливает напоминание для задачи.
 *
 * Основные шаги:
 * 1. Получает список задач.
 * 2. Находит задачу по идентификатору и добавляет ей свойство `reminder`.
 * 3. Сохраняет обновлённый список.
 * 4. Запускает таймер (`setTimeout`), который через указанное время
 *    показывает уведомление с заголовком задачи.
 *
 * @function setReminder
 * @param {string} id - Уникальный идентификатор задачи.
 * @param {number} seconds - Время напоминания в секундах.
 * @returns {void}
 *
 * @example
 * setReminder("123e4567-e89b-12d3-a456-426614174000", 60);
 * // Через минуту появится alert с текстом задачи
 */
export function setReminder(id, seconds) {
    const tasks = getTasks();
    const updated = tasks.map(task =>
        task.id === id ? { ...task, reminder: seconds } : task
    );
    saveToLocalStorage("my_tasks", updated);

    // запускаем таймер для уведомления
    const ms = seconds * 1000;
    const task = updated.find(t => t.id === id);

    setTimeout(() => {
        alert(`⏰ Пора заняться задачей: «${task.title.trim()}»`);
    }, ms);
}