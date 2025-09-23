//1. Создай объект student с вложенными объектами и массивами. 
// Затем создай поверхностную копию этого объекта (разными способами!) 
// и измени вложенные структуры (массивы, объекты) у копии, распечатай их. 
// Затем распечатай те же свойства у оригинала, чтобы увидеть, как на нем отразились изменения. 
// Объясни своими словами, что произошло;

const student = {
    name: "Anna",
    age: 40,
    languages: ["JavaScript", "Python", "C++", "Rust"],
    address: {
        city: "Caracas",
        zip: "1010"
    }
};

// Поверхностное копирование через Object.assign
const copy1 = Object.assign({}, student);

// Поверхностное копирование через spread-оператор
const copy2 = { ...student };

copy1.languages.push("TypeScript");
copy1.address.city = "Maracaibo";

copy2.languages[0] = "Golang";
copy2.address.zip = "4001";

console.log("Оригинал student.languages:", student.languages); // [ 'Golang', 'Python', 'C++', 'Rust', 'TypeScript' ]
console.log("Оригинал student.address:", student.address); // { city: 'Maracaibo', zip: '4001' }

console.log("copy1.languages:", copy1.languages); // ['Golang', 'Python', 'C++', 'Rust', 'TypeScript']
console.log("copy1.address:", copy1.address); // { city: 'Maracaibo', zip: '4001' }

console.log("copy2.languages:", copy2.languages); // [ 'Golang', 'Python', 'C++', 'Rust', 'TypeScript' ]
console.log("copy2.address:", copy2.address); // { city: 'Maracaibo', zip: '4001' }

// При поверхностном копировании объекта student (через Object.assign и spread)
// копируются только верхние свойства, такие как name и age.

// Вложенные структуры — массив languages и объект address — не копируются как новые,
// а остаются ссылками на те же данные в памяти, что и в оригинале.

// Поэтому, когда я изменила вложенные данные в копиях (например, добавила язык или изменила город),
// эти изменения затронули оригинальный объект student.

// В результате, при выводе в консоль:
// copy1.languages === student.languages
// copy2.address === student.address
// Все объекты показывают одинаковые значения, потому что используют одни и те же вложенные структуры.

// 2. Создать копию объекта, внутри которого есть методы (функции), с помощью JSON метода. 
// Затем попробуй вызывать метод у копии объекта. Объясни своими словами, что произошло;

const user = {

    name: "Alice",

    age: 30,

    address: {

        city: "Wonderland",

        zip: "12345"

    },

    sayHi: () => console.log('Hello, Alice!')

};

const copy = JSON.parse(JSON.stringify(user));

// copy.sayHi(); TypeError: copy.sayHi is not a function

// Копирование объекта через JSON-методы (JSON.stringify + JSON.parse)
// не сохраняет функции, символы и специальные типы данных.
// Например, методы объекта будут потеряны, а Date превратится в обычную строку.
// Это может привести к ошибкам при попытке вызвать метод или использовать нестандартные типы.


// 3*. Проанализируй и разбери функцию глубокого копирования из урока (function deepCopy). 
// Покрой каждую строчку кода комментариями, которые объясняют, что делает этот кусок кода и зачем. 
// То есть после этого задания у тебя должно сложиться полное понимание того, как работает эта функция, 
// чтобы в дальнейшем ты смог ее применить!

function deepCopy(obj) { // Объявляем функцию deepCopy, которая принимает один аргумент obj.
    if (obj === null || typeof obj !== 'object') { // проверка: если obj — это null, или если obj — не объект
        return obj;
        // (например, число, строка, булево значение), → тогда возвращаем его как есть.
        //Это важно, чтобы не пытаться копировать примитивы или null.
    }
    const copy = Array.isArray(obj) ? [] : {}; // Создаём пустую копию: если obj — массив, создаётся [].Если obj — объект, создаётся {}.
    for (let key in obj) { // Начинаем перебирать все свойства объекта obj.
        if (obj.hasOwnProperty(key)) { // Проверяем, что свойство действительно принадлежит самому объекту, а не унаследовано.
            copy[key] = deepCopy(obj[key]); // Рекурсивно вызываем deepCopy для каждого значения: 
            // если значение — примитив, оно просто возвращается.
            // Если значение — объект или массив, оно копируется глубоко.
        }
    }
    return copy; // Возвращаем готовую глубокую копию объекта.
}

const original = { a: 1, b: { c: 2 } }; // Создаём объект original с вложенным объектом b.
const deepCopyObj = deepCopy(original); // — Создаём глубокую копию original.
// Теперь deepCopyObj.b — это новый объект, независимый от original.b.

console.log("deepCopyObj.b.c:", deepCopyObj.b.c); // 3

// Изменим копию
deepCopyObj.b.c = 3; // Меняем значение c в копии. Это не влияет на original, потому что b был скопирован глубоко.

// Выводим значения
console.log(original.b.c); // 2 Выводим значение c в оригинале. Оно осталось равным 2, потому что копия была глубокой.
console.log("deepCopyObj.b.c:", deepCopyObj.b.c); // 3 // Проверяем, что изменение в копии не затронуло оригинал.
// deepCopyObj.b.c было изменено на 3, и вывод подтверждает это.

// Проверим, равны ли вложенные объекты
console.log("original.b === deepCopyObj.b:", original.b === deepCopyObj.b); // false

