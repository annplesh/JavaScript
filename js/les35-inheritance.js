// 1. Создай класс Person и класс-наследник Student .
// Класс Person должен иметь свойства name и метод introduce,
// который выводит строку вида "Привет, меня зовут (имя)".
// Класс Student должен наследовать Person
// и добавлять свойство course и переопределенный метод introduce,
// который выводит строку вида "Привет, меня зовут (имя),и я учусь на (курсе) курсе".
// Используй console.log(Student.prototype) и исследуй,
// как JavaScript создает цепочку прототипов;

// !Прототипное наследование ES5
// Функция-конструктор Person
function Person(name) {
    this.name = name;
}

// Метод introduce в прототипе Person
Person.prototype.introduce = function introduce () {
    console.log(`Привет, меня зовут ${this.name}.`);
};

// Функция-конструктор Student
function Student(name, course) {
    Person.call(this, name); // Наследуем свойства от Person
    this.course = course; // Добавляем новое свойство course
}

// Наследуем прототип Person
Student.prototype = Object.create(Person.prototype);

// Восстанавливаем правильный constructor
Student.prototype.constructor = Student;

// Переопределяем метод introduce
Student.prototype.introduce = function introduce () {
    console.log(`Привет, меня зовут ${this.name}, и я учусь на ${this.course} курсе.`);
};

const personAnna = new Person("Анна");
personAnna.introduce(); // Привет, меня зовут Анна.

const studentAnna = new Student("Анна", 3);
studentAnna.introduce(); // Привет, меня зовут Анна и я учусь на 3 курсе.


// !1. Проверяем прототип Student
console.log(Student.prototype);
// → объект с методами Student (introduce, constructor)

// !2. Проверяем, от кого наследует Student.prototype
console.log(Object.getPrototypeOf(Student.prototype));
// → Person.prototype

// !3. Проверяем, от кого наследует Person.prototype
console.log(Object.getPrototypeOf(Person.prototype));
// → Object.prototype

// !4. Проверяем конец цепочки
console.log(Object.getPrototypeOf(Object.prototype));
// → null

/*
studentAnna
    |
    v
Student.prototype   { introduce(), constructor }
   |
    v
Person.prototype    { introduce() }
   |
    v
Object.prototype    { toString(), hasOwnProperty(), ... }
   |
    v
null

- Когда вызывается studentAnna.introduce(), JS сначала ищет метод в Student.prototype.
- Если бы его там не было, поиск пошёл бы в Person.prototype.
- Если и там нет — в Object.prototype.
- Если нигде не найдено — возвращается undefined.
*/

// 2. Создай класс Employee, наследующий Person. 
// Класс должен добавлять свойство position и метод work, 
// который выводит строку "Я работаю на позиции (должность)". 
// Переопредели метод introduce так, 
// чтобы он также включал информацию о должности;

// !Наследование через классы ES6
class Employee extends Person {
    constructor(name, position) {
        super(name); // вызываем конструктор родителя
        this.position = position;
    }

    work() {
        console.log(`Я работаю на позиции ${this.position}.`);
    }

    introduce() {
        console.log(`Привет, меня зовут ${this.name}, и я работаю на позиции ${this.position}.`);
    }
}

const programmer = new Employee("Анна", "Программист");

programmer.introduce(); // Привет, меня зовут Анна, и я работаю на позиции Программист.
programmer.work(); // Я работаю на позиции Программист.

// 3. Создай объектное наследование без использования классов.
// Создай объект Vehicle с методом move.
// Создай объект Car, который наследует от Vehicle, добавив свой метод drive.
// Используй Object.create для наследования.

// !Объектное наследование (ES5 стиль без классов)
// !Для чистых объектов используем Object.create(baseObj),
// !чтобы новый объект наследовал методы и свойства прототипа.
const Vehicle = {
    move: function () {
        console.log("Транспортное средство движется.");
    }
};

const Car = Object.create(Vehicle); // Car наследует Vehicle

// Добавляем метод drive в Car
Car.drive = function () {
    console.log("Машина едет.");
};

Car.move();  // Транспортное средство движется.
Car.drive(); // Машина едет.