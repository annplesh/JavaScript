// 1. Создай класс Car с конструктором, который принимает марку и модель автомобиля. 
// Добавь метод для вывода информации об автомобиле. 
// Создай несколько экземпляров класса и выведи их информацию;

class Car {
    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    info() {
        console.log(`Автомобиль: ${this.brand} ${this.model}`);
    }
}

const car1 = new Car("Toyota", "Corolla");
const car2 = new Car("Ford", "Focus");
const car3 = new Car("Honda", "Civic");

car1.info(); // Автомобиль: Toyota Corolla
car2.info(); // Автомобиль: Ford Focus
car3.info(); // Автомобиль: Honda Civic

// 2. Создай класс ElectricCar, 
// который наследует класс Car и добавь дополнительное свойство для емкости батареи. 
// Переопредели метод вывода информации, чтобы включить информацию о батарее;

class ElectricCar extends Car {
    constructor(brand, model, batteryCapacity) {
        // вызываем конструктор родительского класса c помощью super
        super(brand, model);
        this.batteryCapacity = batteryCapacity;
    }

    // переопределяем метод info()
    info() {
        console.log(
            `Электромобиль: ${this.brand} ${this.model}, батарея: ${this.batteryCapacity} kWh`
        );
    }
}

const tesla = new ElectricCar("Tesla", "Model 3", 75);
const nissan = new ElectricCar("Nissan", "Leaf", 40);

tesla.info(); // Электромобиль: Tesla Model 3, батарея: 75 kWh
nissan.info(); // Электромобиль: Nissan Leaf, батарея: 40 kWh

// 3. Напиши пример использования полиморфизма, 
// создав несколько классов, наследующих общий базовый класс, 
// и вызывая общий метод для всех объектов.

// Родительский класс
class Notification {
    constructor(message) {
        this.message = message;
    }

    send() {
        console.log("Отправка уведомления...");
    }
}

// Уведомление по Email
class EmailNotification extends Notification {
    send() {
        console.log(`Отправка Email: ${this.message}`);
    }
}

// Уведомление по SMS
class SMSNotification extends Notification {
    send() {
        console.log(`Отправка SMS: ${this.message}`);
    }
}

// Уведомление через Push
class PushNotification extends Notification {
    send() {
        console.log(`Отправка Push: ${this.message}`);
    }
}

// Массив разных уведомлений
const notifications = [
    new EmailNotification("Ваш заказ подтвержден."),
    new SMSNotification("Ваш код: 12345"),
    new PushNotification("У вас новое сообщение!")
];

// Вызов одного метода для всех объектов
notifications.forEach(n => n.send());