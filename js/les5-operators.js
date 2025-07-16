// Уравнение 1
const result1 = 2 * 2 + 2;
console.log(`Результат: ${result1}`); // 6

// Уравнение 2
// Функция: перевод градусов в радианы
function toRadians(degrees) { 
    return degrees * Math.PI / 180; 
}

const angleA = 54; // Углы в градусах
const angleB = 16;

const sinA = Math.sin(toRadians(angleA)); // Вычисляем синус и косинус
const cosB = Math.cos(toRadians(angleB));

const result2 = Math.pow(sinA * cosB, 2); // Возводим произведение в квадрат

console.log(`Результат: ≈ ${result2.toFixed(2)}`);

// Уравнение3
const a = 16 * Math.sqrt(13.2 * 71.90);
const b = 2.4 / Math.pow(7, 4);
const c = Math.pow(3, Math.sqrt(49));
const d = Math.pow(2, 7);

const result3 = (a / b + c) * d
console.log(`Результат: ≈ ${result3.toFixed(2)}`); // 63399251.64

// Сравнение четных и нечетных чисел

let e = 50;
let f = 19;
let g = 16;

console.log( "g → четное?", g % 2 === 0); // true Остаток после деления 0 → число четное
console.log("f → четное?", f % 2 === 0); // false Остаток после деления 1 → число нечетное
console.log("e → четное?", e % 2 === 0); // true 

// Программа: "Hello, Guest!"

let nameEmpty = "";
let nameUndefined;
let nameFilled = "Anna";

function greet(name) {
    if (!name) {
        return "Hello, Guest!";
    } else {
        return `Hello, ${name}!`;
    }
}

console.log("✅ Приветствие при пустом имени:", greet(nameEmpty));
console.log("✅ Приветствие при незаданной переменной:", greet(nameUndefined));
console.log("✅ Приветствие при заданном имени:", greet(nameFilled));