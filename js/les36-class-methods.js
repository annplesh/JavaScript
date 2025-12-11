// 1. Создай класс Counter, который будет иметь приватное свойство count. 
// Напиши публичные методы для увеличения, 
// уменьшения и отображения значения счетчика;

class Counter {
    // приватное свойство
    #count = 0;

    // публичный метод увеличения
    increment() {
        this.#count++;
    }

    // публичный метод уменьшения
    decrement() {
        this.#count--;
    }

    // публичный метод отображения значения
    getValue() {
        return this.#count;
    }
}

const counter = new Counter();

counter.increment(); // увеличиваем счетчик до 2
counter.increment(); // 
console.log(counter.getValue()); // 2

counter.decrement(); // уменьшаем счетчик до 1
console.log(counter.getValue()); // 1

// 2. Создай класс EmailValidator со статическим методом isValid(email), 
// который будет проверять, является ли строка корректным email 
// (достаточно простой проверки на наличие символа @);

class EmailValidator {
    static isValid(email) { // статический метод можно вызывать без создания экземпляра класса
        // проверка на наличие символа '@'
        return typeof email === 'string' && email.includes('@');
    }
}

console.log(EmailValidator.isValid("user@example.com")); // true
console.log(EmailValidator.isValid("invalid-email.com")); // false

// 3. Создай класс Order с приватным методом #calculateTotal(), 
// который будет рассчитывать общую стоимость заказа. 
// Сделай публичный метод, который возвращает результат этого расчета, 
// и вызывай его через созданный экземпляр класса.

class Order {
    #items;

    constructor() {
        this.#items = []; // изначально заказ пустой
    }

    // добавить товар в заказ
    addItem(name, price, quantity = 1) {
        this.#items.push({ name, price, quantity });
    }

    // приватный метод для расчёта общей суммы
    #calculateTotal() {
        return this.#items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    // публичный метод для получения суммы
    getTotal() {
        return this.#calculateTotal();
    }

    // вывести список товаров
    printItems() {
        this.#items.forEach(item => {
            console.log(`${item.name} — ${item.quantity} шт. × ${item.price} = ${item.price * item.quantity}`);
        });
    }
}

const order = new Order();
order.addItem("Ноутбук", 1000, 1);
order.addItem("Мышь", 50, 2);
order.addItem("Клавиатура", 80, 1);

order.printItems();
// Ноутбук — 1 шт. × 1000 = 1000
// Мышь — 2 шт. × 50 = 100
// Клавиатура — 1 шт. × 80 = 80

console.log("Итого:", order.getTotal()); // Итого: 1180