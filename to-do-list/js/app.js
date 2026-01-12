import { getTasks } from "./tasks.js";
import { initEvents } from "./events.js";
import { renderTasks } from "./render.js";
import { saveToLocalStorage } from "./storage.js";

/**
 * Загружает задачи с сервера (JSONPlaceholder) и сохраняет их в Local Storage.
 *
 * Основные шаги:
 * 1. Делает запрос к API `https://jsonplaceholder.typicode.com/todos`.
 * 2. Ограничивает количество задач параметром `limit` (по умолчанию 5).
 * 3. Преобразует задачи в нормализованный формат:
 *    - `id` — уникальный идентификатор с префиксом `server-`.
 *    - `title` — заголовок задачи.
 *    - `completed` — статус выполнения.
 *    - `reminder` — напоминание (по умолчанию `null`).
 * 4. Сохраняет задачи в Local Storage под ключом `"my_tasks"`.
 * 5. Вызывает {@link renderTasks} для отображения списка.
 *
 * При ошибке:
 * - Логирует сообщение в консоль.
 * - Вызывает {@link renderTasks}, чтобы обновить интерфейс.
 * - TODO: Оптимизация — можно обновлять только сообщение/состояние,
 *   а не перерисовывать весь список.
 *
 * @async
 * @function loadServerTasks
 * @param {number} [limit=5] - Количество задач для загрузки.
 * @returns {Promise<void>} Ничего не возвращает, только обновляет Local Storage и UI.
 *
 * @example
 * // Загрузить 10 задач с сервера:
 * await loadServerTasks(10);
 */
async function loadServerTasks(limit = 5) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
        const serverTasks = await response.json();

        const normalized = serverTasks.map(t => ({
            id: `server-${t.id}`,   // уникальный ID
            title: t.title,
            completed: t.completed,
            reminder: null
        }));

        saveToLocalStorage("my_tasks", normalized);
        renderTasks();
    } catch (err) {
        console.error("Ошибка загрузки:", err);
        renderTasks();
        // TODO: Оптимизация: при ошибке можно обновлять только сообщение/состояние,
        // а не весь список
    }
}

/**
 * Инициализирует приложение.
 *
 * Основные шаги:
 * 1. Получает задачи из Local Storage через {@link getTasks}.
 * 2. Если задач нет:
 *    - Загружает задачи с сервера через {@link loadServerTasks}.
 * 3. Если задачи есть:
 *    - Отрисовывает их через {@link renderTasks}.
 *    - TODO: Оптимизация — можно отрисовывать только новые/изменённые задачи,
 *      а не весь список.
 * 4. Инициализирует обработчики событий через {@link initEvents}.
 *
 * @function initApp
 * @returns {void} Ничего не возвращает, только запускает приложение.
 *
 * @example
 * // Запуск приложения:
 * document.addEventListener("DOMContentLoaded", () => {
 *     initApp();
 * });
 */
function initApp() {
    const localTasks = getTasks();

    if (localTasks.length === 0) {
        // если задач нет — грузим с сервера
        loadServerTasks();
    } else {
        // если задачи уже есть — просто отрисовываем
        renderTasks();
        // TODO: Оптимизация: можно отрисовывать только новые/изменённые задачи,
        // а не весь список
    }

    initEvents();
}

initApp();