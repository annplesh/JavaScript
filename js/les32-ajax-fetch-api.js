// 1. Сделай HTML-форму для создания нового поста с полями id пользователя, заголовок, текст. 
// При отправке формы выполни POST запрос и отобрази ответ сервера на странице;

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Обработка ошибок
function handleError(error, targetBox) {
    console.error(error);
    if (targetBox) {
        targetBox.textContent = 'Ошибка: ' + error.message;
    }
}

// Находим элементы формы и блока для ответа
const form = document.getElementById('postForm');
const responseBox = document.getElementById('response');

// Обработчик отправки формы
form.addEventListener('submit', async (event) => {
    // Добавляем обработчик события "submit" к форме:
    // когда пользователь отправляет форму (кнопка submit или Enter),
    // запускается асинхронная функция, которая получает объект события (event)
    // и выполняет нашу логику вместо стандартной перезагрузки страницы

    event.preventDefault(); // отменяем стандартное поведение (перезагрузку страницы)

    // Собираем данные из формы
    const payload = {
        userId: Number(form.userId.value),
        title: form.title.value.trim(),
        body: form.body.value.trim()
    };

    // 4. Реализуй функциональность для обновления данных пользователя.
    // Используй PUT запрос для отправки обновленных данных на сервер
    // и отобрази обновленный профиль на странице.
    // Объясни, в чём разница между PUT и PATCH запросами.

    // Проверяем чекбокс "Обновить существующий пост"
    const postId = Number(form.postId.value); // ID поста для обновления
    
    
    const updateMode = document.getElementById('updateMode').checked; // находим элемент чекбокса
    // Свойство .checked возвращает true, если чекбокс отмечен, и false, если нет.
    // - В переменной updateMode будет булево значение:
    // - true → пользователь хочет обновить пост.
    // - false → пользователь хочет создать новый пост.

    // Если updateMode === true, то мы формируем URL для обновления поста:
    // https://jsonplaceholder.typicode.com/posts/{userId}
    // Если updateMode === false, то берём базовый URL:
    // https://jsonplaceholder.typicode.com/posts
    const url = updateMode
        ? `${API_URL}/${postId}` // обновляем конкретный пост
        : API_URL; // иначе создаём новый пост

    // Если updateMode === true → метод запроса будет 'PUT'.
    //Если updateMode === false → метод запроса будет 'POST'
    const method = updateMode ? 'PUT' : 'POST';

    try {
        // Логи для проверки работы формы
        console.log('Метод:', method);
        console.log('URL:', url);
        console.log('Payload:', payload);

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        // проверяем, что сервер вернул статус 200–299.
        // Если статус другой(например, 404 или 500), мы сами выбрасываем исключение через throw new Error(...).
        // Это нужно, потому что fetch по умолчанию не считает 404 / 500 ошибкой — он всё равно возвращает объект Response.
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }

        // Преобразуем ответ в JSON
        const data = await response.json();

        // Отображаем ответ сервера
        responseBox.textContent = JSON.stringify(data, null, 2);
        // объект data превращаем в строку
        // replacer — фильтр (обычно null, чтобы взять все поля)
        // space = 2

    } catch (error) {
        handleError(error, responseBox);
    }
});

// 2. Реализуй кнопку для загрузки списка постов. 
// При нажатии на кнопку выполни GET запрос к API 
// и отобрази список постов на странице;

// Находим элементы
const button = document.getElementById('loadPosts');
const postsList = document.getElementById('postsList');

// Обработчик нажатия на кнопку (задание 2)
button.addEventListener('click', async () => {
    try {
        // Выполняем GET-запрос
        const response = await fetch(API_URL);
        const posts = await response.json();

        // Очищаем список перед новой загрузкой
        postsList.innerHTML = '';

        // Отображаем первые 10 постов
        posts.slice(0, 10).forEach(post => {
            const li = document.createElement('li');
            li.setAttribute('data-id', post.id);

            // Кнопка удаления (задание 3)
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Удалить';
            deleteBtn.onclick = () => deletePost(post.id);

            // Текст поста + два пробела перед кнопкой
            li.innerHTML = `#${post.id} — ${post.title}&nbsp;&nbsp;`;
            li.appendChild(deleteBtn);

            postsList.appendChild(li);
        });
    } catch (error) {
        handleError(error, postsList);
    }
});

// 3. Создай функцию для удаления поста по id. 
// Выполни DELETE запрос к API и обнови DOM, удалив соответствующий пост;
async function deletePost(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        if (response.ok) {
            const postItem = document.querySelector(`li[data-id="${id}"]`);
            if (postItem) postItem.remove();
            console.log(`Пост #${id} удалён`);
        } else {
            console.error(`Ошибка при удалении поста #${id}`);
        }
    } catch (error) {
        handleError(error, postsList);
    }
}

// Разница:
// PUT   — полная замена ресурса (все поля пересоздаются)

// PATCH — частичное обновление (изменение одного или нескольких полей)
// PATCH безопаснее, когда ты не знаешь всей структуры объекта или хочешь изменить только одно поле.

// При тестировке В моём примере я изменила только поле body,
// и запрос PUT фактически сработал как PATCH,
// потому что остальные поля (userId, title) я передала без изменений.
// Это не вызвало ошибок, так как:
// - Я знала точную структуру объекта (userId, title, body)
// - Я указала все обязательные поля
// - Тестовый API (jsonplaceholder) не требует дополнительных метаданных,
//   которые могли бы потеряться при полной замене
// Поэтому результат был корректным, хотя логичнее использовать PATCH,
// если нужно обновить только одно поле (частичное обновление)