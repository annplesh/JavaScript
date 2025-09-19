// 1 задание
// В следующем коде несколько раз повторяются похожие операции. Проведите рефакторинг, чтобы избежать дублирования,
// используя функции или другие средства:

/*
const product1 = { name: 'Product 1', price: 10 };
const product2 = { name: 'Product 2', price: 20 };

const total1 = product1.price * 1.2;
const total2 = product2.price * 1.2;

console.log('Total for Product 1:', total1);
console.log('Total for Product 2:', total2);
*/

const products = [
    { name: 'Product 1', price: 10 },
    { name: 'Product 2', price: 20 }
];

function showTotal(product) {
    const total = product.price * 1.2;
    console.log(`Total for ${product.name}:`, total)
}

products.forEach(showTotal);

// 2 задание
// Код ниже содержит сложные вложенные условия. Упростите его, чтобы улучшить читаемость и уменьшить вероятность ошибок:

/*
if (user.isAdmin) {
    if (user.isActive) {
        if (user.age > 18) {
            console.log('Access granted');
        }
    }
}
*/

const user = {
    isAdmin: true,
    isActive: true,
    age: 30
};

if (user.isAdmin && user.isActive && user.age > 18) {
    console.log('Access granted');
}

// 3 задание
// В следующей функции выполняется слишком много операций. Разделите её на несколько более коротких функций,
// чтобы улучшить читаемость и повторное использование кода:

const sampleOrder = {
    id: 'A123',
    items: [
        { name: 'Notebook', price: 10, quantity: 2 },
        { name: 'Pen', price: 2, quantity: 5 }
    ]
};

function checkStock(item) {
    return Math.random() < 0.5; // Возвращает рандомно true или false, это просто иммитация функции!
}
/*
function processOrder(order) {
    Валидация данных заказа
    if (!order.id || !order.items || order.items.length === 0) {
        console.log('Invalid order');
        return;
    }
*/

function isValidOrder(order) {
    return order.id && Array.isArray(order.items) && order.items.length > 0;
}

/*
    Рассчет суммы
    let total = 0;
    for (let item of order.items) {
        total +=
         item.price * item.quantity;
    }
*/

function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/*
    Проверка наличия на складе
    for (let item of order.items) {
        if (!checkStock(item)) {
            console.log('Item out of stock:', item.name);
            return;
        }
    }
*/
function allItemsInStock(order) {
    for (let item of order.items) {
        if (!checkStock(item)) {
            console.log('Item out of stock:', item.name);
            return false;
        }
    }
    return true;
}

//Основная функция обработки заказа
function processOrder(order) {
  if (!isValidOrder(order)) {
    console.log('Invalid order');
    return;
  }

  const total = calculateTotal(order.items);

  if (!allItemsInStock(order)) {
    return;
  }

  finalizeOrder(total);
}

/*
    Выполнение заказа
    console.log('Order processed with total:', total);
}
*/
function finalizeOrder(total) {
    console.log('Order processed with total:', total);
}

processOrder(sampleOrder);