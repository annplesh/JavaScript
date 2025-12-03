// 1. Напиши функцию, которая добавляет два числа.
// Включи строгий режим и попробуй создать переменную внутри функции
// без использования ключевого слова. Исправь код, чтобы он работал в строгом режиме;

/*
'use strict';

function add(a, b) {
    result = a + b; // переменная без ключевого слова вызовет ReferenceError: result is not defined
    return result;
}
*/

'use strict';

function add(a, b) {
    const result = a + b;
    return result;
}

console.log(add(2, 3)); 

// 2. Создай функцию, которая принимает два параметра с одинаковыми именами. 
// Включи строгий режим и исправь ошибку, чтобы функция работала корректно;

/* 
'use strict';

function test(a, a) { // Ошибка: два параметра с одинаковыми именами
    return a + a;
}
*/

'use strict';

function test(a, b) { 
    return a + b;
}

console.log(test(2, 3));

// 3. Напиши код, в котором функция выводит значение this в консоль. 
// Включи строгий режим и проанализируй, как изменилось значение this;

/*
function showThis() {
    console.log(this);
}

showThis(); В нестрогом режиме: this → глобальный объект (в браузере это window, в Node.js — global)
*/

'use strict';

function showThis() {
    console.log(this);
}

showThis();
// Со строгим режимом: JavaScript запрещает неявное привязывание this к глобальному объекту.
// Поэтому внутри функции, вызванной напрямую, this становится undefined.

// Строгий режим делает работу с this более предсказуемой и безопасной:
// - Нет случайного обращения к глобальному объекту.
// - Если нужно явно указать контекст, используют.call(), .apply(), .bind() или стрелочные функции.


// 4. Попробуй удалить встроенное свойство объекта (например, метод toString у объекта) в строгом режиме.
// Объясни, почему это не работает, и что нужно сделать, чтобы избежать подобных ошибок.

/*
'use strict';

let obj = {};
delete obj.toString; Ошибка: Cannot delete property 'toString' of #<Object>
*/

// Почему не работает
// В JavaScript у объектов есть встроенные свойства и методы, например toString, valueOf.
// Эти свойства неподлежащие удалению(non‑configurable).
// В обычном режиме оператор delete просто возвращает false и молчит.
// !В строгом режиме('use strict') попытка удалить встроенное свойство вызывает ошибку(TypeError),
// чтобы сразубыло понятно, что это недопустимая операция.


// Как избежать ошибок:
// Не пытаться удалять встроенные свойства — они защищены и нужны для работы языка.

// Если нужно переопределить поведение, можно:
// !1. Создать собственный метод в объекте:

'use strict';

let obj = {};
obj.myToString = function () {
    return 'Мой объект';
};
console.log(obj.myToString()); // Мой объект

// !2. Переопределить toString в прототипе конкретного объекта:

'use strict';

let customObj = {
    toString() {
        return 'Особый объект';
    }
};
console.log(customObj.toString()); // Особый объект

// !3. Свойства можно сделать удаляемыми через Object.defineProperty с configurable: true

'use strict';

let user = {};
Object.defineProperty(user, 'nickname', {
    value: 'Anna',
    configurable: true
});

console.log(user.nickname); // Anna

delete user.nickname;

console.log(user.nickname); // undefined
console.log('nickname' in user); // false
console.log(Object.keys(user)); // []