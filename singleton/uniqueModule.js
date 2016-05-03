module.exports = () => {
    var count = 0;
    return () => count++;
};