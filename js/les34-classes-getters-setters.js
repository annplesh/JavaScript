// 1. Напиши класс Book, который имеет поля title, author и pages. 
// Добавь метод для вывода краткой информации о книге;

class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }

    showBookInfo() {
        console.log(`Название: ${this.title}, Автор: ${this.author}, Кол. страниц: ${this.pages}`);
    }
}

const bookNature = new Book("Nature", "Author", 100);

bookNature.showBookInfo();

// 2. Создай класс User с полями name и email, методом displayInfo, 
// который выводит информацию о пользователе. 
// Создай несколько экземпляров и вызови метод displayInfo;

class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    displayInfo() {
        console.log(`Имя: ${this.name}, Email: ${this.email}`);
    }
}

const userAnna = new User("Anna", "anna@example.com");
const userIvan = new User("Ivan", "ivan@example.com");
const userMaria = new User("Maria", "maria@example.com");

userAnna.displayInfo();
userIvan.displayInfo();
userMaria.displayInfo();

// 3. В классе Rectangle из примера добавь геттер perimeter, 
// который вычисляет и возвращает периметр прямоугольника. 
// Добавь сеттер height. 
// Он должен проверять, что устанавливаемое значение высоты height больше 0. 
// Если значение не положительное, то выводится сообщение об ошибке в консоль, 
// а высота остается неизменной.

class Rectangle {
    constructor(width, height) {
        this._width = width;   // внутреннее поле для ширины
        this.height = height;  // !используем сеттер height при создании объекта
    }

    // геттер для площади
    get area() {
        return this.width * this.height;
    }

    // !геттер для периметра
    get perimeter() {
        return 2 * (this.width + this.height);
    }

    // сеттер для ширины
    set width(value) {
        if (value <= 0) {
            console.error("Ширина должна быть положительным числом.");
        } else {
            this._width = value;
        }
    }

    // геттер для ширины
    get width() {
        return this._width;
    }

    // !сеттер для высоты
    set height(value) {
        if (value <= 0) {
            console.error('Высота должна быть положительным числом.');
        } else {
            this._height = value;
        }
    }

    // геттер для высоты
    get height() {
        return this._height;
    }
}

const myRect = new Rectangle(5, 10);

console.log(myRect.area); // 50
console.log(myRect.perimeter); // 30

myRect.width = -3; // Ширина должна быть положительным числом.
console.log(myRect.width); // 5 (сработала проверка и осталась прежней)

myRect.height = -4; // Высота должна быть положительным числом.
console.log(myRect.height); // 10 (сработала проверка и осталась прежней)

myRect.height = 8; // Ширина изменилась на 8
console.log(myRect.perimeter); // 2 * *(5 + 8) = 26

myRect.width = 6; // Ширина изменилась на 6            
console.log(myRect.perimeter); // 2 * (6 + 8) = 28