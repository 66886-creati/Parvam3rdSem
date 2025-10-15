const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => console.log(num));

const newNumbers = [1, 2, 3];
const doubled = [];
newNumbers.forEach((num) => doubled.push(num * 2));
console.log(doubled);

const users = [
    {name: "Alice", active: false},
    {name: "Bob", active: false},
    {name: "Charlie", active: false},
];
users.forEach((user) =>  (user.active = true));
console.log(users);

const userDetails = [
    {name:"Alice", email:"alice@email.com" },
    {name:"Bob", email: "bob@email.com"},
    {name:"Charlie", email: "charlie@email.com"},
];
const notifications = [];
userDetails.forEach ((user) => {
notifications.push(`Email sent to ${user.name} at ${user.email}`);
});
console.log(notifications);