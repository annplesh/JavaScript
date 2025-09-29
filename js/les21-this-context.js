// 1. Создай объект со свойствами и методом, 
// который использует `this` для доступа к этим свойствам. 
// Затем присвой этот метод другой переменной и вызовите её. 
// Объясни своими словами, что произошло;

const user1 = {
  name: "Анна",
  sayHi: function () {
    console.log(`Привет, я ${this.name}`);
  }
};

// Вызов метода напрямую — работает
user1.sayHi(); // Привет, я Aнна

// Присваиваем метод переменной
const greet = user1.sayHi;

// !Ошибка
// greet(); // Привет, я undefined — this больше не указывает на user1

//Метод, использующий this, работает корректно только в контексте объекта. 
// При передаче метода в переменную — контекст теряется, 
// и this больше не ссылается на исходный объект.

//2. Объясни, почему в примере ниже в первом случае выводится имя, а во втором - undefined. 
// Как сделать так, чтобы в методе delayedGreet тоже выводилось имя (без использования call, apply или bind)?

const student = {
    name: 'Alice',
    greet: function() {
        console.log(`Hello, ${this.name}!`);
    },

  /*delayedGreet: function() {
    setTimeout(this.greet, 1000);
  }
    */

    delayedGreet: function() {
        setTimeout(() => {
        this.greet(); // Hello, Alice повится в консоли последним из-за отложеного вызова через setTimeOut
        }, 1000);
    }
};

student.greet(); // Hello, Alice
// student.greet() работает корректно, потому что метод вызывается через объект student.
// В этом случае this указывает на сам объект student, и this.name возвращает 'Alice'.

// student.delayedGreet(); // Hello, undefined 
// Здесь метод greet передаётся как обычная функция, и теряет привязку к объекту.
// Внутри setTimeout this больше не указывает на student, поэтому this.name становится undefined.
// Чтобы исправить нужно использовать стрелочную функцию

student.delayedGreet(); // Hello, Alice — потому что стрелочная функция внутри setTimeout сохраняет контекст this,
// и он остаётся привязан к объекту student.

// 3. Напиши функцию и вызови её с разными контекстами, 
// используя `call`, `apply` и `bind`;

function introduce(greeting, punctuation){
    console.log(`${greeting}, я ${this.name}${punctuation}`);
}

const person1 = {name: 'Anna'};
const person2 = {name: 'Victor'};

// !call — передаёт аргументы как отдельные параметры
introduce.call(person1, "Привет", "!"); // Привет, я Anna!
introduce.call(person2, "Hola", "."); // Hola, я Victor.

// ! apply — передаёт аргументы массивом
introduce.apply(person1, ["Здравствуйте", "."]); // Здравствуйте, я Anna.
introduce.apply(person2, ["Hola", "!"]); // Hola, я Victor!

// !bind — создаёт новую функцию с привязанным контекстом и аргументами,
// ! которую можно вызвать позже
const annaIntro = introduce.bind(person1, "Привет", "!");
const carlosIntro = introduce.bind(person2, "Hola", ".");

annaIntro();   // Привет, я Anna!
carlosIntro(); // Hola, я Victor.

// 4. Что будет в консоли в результате выполнения функций 
// sayHelloToAdmin() и sayHelloToUser()? 
// Объясни, почему так произошло. Как это можно изменить?

function sayHello() {
    console.log('Hello, ' + this.name)
}

const admin = {
    name: 'Bob'
};

const user = {
    name: 'John'
};

const sayHelloToAdmin = sayHello.bind(admin)
sayHelloToAdmin() // Hello, Bob

const sayHelloToUser = sayHelloToAdmin.bind(user)
sayHelloToUser() // Hello, Bob

// sayHelloToAdmin = sayHello.bind(admin) 
// создаёт новую функцию, где this навсегда привязан к admin.

// sayHelloToUser = sayHelloToAdmin.bind(user)
//пытается изменить this, но не может, потому что sayHelloToAdmin — уже связанная функция.

//  Метод bind нельзя использовать дважды для изменения контекста функции. 
// Повторный вызов bind на уже привязанной функции не изменяет контекст.

// ! Решение: использовать call или apply при вызове
function sayHello2() {
  console.log('Hello, ' + this.name);
}

const admin2 = { name: 'Bob' };
const user2 = { name: 'John' };

// Вызов с нужным контекстом:
sayHello2.call(admin2); // Hello, Bob
sayHello2.call(user2);  // Hello, John

// apply работает почти так же, как call, но аргументы (если есть) передаются массивом.
// В этом случае функция sayHello2 не принимает аргументы, поэтому apply просто передаёт this.
