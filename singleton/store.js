function Store() {
    return Store.instance = Store.instance || {};
}

Store().foo = 'Foo';
Store().bar = 'Bar';
Store().baz = 'Baz';

console.log(Store());


