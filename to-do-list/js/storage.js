/**
 * Загружает данные из Local Storage по указанному ключу.
 *
 * @param {string} [key="my_tasks"] - Имя ключа в Local Storage.
 * @returns {Array} - Массив объектов или пустой массив.
 *
 * @example
 * // Загрузить задачи по умолчанию:
 * const tasks = loadFromLocalStorage();
 *
 * @example
 * // Загрузить данные по другому ключу:
 * const notes = loadFromLocalStorage("my_notes");
 */
export function loadFromLocalStorage(key = "my_tasks") {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
}

/**
 * Сохраняет данные в Local Storage по указанному ключу.
 *
 * @param {string} [key="my_tasks"] - Имя ключа в Local Storage.
 * @param {Array|Object} tasks - Данные для сохранения.
 * @returns {void}
 *
 * @example
 * // Сохранить массив задач:
 * saveToLocalStorage("my_tasks", [{ id: 1, title: "Купить хлеб" }]);
 *
 * @example
 * // Сохранить объект заметок:
 * saveToLocalStorage("my_notes", { id: 1, text: "Встреча в 15:00" });
 */
export function saveToLocalStorage(key = "my_tasks", tasks) {
    localStorage.setItem(key, JSON.stringify(tasks));
}