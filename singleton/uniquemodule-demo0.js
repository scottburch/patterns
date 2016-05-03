var counter = require('./uniqueModule');

var counter1 = counter();
var counter2 = counter();

console.log('counter 1', counter1());
console.log('counter 1', counter1());

console.log('--------------------');

console.log('counter 2', counter2());
console.log('counter 2', counter2());
