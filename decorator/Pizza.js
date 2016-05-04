var R = require('ramda');


var Pizza = () => ({
    getPrice() {return 12.00},
    make() {return 'flatten dough and add sauce'}
});

var Olives = pizza => ({
    getPrice() {
        return .50 + pizza.getPrice();
    },
    make() {return `${pizza.make()}, add Olives`}
});


var Pepperoni = pizza => ({
    getPrice() {
        return 1.00 + pizza.getPrice();
    },
    make() {return `${pizza.make()}, add pepperoni`}

});

var price = p => `$${p.getPrice().toFixed(2)}`;

var createPizza = (...ingredients) =>
    R.pipe.apply(R, ingredients)(Pizza());

console.log('-------- Pizza 1 -------------');
var pizza1 = createPizza(Olives);
console.log(pizza1.make());
console.log(price(pizza1));

console.log('\n\n--------- Pizza 2 ------------');
var pizza2 = createPizza(Olives, Pepperoni);
console.log(pizza2.make());
console.log(price(pizza2));



