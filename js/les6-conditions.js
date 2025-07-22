//Программа: "Проверка числа"
function checkNumber(num) {
console.log(
    num > 0
        ? "Число положительное"
        : num < 0
            ? "Число отрицательное"
            : "Это ноль"
);
    }
checkNumber(10);   // Число положительное
checkNumber(-5);   // Число отрицательное
checkNumber(0);    // Это ноль

//Программа: "ИМТ"
function calculateBMI() {
    // Запрашиваем данные у пользователя
    const weight = parseFloat(prompt("Ваш вес (в кг):")); //parseFloat преобразовывает строку в число с плавающей точкой
    const height = parseFloat(prompt("Ваш рост (в см):"));

    // Проверяем, что введены корректные числа
    if (!weight || !height || weight <= 0 || height <= 0) {
        console.log("Введите корректные значения.");
        return;
    }

    // Переводим рост в метры и считаем ИМТ
    const meters = height / 100;
    const bmi = weight / (meters * meters);

    console.log(`Ваш ИМТ: ${bmi.toFixed(2)}`);

    // Определяем категорию ИМТ
    const category=
        bmi < 18.5
        ?"Недовес"
        :bmi < 25
            ?"Нормальный вес"
            :bmi < 30
                ?"Избыточный вес"
                :"Ожирение";

    console.log(`Категория: ${category}`);
}

calculateBMI();

//Оператор switch
const month = 3;
let monthName;

switch (month) {
    case 1:
        monthName = 'Январь';
        break;
    case 2:
        monthName = 'Февраль';
        break;
    case 3:
        monthName = 'Март';
        break;
    case 4:
        monthName = 'Апрель';
        break;
    case 5:
        monthName = 'Май';
        break;
    case 6:
        monthName = 'Июнь';
        break;
    case 7:
        monthName = 'Июль';
        break;
    case 8:
        monthName = 'Август';
            break;
    case 9:
        monthName = 'Сентябрь';
        break;
    case 10:
        monthName = 'Октябрь';
        break;
    case 11:
        monthName = 'Ноябрь';
        break;
    case 12:
        monthName = 'Декабрь';
        break; 
    default:
        monthName = 'Неверный месяц';
}

console.log(monthName); // Март

// Оператор switch/case
const dish = prompt("🍽️ Какое твоё любимое блюдо? Варианты: pizza, sushi, tacos, ice cream").toLowerCase();

switch (dish) {
    case "pizza":
        console.log("🍕 Не ешь много, потолстеешь!");
        break;
    case "sushi":
        console.log("🍣 Отличный выбор, я тоже люблю здоровое питание!");
        break;
    case "tacos":
        console.log("🌮 Когда ешь острое плачешь, но все равно ешь?");
        break;
    case "ice cream":
        console.log("🍨 Ты сладкоежка!");
        break;
    default:
        console.log("🤔 Неизвестное блюдо.");
}