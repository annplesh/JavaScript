// 1. Напиши асинхронную функцию`delay`, 
// которая принимает один аргумент - количество миллисекунд, 
// и возвращает промис, который разрешается(резолвится) через заданное количество времени.
// Используй `async/await` для ожидания этого промиса и 
// выведите сообщение "Задержка завершена" после завершения ожидания;

// Утилита для имитации задержки
async function delay(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
    console.log("Задержка завершена");
}

// Пример использования
async function runExample() {
    console.log("Начинаем ожидание...");
    await delay(2000); // ждём 2 секунды
    console.log("Ожидание завершено");
}

runExample();

// 2. Напиши асинхронную функцию`fetchUserData`,
// которая делает запрос к фейковому API(любому) и возвращает данные пользователя.
// Используй функцию fetch(подробнее о fetch - тут).

async function fetchUserData() {
    console.log("Запрос данных пользователя начат...");

    try {
        await delay(2000); // имитация задержки сети
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const userData = await response.json();

        console.log("Данные пользователя:", userData);
        return userData;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
    } finally {
        console.log("Запрос завершён");
    }
}

fetchUserData();