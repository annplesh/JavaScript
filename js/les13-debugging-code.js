// 1. Найдите с помощью break points ошибку в коде этой функции и исправьте ее:

function hasEvenNumber(arr) {

  let foundEven = false;

  for (let i = 0; i < arr.length; i++) {

    if (arr[i] % 2 === 0) {

      foundEven = true;

    }

  }

  return foundEven;

}

console.log(hasEvenNumber([1, 3, 4, 5])); // Ожидается: true


// 2. Найдите с помощью debugger ошибку в коде этой функции и исправьте ее:

function calculateAverage(numbers) {

  let sum = 0;

  for (let i = 0; i < numbers.length; i++) {

    sum += numbers[i];

  }

  return sum / numbers.length;

}


console.log(calculateAverage([2, 4, 6])); // Ожидается: 4



// 3. Найдите с помощью console.log ошибку в коде этой функции и исправьте ее:

function findLargestNumber(arr) {

  let largest = arr[0];

  for (let i = 0; i < arr.length; i++) {

    console.log(`i = ${i}, arr[i] = ${arr[i]}, largest = ${largest}`);

    if (arr[i] > largest) {
      
      console.log(largest)

      largest = arr[i];

    }

  }

  return largest;

}

console.log(`Результат: ${findLargestNumber([-10, -20, -30])}`); // Ожидается: -10