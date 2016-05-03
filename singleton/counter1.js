function Counter() {
    var count = 0;
    return Counter.instance = Counter.instance || {
            count() {
                return count++
            }
        }
}

console.log(Counter().count());
console.log(Counter().count());
console.log(Counter().count());

Counter().something = "FOO";
console.log(Counter().something);


