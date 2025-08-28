// 1. Создай объект, ключи в котором будут описывать тебя
// Например, твое имя, возраст, увлечения и т.д. 
// Обязательно используй разные типы данных: 
// имя - строка, возраст - число, хобби - массив и  т.д. 
// Затем выведи все свои свойства/свойства объекта в консоль(разными способами!);

const person = {
    name: 'Anna',
    age: 40,
    hobbies: ['coding', 'languages', 'fashion design'],
    address: {
        city: 'Caracas',
        country: 'Venezuela'
    },
    isStudent: true,
    greet: function () {
        console.log('Hello!');
    }
};

console.log(person.name); // Anna
console.log(person.age); // 40
console.log(person.hobbies); // [ 'coding', 'languages', 'fashion design' ]
console.log(person.address); // { city: 'Caracas', country: 'Venezuela' }
console.log(person.isStudent); // true
person.greet(); // Hello!

console.log(person['name']);
console.log(person['age']);
console.log(person['hobbies']);
console.log(person['address']);
console.log(person['isStudent']);
console.log(typeof person['greet']);

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

/*
name: Anna
age: 40
hobbies: coding,languages,fashion design
address: [object Object]
isStudent: true
greet: function () {
        console.log('Hello!');
    }
*/

console.log(Object.keys(person)); // [ 'name', 'age', 'hobbies', 'address', 'isStudent', 'greet' ]

console.log(Object.values(person));
/*
[
  'Anna',
  40,
  [ 'coding', 'languages', 'fashion design' ],
  { city: 'Caracas', country: 'Venezuela' },
   true,
  [Function: greet]
]
*/

console.log(Object.entries(person));
/*
[
  [ 'name', 'Anna' ],
  [ 'age', 40 ],
  [ 'hobbies', [ 'coding', 'languages', 'fashion design' ] ],
  [ 'address', { city: 'Caracas', country: 'Venezuela' } ],
  [ 'isStudent', true ],
  [ 'greet', [Function: greet] ]
]
*/

//2. В объект из предыдущего пункта:

// - добавь новое свойство;

// - измени значение существующего свойства;
// - удали любое свойство.
// И снова выведи все свойства объекта в консоль разными способами!

const person1 = {
    name: 'Anna',
    age: 40,
    hobbies: ['coding', 'languages', 'fashion design'],
    address: {
        city: 'Caracas',
        country: 'Venezuela'
    },
    isStudent: true,
    greet: function () {
        console.log('Hello!');
    }
};

person1.skills = ['JavaScript', 'Debugging', 'VS Code', 'Git'];
person1.phone = '123-456-7890';

console.log(person1); // В конец всех свойств добавилсь два новых в порядке их объявления
console.log(person1['skills']); // [ 'JavaScript', 'Debugging', 'VS Code', 'Git' ],
console.log(person1['phone']); // '123-456-7890'

person1.name = 'Anya';
person1['age'] = 41;

console.log(person1.name); // Anya
console.log(person1.age); // 41

delete person1.age;

console.log(person1);
/*
{
  name: 'Anya', - ИМЯ ИЗМЕНИЛОСЬ
  hobbies: [ 'coding', 'languages', 'fashion design' ],
  address: { city: 'Caracas', country: 'Venezuela' },
  isStudent: true,
  greet: [Function: greet],
  skills: [ 'JavaScript', 'Debugging', 'VS Code', 'Git' ], - ДОБАВИЛИСЬ НАВЫКИ 
  phone: '123-456-7890' - ДОБАВИЛСЯ НОМЕР ТЕЛЕФОНА

  СВОЙСТВО AGE - УДАЛЕНО
}
*/