import { deleteTask, getTasks, setReminder, toggleTask } from "./tasks.js";

/**
 * Отрисовывает список задач в пользовательском интерфейсе.
 *
 * Функция:
 * 1. Загружает задачи из Local Storage (через getTasks).
 * 2. Применяет фильтр:
 *    - "all"       → все задачи;
 *    - "completed" → только выполненные;
 *    - "incomplete"→ только невыполненные.
 * 3. Очищает контейнер .task-list и заново строит DOM-элементы
 *    на основе шаблона #task-template.
 * 4. Для каждой задачи:
 *    - отображает заголовок и статус выполнения;
 *    - добавляет обработчики:
 *        • чекбокс → toggleTask + повторная отрисовка;
 *        • кнопка удаления → deleteTask + повторная отрисовка;
 *        • иконка напоминания → prompt для ввода секунд и вызов setReminder;
 *    - применяет CSS-класс "completed" для выполненных задач
 *      (зачёркивание текста и скрытие иконки напоминания).
 *
 * @param {"all"|"completed"|"incomplete"} filter - Фильтр отображения задач.
 * @returns {void}
 */
export function renderTasks(filter = "all") {
    const taskList = document.querySelector(".task-list");
    taskList.innerHTML = "";

    let tasks = getTasks();
    if (filter === "completed") tasks = tasks.filter(t => t.completed);
    if (filter === "incomplete") tasks = tasks.filter(t => !t.completed);

    tasks.forEach(task => {
        const template = document.getElementById("task-template").content.cloneNode(true);
        const li = template.querySelector(".task-item");

        const checkbox = li.querySelector(".task-checkbox");
        const title = li.querySelector(".task-title");
        const deleteBtn = li.querySelector(".delete-btn");
        const bellIcon = li.querySelector(".task-icon");

        title.textContent = task.title;
        checkbox.checked = task.completed;

        if (task.completed) {
            li.classList.add("completed");   // применяются стили зачёркнутого текста
        } else {
            li.classList.remove("completed"); // убираем класс, чтобы вернуть обычный вид
        }

        checkbox.addEventListener("change", () => {
            toggleTask(task.id);
            renderTasks(filter);
            // TODO: Оптимизация: обновлять только один элемент вместо полной перерисовки списка
        });

        deleteBtn.addEventListener("click", () => {
            deleteTask(task.id);
            renderTasks(filter);
            // TODO: Оптимизация: можно удалять только текущий элемент (li.remove()),
            // чтобы не перерисовывать весь список заново
        });

        bellIcon.addEventListener("click", () => {
            if (task.completed) return;

            const seconds = Number(prompt("Введите время напоминания в секундах"));
            if (!Number.isFinite(seconds) || seconds <= 0) return;

            setReminder(task.id, seconds);
        });

        taskList.appendChild(li);
    });
}