// 1. Создай три вложенных элемента (например, `div` внутри `div` внутри `div`). 
// Назначь обработчики событий для каждого из них и 
// проследи за последовательностью вызовов при клике на внутренний элемент с помощью console.log();

document.getElementById('parent').addEventListener('click', () => {
    console.log('Parent clicked');
});

// 2. Напиши код, который останавливает всплытие события на среднем элементе из предыдущего задания;
document.getElementById('child').addEventListener('click', (event) => {
    console.log('Child clicked');
    event.stopPropagation();
});

document.getElementById('grandchild').addEventListener('click', () => {
    console.log('Grandchild clicked');
});

// Событие будет всплывать от самого вложенного элемента к родителям.
// Grandchild clicked
// Child clicked
// Parent clicked

// 3. Создай форму с несколькими полями ввода и кнопкой отправки. 
// Реализуй делегирование события, например, 
// валидации каждого поля ввода при его изменении. 
// Пусть это будет простое условие, например, длина строки не более 20 символов.
document.getElementById('myForm').addEventListener('input', function (event) { 
    // навешиваем один обработчик на форму целиком, чтобы делегировать события
    const target = event.target;

    // Проверяем, что это поле ввода
    if (target.tagName === 'INPUT') {
        if (target.value.length > 20) {
            target.style.borderColor = 'red';
            console.log(`Поле "${target.name}" содержит слишком длинную строку`);
        } else {
            target.style.borderColor = '';
        }
    }
});
