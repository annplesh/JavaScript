//Приметивные типы данных

const greeting = "Hello, World!";
console.log(typeof greeting);

let weight = 48;
console.log(typeof weight);

const bigNum = 6848951320354168654n;
console.log(typeof bigNum);

const isDeveloper = true;
console.log(typeof isDeveloper);

let y;
console.log(typeof y);

const x = null;
console.log(typeof x); // object (bug для обратной совместимости)

//Сложные типы

//array
const vegetables = ["cucumber", "tomato", "cabbage"];
console.log(typeof vegetables); // object 

//объект
const person = {
    name: 'Anna',
    age: 40,
}
console.log(person);

//функция
function greet(name, language = "ru") {
    const greetings = {
        ru: "Привет",
        en: "Hello",
        es: "¡Hola",
    };
    return `${greetings[language] || greetings.ru}, ${name}!`;
}
console.log(typeof greet);

/* Хранение по значению (Value Type) используется для примитивных типов дааных: number, string, boolean, null, undefined, symbol, bigint.
--Когда ты присваиваешь переменную, она содержит само значение.
--При копировании — создаётся новая копия, независимая от оригинала.
*/
let a = 5;
let b = a;
b = 10;

console.log(a); // 5
console.log(b); // 10

// a осталась 5, потому что b — это копия, а не ссылка

/* Хранение по ссылке (Reference Type) используется для сложных типов данных: array, object, function
--Переменная не содержит сам объект, а ссылается на его место в памяти.
--При копировании — копируется ссылка, а не сам объект.
*/

const person1 = {
    name: 'Anna',
    age: 40,
}

const person2 = person1

person2.name = 'Maria';
person2.age = 35;

console.log(person1); // { name: 'Maria', age: 35 }
console.log(person2); // { name: 'Maria', age: 35 }

//Изменение person2 повлияло на person1, потому что обе переменные ссылаются на один и тот же объект.
