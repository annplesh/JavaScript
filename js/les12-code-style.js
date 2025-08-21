// 1 задание
// Возьмите следующий код и приведите его в соответствие с общепринятым стандартом форматирования,
// соблюдая отступы, выравнивание и правила расстановки пробелов:
function multiply(a, b) {
  return a * b;
}

const person = {
  name: 'Alice',
  age: 30
};

if (person.age > 18) {
  console.log('Adult');
} else {
  console.log('Minor');
}

// 2 задание
// Представьте, что вы работаете в команде, и вам нужно сделать код понятным для всех участников.
// Перепишите следующий код, используя понятные и логичные имена переменных и функций:
function multiply(num1, num2) {
  const result = num1 * num2;
  return result;
}

const finalResult = multiply(5, 10);
console.log(finalResult);

// 3 задание
// Убедитесь, что в коде используется единый стиль оформления. В следующем коде присутствуют смешанные стили кавычек,
// разное использование var, let, и const, а также различное форматирование объектов и массивов. Исправьте код:
const items = ['apple', 'banana', 'orange'];

const price = {
  apple: 1,
  banana: 2,
  orange: 3
};

const total = price['apple'] + price['banana'] + price['orange'];

function calculateTotal(items) {
  return items.reduce(function (total, item) {
    return total + price[item];
  }, 0);
}

// 4 задание
// Создайте функцию validateForm, которая принимает объект формы с полями name, email и password.
// Она должна выполнять проверки для каждого поля. Если какое-то поле не заполнено или содержит неверные данные,
// функция должна сразу возвращать ошибку, используя guard expressions. Если все данные верны,
// функция должна возвращать сообщение "Форма успешно отправлена".

function validateForm(form) {
  if (!form.name || typeof form.name !== 'string') { // Проверка: name должен быть строкой
    return 'Ошибка: имя не указано или некорректно';
  }

  if (
    !form.email ||
    typeof form.email !== 'string' || // Проверка: email должен быть строкой
    !form.email.includes('@') ||
    (
      !form.email.endsWith('.com') && // Проверка: если e-mail заканчивается на .ru, .com
      !form.email.endsWith('.ru')
    )
  ) {
    return 'Ошибка: email не указан или некорректен';
  }

  if (
    !form.password ||
    typeof form.password !== 'string' || // Проверка: пароль должен быть строкой
    form.password.length < 6 || // проверка: должно содержать не менее шести символов
    !/[A-Z]/.test(form.password) || // проверка, если нет заглавной буквы
    !/[0-9]/.test(form.password) || // проверка, если нет цифры
    !/[!@#$%^&*(),.?":{}|<>]/.test(form.password) // проверка, если нет спецсимвола
  ) {
    return 'Пароль должен содержать минимум 6 символов, включая заглавную букву, цифру и специальный символ.';
  }

  return 'Форма успешно отправлена';
}

const testForm = {
  name: 'Anna',
  email: 'anna@example.com',
  password: 'Example1!'
};

console.log(validateForm(testForm));
