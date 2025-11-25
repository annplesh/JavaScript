// 1. Напиши функцию `getUserData`, 
// которая возвращает промис с данными пользователя через 2 секунды. 
// Затем создай цепочку промисов, 
// которая обрабатывает эти данные и выводит результат в консоль;

function getUserData(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = {
                1: { id: 1, name: "Анна", age: 40 },
                2: { id: 2, name: "Иван" } // ошибка - нет возраста
            };

            const user = users[id];

            // Проверка на наличие обязательных данных
            if (user && user.name && user.age) {
                resolve(user);
            } else {
                reject(new Error(`Пользователь с id ${id} имеет неполные данные`));
            }
        }, 2000);
    });
}

// Успешный сценарий
getUserData(1)
    .then(user => {
        console.log("Данные получены:", user);
        return `Привет, ${user.name}!`;
    })
    .then(message => {
        console.log("Сообщение:", message);
    })
    .catch(error => {
        console.error("Ошибка:", error.message);
    });

// Ошибочный сценарий
getUserData(2)
    .then(user => {
        console.log("Данные получены:", user);
        return `Привет, ${user.name}!`;
    })
    .then(message => {
        console.log("Сообщение:", message);
    })
    .catch(error => {
        console.error("Ошибка:", error.message);
    });

// 2. Напиши две функции, каждая из которых возвращает промис 
// с данными через 3 и 5 секунд соответственно. 
// Используй такой метод промисов, чтобы дождаться выполнения обоих промисов 
// и вывести результаты в консоль;

function getDataFast() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Данные из функции getDataFast (3 секунды)");
        }, 3000);
    });
}

function getDataSlow() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Данные из функции getDataSlow (5 секунд)");
        }, 5000);
    });
}

// Promise.all ждёт выполнения всех промисов.
// Так как второй промис завершается через 5 секунд,
// итоговое сообщение появится только после его завершения.
Promise.all([getDataFast(), getDataSlow()])
    .then(results => {
        console.log("Все промисы завершены");
        console.log("Результаты:", results);
    })
    .catch(error => {
        console.error("Ошибка:", error.message);
    });

// 3. Напиши две функции, каждая из которых возвращает промис
//  через случайное время (от 1 до 5 секунд). 
// Используй такой метод промисов, 
// чтобы вывести результат первого выполненного промиса в консоль.

function getRandomData1() {
    return new Promise((resolve) => {
        const time = Math.floor(Math.random() * 5 + 1) * 1000; // от 1000 до 5000 мс
        setTimeout(() => {
            resolve(`Результат из getRandomData1 (задержка ${time / 1000} сек.)`);
        }, time);
    });
}

function getRandomData2() {
    return new Promise((resolve) => {
        const time = Math.floor(Math.random() * 5 + 1) * 1000;
        setTimeout(() => {
            resolve(`Результат из getRandomData2 (задержка ${time / 1000} сек.)`);
        }, time);
    });
}

// Promise.race вернёт результат первого завершившегося промиса
Promise.race([getRandomData1(), getRandomData2()])
    .then(result => {
        console.log("Первый завершившийся промис:", result);
    })
    .catch(error => {
        console.error("Ошибка:", error.message);
    });