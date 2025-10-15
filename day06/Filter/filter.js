const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter((num) => num % 2 === 0);
console.log(evens); 


const words = ["cat", "elephant", "dog", "butterfly"];
const longWords = words.filter((word) => word.length > 4);
console.log(longWords); 

  const prices = [50, 15, 200, 30, 500];
 const affordable = prices.filter((price) => price < 100);
  console.log(affordable);

const people = [
  { name: "Akash", age: 18},
  { name: "gautham", age: 17 },
  { name: " hari", age: 80 },
  { name: "amith g", age: 19},
];

const adults = people.filter((person) => person.age >= 18);

console.log(adults);