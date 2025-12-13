// 1. Напиши объект с несколькими свойствами и сделай все свойства неизменяемыми
// (с помощью Object.defineProperty).
// Проверь, можно ли изменить их значения после этого;

'use strict';

const user = {};

Object.defineProperties(user, {
    name: {
        value: 'Anna',
        writable: false,      // нельзя менять
        enumerable: false,    // не видно в переборе
        configurable: false,  // нельзя удалить или перенастроить
    },
    age: {
        value: 40,
        writable: false,
        enumerable: true,     // видно в переборе
        configurable: false,
    }
});

console.log(user.name); // Anna
console.log(user.age);  // 40

// В строгом режиме use strict следующие строки вызовет ошибку,
// без строгого режима они просто проигнорируется (значение не изменится)

// Попытка изменить name
try {
    user.name = 'Maria';
} catch (e) {
    // Ошибка при изменении name: Cannot assign to read only property 'name' of object '#<Object>'
    console.error('Ошибка при изменении name:', e.message);
}

// Попытка изменить age
try {
    user.age = 30;
} catch (e) {
    // Ошибка при изменении age: Cannot assign to read only property 'age' of object '#<Object>'
    console.error('Ошибка при изменении age:', e.message);
}

// Попытка удалить name
try {
    delete user.name;
} catch (e) {
    // Ошибка при удалении name: Cannot delete property 'name' of #<Object>
    console.error('Ошибка при удалении name:', e.message);
}

// Попытка удалить age
try {
    delete user.age;
} catch (e) {
    // Ошибка при удалении age: Cannot delete property 'age' of #<Object>
    console.error('Ошибка при удалении age:', e.message);
}

// Для каждой попытки изменения использую try...catch, чтобы программа не прерывалась.

// Перебор свойств
for (let key in user) {
    console.log(key);     // выведет только age, потому что name enumerable: false
}

console.log(Object.keys(user)); // [ 'age' ]

// 2. Создай объект с несколькими свойствами, 
// где одно из них будет неперечисляемым (не должно выводиться в циклах). 
// Убедись, что свойство не отображается при выводе ключей объекта через цикл for...in.

const person = {};

Object.defineProperty(person, 'name', {
    value: 'Ivan',
    writable: true,
    enumerable: false, // не доступно в циклах
    configurable: true,
});

Object.defineProperty(person, 'city', {
    value: 'Caracas',
    writable: true,
    enumerable: true, // доступно в циклах
    configurable: true,
});

// Перебор свойств person
for (let key in person) {
    console.log(key); // выведет только city
}

console.log(Object.keys(person)); // ['city']
console.log(person.name); // Ivan — доступно напрямую