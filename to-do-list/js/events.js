import { addTask } from "./tasks.js";
import { renderTasks } from "./render.js";

/**
 * Инициализирует обработчики событий для интерфейса списка задач.
 *
 * Основные функции:
 * 
 * 1. Валидация ввода:
 *    - Кнопка «Добавить» блокируется, если поле ввода пустое.
 *    - Поле ввода подсвечивается классом `.input-error` при пустом значении.
 *    - После добавления задачи поле очищается, подсветка убирается,
 *      а кнопка снова блокируется.
 *
 * 2. Добавление новой задачи:
 *    - Проверяет корректность ввода (не допускает пустые строки).
 *    - Вызывает функцию {@link addTask} для сохранения задачи.
 *    - Перерисовывает список задач через {@link renderTasks}.
 *
 * 3. Фильтрация задач:
 *    - Использует кнопки с классом `.filter-button` и атрибутом `data-filter`.
 *    - При клике:
 *        • снимает класс `.active` со всех кнопок,
 *        • добавляет `.active` на выбранную,
 *        • получает значение фильтра из `data-filter`,
 *        • вызывает {@link renderTasks} с этим фильтром.
 *    - Поддерживаемые фильтры:
 *        • "all" — отображает все задачи,
 *        • "completed" — только завершённые,
 *        • "incomplete" — только незавершённые.
 *
 * @function initEvents
 * @returns {void} Ничего не возвращает, только навешивает события на элементы DOM.
 *
 * @example
 * // Инициализация событий при загрузке страницы:
 * document.addEventListener("DOMContentLoaded", () => {
 *     initEvents();
 * });
 */

export function initEvents() {
    const addBtn = document.getElementById("add-task");
    const input = document.getElementById("new-task");

    // Следим за вводом: активируем кнопку только если поле непустое
    input.addEventListener("input", () => {
        const hasValue = input.value.trim();
        addBtn.disabled = !hasValue;

        if (hasValue) {
            input.classList.remove("input-error");
        } else {
            input.classList.add("input-error");
        }
    });

    addBtn.addEventListener("click", () => {
        const title = input.value.trim();

        if (!title) {
            // если поле пустое — подсветка, без добавления задачи
            input.classList.add("input-error");
            return;
        }

        addTask(title);
        input.value = ""; // очистка поля
        addBtn.disabled = true; // снова блокируем кнопку
        input.classList.remove("input-error"); // убираем подсветку
        renderTasks();    // перерисовка списка
        // TODO: Оптимизация: можно добавлять только новую задачу в DOM,
        // вместо полной перерисовки всего списка
    });

    // Фильтры через цикл
    const filterButtons = document.querySelectorAll(".filter-button");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            // снимаем active со всех кнопок
            filterButtons.forEach(b => b.classList.remove("active"));
            // добавляем active на выбранную
            btn.classList.add("active");

            // берём фильтр из data-атрибута
            const filter = btn.dataset.filter;

            // перерисовываем список задач
            renderTasks(filter);
            // TODO: Оптимизация: можно скрывать/показывать задачи напрямую,
            // вместо полной перерисовки списка
        });
    });
}