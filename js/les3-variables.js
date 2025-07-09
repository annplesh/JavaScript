// let - переопределяется
let price = 100;
console.log(price);

price = 150;
console.log(price);

/*
const cost = 100;
console.log(cost);

cost = 150; ОШИБКА! TypeError: Assignment to constant variable, т.к. переменная const непереопределяется
console.log(cost);
*/

/* 
let _price = 100;
let _price = 150
console.log(price);

const cost = 100;
const cost = 150;
console.log(cost);
Переменные должны быть уникальными, чтобы не появлялось ошибки SyntaxError: Identifier '_price' has already been declared
*/

