// 1. Проверь, содержится ли строка "fun" в строке "JavaScript is fun!";

const message = "JavaScript is fun!";
const keyword = "fun";

if (message.includes(keyword)) {
    console.log("Строка содержит слово 'fun'");
} else {
    console.log("Слово 'fun' не найдено");
}

//2. Попробуй написать условие, которое выполняется только в случае, если переменная имеет одно из falsy значений;
const value = undefined;

if (!value) {
    console.log("Переменная имеет falsy значение");
} else {
    console.log("Переменная имеет truthy значение");
}

/* 3. Напиши шаблонную строку, которая включает переменные firstName, lastName и occupation, 
и выводит сообщение вроде "Hello, my name is John Doe. I am a software developer."; */

const firstName = "Anna";
const lastName = "Pleshakova";

const greeting = `Hello, my name is ${firstName} ${lastName}. I am a software developer.`;

console.log(greeting);

/*4. Сравни null и undefined строго (===) и не строго (==), 
выведи результаты в консоль. Объясни своими словами, почему получились такие результаты 🙂 */

console.log(null===undefined); // false при строгом сравнении, т.к. у значений разные типы
console.log(null == undefined); //true при приведении типов (по спецификации считаются равными)

/* 5. Выведи в консоль результат выражения 1 + '1'. 
Да, этот удивительный JS... И снова попрошу тебя объяснить своими словами, что произошло🙂 */

console.log(1 + '1'); // 11, т.к. при использовании оператора + число преобразовалось в строку и произошла конкатенация (склеивание) строк