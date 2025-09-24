// 1. Напиши функцию, которая принимает массив чисел, 
// совершает над ними любую математическую операцию и возвращает новый массив, 
// содержащий результаты этих операций, используя стрелочные функции;

const transformArray = (numbers) => numbers.map(num => num * 2);
// Используется map и стрелочная функция num => num * 2.
// Возвращается новый массив, где каждый элемент умножен на 2.

const original = [1, 2, 3, 4, 5];
const result = transformArray(original);

console.log(result); // [2, 4, 6, 8, 10]

//2. Создай объект с методом, который использует стрелочную функцию внутри метода `setTimeout` 
// для вывода значения свойства объекта через 1 секунду;

const user = {
    name: 'Anna',
    greet: function () {
        console.log(this); // user объект
        setTimeout(() => {
            // setTimeout — асинхронная функция: код внутри выполнится через 1 секунду,
            // поэтому "Hello..." появится в консоли последним
            console.log(`Hello, my name is ${this.name}`);
        }, 1000);
    }
};

user.greet() // "Hello, my name is Anna"

// 3. Реализуй функцию высшего порядка *, которая принимает функцию и массив, 
// и применяет эту функцию ко всем элементам массива, используя стрелочные функции.

const processArray = (operation, array) => array.map(item => operation(item));
// processArray — функция высшего порядка, потому что она принимает другую функцию (operation) как аргумент.
// array.map(...) — метод массива, который создаёт новый массив, применяя operation к каждому элементу.
// item => operation(item) — стрелочная функция, которая вызывает operation для каждого элемента.

const square = number => number * 2;

const input = [6, 7, 8, 9];

const output = processArray(square, input);

console.log(output); // [ 12, 14, 16, 18 ]