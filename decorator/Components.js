var Text = string => ({
    draw() {
        return `<div>${string}</div>`;
    }
});

var Right = body => ({
    draw() {
        return `<div style="float: right">${body.draw()}</div>`;
    }
});

var Left = body => ({
    draw() {
        return `<div style="float: left">${body.draw()}</div>`;
    }
});

var Bold = body => ({
    draw() {
        return `<strong>${body.draw()}</strong>`;
    }
});

var Big = body => ({
    draw() {
        return `<span style="font-size: 30px">${body.draw()}</span>`;
    }
});

var Button = body => ({
    draw() {
        return `<div style="border:2px solid red">${body.draw()}</div>`;
    }
});

var Shadow = body => ({
    draw() {
        return `<div style="border-bottom: 5px solid #888">${body.draw()}</div>`;
    }
});

var draw = (...styles) => {
    document.write(styles.reduce((last, that) => last ? that(last) : that).draw());
};

draw(Text('My Button'), Bold, Big, Button, Shadow, Left);
draw(Text('Text with shadow'), Bold, Shadow, Right);