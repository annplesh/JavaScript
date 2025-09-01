// 1. Найди элемент на странице по его ID и измени его текстовое содержимое на что-то новое;

const mainTitle = document.getElementById('main-title');
mainTitle.textContent = 'Новый заголовок';

console.log(mainTitle);

// 2. Используй JavaScript, чтобы изменить фон и цвет текста элемента с определенным классом;

const colorChange = document.querySelector('p');

colorChange.style.color = 'pink';
colorChange.style.backgroundColor = 'turquoise';

console.log(colorChange);

// 3. Напиши код, который создает новый параграф с текстом и добавляет его в конец документа;

const newParagraph = document.createElement('p');
newParagraph.textContent = 'Новый параграф.';
document.body.appendChild(newParagraph);

console.log(newParagraph);

// 4. Напиши функцию, которая удаляет элемент с указанным ID из документа;

const elementToRemove = document.getElementById('removeMe');

console.log(elementToRemove);

function removeElementById(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Элемент с ID "${id}" не найден.`);
        return;
    }

    element.parentNode.removeChild(element);
    console.log(`Элемент с ID "${id}" удалён.`);
}

removeElementById('removeMe');

// 5. Измени атрибут ссылки на новый URL и выведи его значение в консоль;

const link = document.querySelector('a');
link.setAttribute('href', 'https://www.google.com/');

console.log(link.getAttribute('href'));

// 6. Создай новый элемент, добавь к нему класс и добавь его в DOM;

const newElement = document.createElement('div');
newElement.textContent = 'Созданный элемент';
document.body.appendChild(newElement); // Так как в задании не указано конкретное место вставки, я выбрала document.body

newElement.classList.add('highlight');

console.log(newElement);

// 7. Переключи класс у существующего элемента и проверьте его наличие в консоли.

const toggleTarget = document.getElementById('toggle-target');
toggleTarget.classList.toggle('active');

console.log(toggleTarget);