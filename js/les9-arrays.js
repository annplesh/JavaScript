// 1. Есть массив чисел.Преобразуй массив так, чтобы там были квадраты чисел.Пример: [2, 3] -> [4, 9];

const numbersArray = [2, 3, 4, 5, 6];
const squaresArray = numbersArray.map(num => num * num);

console.log(squaresArray);

/*
2. Есть массив c повторяющимися элементами.Отфильтруй массив так, 
чтобы там остались только уникальные элементы.Пример: [1, 2, 2, 3, 4, 5, 5, 5, 6] -> [1, 2, 3, 4, 5, 6];
*/

const array = [1, 2, 2, 3, 4, 5, 5, 5, 6];

const unique = array.filter((num, index) => {
    return array.indexOf(num) === index;
});

// filter всегда делает return (true или false)

// array.filter((num, index) => filter - функция массива, num - элемент, index - индекс элемента

/*
return array.indexOf(num) === index; 

Является ли текущий элемент num первым вхождением этого значения в массив?"

- Если да → это уникальное появление → true → элемент включается в результат.
- Если нет → это повтор → false → элемент отфильтровывается.
*/

console.log(unique);

// 3. Есть массив чисел, посчитай сумму его элементов. Пример: [1, 2, 3] -> 6. Подсказка: используй reduce;

const numbers = [1, 2, 3];
const sum = numbers.reduce((total, num) => total + num, 0);

// total = 0; num = 1; 0 + 1;
// total = 1; num = 2; 1 + 2;
// total = 2; num = 3; 3 +3;

console.log(`Сумма элементов равна ${sum}`);

/*
4. Напиши программу, которая развернет массив, то есть все элементы будут в обратном порядке. 
Нельзя использовать reverse()!
*/

const arr = [1, 2, 3, 4, 5];

const reversedArr = arr.reduceRight((acc, value) => {
    acc.push(value);
    return acc;
}, []);

console.log(reversedArr);

/*
arr.reduceRight() - Метод массива, который перебирает элементы справа налево (от 5 к 1).
- Он вызывает функцию для каждого элемента и накапливает результат. 

- acc — аккумулятор, в начале это пустой массив []
- value — текущий элемент массива, начиная с последнего (5)
- acc.push(value) — добавляем текущий элемент в конец аккумулятора
- return acc — возвращаем обновлённый аккумулятор для следующего шага
- [] - начальное значение аккумулятора — пустой массив, в который мы будем складывать элементы
*/

/*
5. Создай две переменных - две строки с использованием let и const. 
Попробуйте изменить значения всех этих переменных. 
Создайте два массива с использованием let и const. 
Попробуйте изменить массивы (добавить и удалить элементы) и переопределить сами массивы. 
Посмотри на результаты и объясни своими словами (да, опять🙂), что и почему так произошло.
*/
let strLet = "Привет";
const strConst = "Здравствуй";

strLet = "Hola"; // работает! переменную let можно переопределить
console.log(strLet);

/*
strConst = "Hello";
console.log(strConst);
ошибка! переменную const нельзя переопределить
*/

let fruitsLet = ['Apple', 'Banana'];
const fruitsConst = ['Mango', 'Papaya'];

// Мутируем содержимое:
fruitsLet.push('Kiwi');      
console.log(fruitsLet);        // ✅ Добавлен последний элемент ['Apple', 'Banana', 'Kiwi']; 

fruitsConst.push('Orange');
console.log(fruitsConst);      // ✅ Добавлен последний элемент ['Mango', 'Papaya','Orange'];

fruitsLet.pop();
console.log(fruitsLet);        // ✅ Удаляем последний элемент ['Apple', 'Banana'];

fruitsConst.shift();           
console.log(fruitsConst);      // ✅ Удаляем первый элемент ['Papaya', 'Orange']

// Переопределим массивы:
fruitsLet = ['Strawberry', 'Orange', 'Kiwi']; 
console.log(fruitsLet); // ✅ переопределился ['Strawberry', 'Orange', 'Kiwi'];

/*
fruitsConst = ['Grapes', 'Mango', 'Banana'];
console.log(fruitsConst); ❌ ошибка: Assignment to constant variable

Итог:
Переменную const в массивах нельзя переназначить, но можно изменить (мутировать) содержимое массива

Переменную let можно и изменить, и переназначить
*/

/*
Мутабельные методы
const fruits = ['Apple', 'Banana', 'Strawberry'];

const removedLastElement = fruits.pop(); // pop - удаляет последний элемент
console.log(fruits); // [ 'Apple', 'Banana' ]

const newFirstElement = fruits.unshift('Mango'); // unshift - добавляет новый первый элемент
console.log(fruits); // [ 'Mango', 'Apple', 'Banana' ]

const removedFirstElement = fruits.shift(); // shift - удаляет первый элемент
console.log(fruits); // [ 'Apple', 'Banana' ]

const removedFruit = fruits.splice(1, 1, 'Grapes', 'Papaya'); // splice(start, deleteCount, item1, item2, ..., itemN);
console.log(fruits); // [ 'Apple', 'Grapes', 'Papaya' ]
удалился один элемент с индексом 1 и добавилось два новых после удаленного
console.log(removedFruit); // [ 'Banana' ]

const partialFilledFruits = fruits.fill('Orange', 1, 2)
console.log(fruits); // [ 'Apple', 'Orange', 'Papaya' ]
fill - заполняет массив указанным значением, начиная с индекса start и до (не включая) индекса end т.е. 'Grapes' заменилось на 'Orange'

Иммутабельные методы

const fruits = ['Cherry', 'Plum', 'Whatermelon'];
const index = fruits.indexOf('Whatermelon');

console.log(`Массив: ${fruits.join(', ')}`); // Массив: Cherry, Plum, Whatermelon
console.log(`'Whatermelon' найден на позиции: ${index}`);

const isCherryIncluded = fruits.includes('Cherry'); 
console.log(isCherryIncluded); // true

const moreFruits = fruits.concat(['Orange', 'Lemon', 'Peach']);
console.log(moreFruits); // [ 'Cherry', 'Plum', 'Whatermelon', 'Orange', 'Lemon', 'Peach' ]

const onlyTwoFirst = moreFruits.slice(0, 2);
console.log(onlyTwoFirst); // [ 'Cherry', 'Plum' ]

const iteratedFruits = fruits.forEach((fruit, index) => {
    console.log(`${index}: ${fruit}`);
}); 

const foundFruit = fruits.find(fruit => fruit.startsWith('W'));
console.log(foundFruit); // foundFruit = 'Whatermelon' (первый фрукт, начинающийся на 'W')

const allStartWithA = fruits.every(fruit => fruit.startsWith('A'));
console.log(allStartWithA); // false - не все фрукты начинаются с 'A'

const hasBanana = fruits.some(fruit => fruit === 'Banana');
console.log(hasBanana); // false - в массиве нет 'Banana'
*/rays