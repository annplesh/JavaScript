// 1. Создай функцию, которая принимает произвольное количество чисел и возвращает их среднее значение;

const numbersArray = [1, 2, 3, 4, 5, 6];

const averageValue = (...args) => { // 
    if (args.length === 0) return 0;
    const sum = args.reduce((acc, num) => acc + num, 0);
    return sum / args.length;
};

console.log(averageValue(...numbersArray)); // → 3.5

/*
const averageValue = (...args) => { - это стрелочная функция, принимающая переменное количество аргументов.

if (args.length === 0) return 0; - проверка на пустой массив
- Если аргументов нет, возвращаем 0, чтобы избежать деления на ноль
- Это защита от вызова вроде averageValue()


const sum = args.reduce((acc, num) => acc + num, 0);
- reduce — метод массива, который сворачивает массив в одно значение
- acc — аккумулятор, начальное значение 0
- num — текущий элемент массива
- На каждой итерации: acc = acc + num

return sum / args.length; - деление на количество

console.log(averageValue(...numbersArray)); - вызов функции
*/

/* 2. Создай функцию, которая принимает объект с информацией о пользователе (имя, возраст, страна) 
и возвращает строку с этой информацией, используя деструктуризацию;
*/

function printUser({ name, age, country}) {
    console.log(`Name: ${name}, Age: ${age}, Country: ${country}`);
}

const user = { name: 'Anna', age: 40, country: 'Venezuela' };
printUser(user); //

/*
3. Создай объект с вложенными объектами и массивами. 
Используй деструктуризацию, чтобы извлечь несколько значений на разных уровнях вложенности;
*/

const userProfile = {
    username: 'Anna',
    details: {
        age: 40,
        location: {
            country: 'Venezuela',
            city: 'Caracas'
        }
    },
    preferences: {
        languages: ['Russian', 'Spanish', 'English'],
        hobbies: ['codding', 'languages', 'fashion disgn']
    }
};

// Вложенная деструктуризация:
const {
    username,
    details: {
        age,
        location: { country, city }
    },
    preferences: {
        languages: [lang1, lang2, lang3],
        hobbies: [hobby1, hobby2, hobby3]
    }
} = userProfile;

console.log('Имя пользователя:', username);
console.log('Возраст:', age);
console.log('Страна:', country);
console.log('Город:', city);

console.log('Языки:');
console.log('Первый язык:', lang1);
console.log('Второй язык:', lang2);
console.log('Третий язык:', lang3);

console.log('Хобби:');
console.log('Первое хобби:', hobby1);
console.log('Второе хобби:', hobby2);
console.log('Третье хобби:', hobby3);

/* 4. Используй оператор `spread` для создания нового массива, 
который включает все элементы исходного массива и добавляет несколько новых элементов в начале и в конце;
*/
const originalLanguages = ['Russian', 'Spanish', 'English'];

const updatedLanguages = ['French', ...originalLanguages, 'German'];

console.log('Исходный массив:', originalLanguages);
console.log('Новый массив с добавлением:', updatedLanguages);

/*
5. Используй оператор `rest` для создания функции, 
которая принимает объект с параметрами и возвращает новый объект без одного указанного параметра.
*/

const user1 = {
    name: 'Anna',
    age: 40,
    language: 'Russian'
};

function removeAge(user1) {
    const { age, ...rest } = user1; // age извлекается, остальное — в rest
    return rest; // возвращаем новый объект без age
}

const result = removeAge(user1);
console.log('Исходный объект:', user1);
console.log('Новый объект:', result);