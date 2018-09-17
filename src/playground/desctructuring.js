// OBJECT DESTRUCTURING

// const person = {
//   name: 'Alan',
//   age: 35,
//   location: {
//     city: 'Chicago',
//     temp: 72
//   }
// };
//
// const { name = 'Anonymous', age } = person;
//
// console.log(`${name} is ${age}.`);
//
// const { temp: temperature, city } = person.location;
//
// if (city && temperature) {
//   console.log(`It is ${temperature} in ${city}.`);
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// };
//
// const { name: publisherName = 'Self-Published' } = book.publisher;
//
// console.log(publisherName);

// ARRAY DESTRUCTURING

const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
const [street, city, state, zip] = address;
console.log(`You are in ${city}, ${state}.`);

const item = ['Coffee (HOT)', '$2.00', '$2.50', '$2.75'];
const [itemName, , mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);
