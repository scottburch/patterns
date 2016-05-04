var $j = jQuery.noConflict();
var commands = [];
var header = $j('header');
var workspace = $j('workspace');

var color = 'red';

var changeColor = c => color = c;

var selectors = document.querySelectorAll('.color-selector');
Array.prototype.forEach.call(selectors, s => s.addEventListener('click', changeColor.bind(null, s.getAttribute('data-color'))));

workspace.click(drawBox);


function Selector(c) {
    var el = $j(`<a href="#" id="${c}" class="color-selector" style="background-color: ${c}; height: 50px; width: 50px; display:inline-block"></a>`);
    header.append(el);
    el.click(() => {
        var prevColor = color;
        doCommand({
            exec: () => {
                color = c;
                $j('.color-selector').css('border', 'none');
                el.css('border', '2px solid black')
            },
            undo: () => {
                color = prevColor;
                $j('.color-selector').css('border', 'none');
                header.find(`#${prevColor}`).css('border', '2px solid black')
            }
        })
    });
}

Selector('red');
Selector('green');
Selector('blue');

function Btn(text, cmd) {
    var el = $j(`<a href="#" style="border: 1px solid black; display: inline-block; margin-left: 20px; font-size:34px; padding:7px">${text}</a>`);
    header.append(el);
    el.click(cmd);
}

Btn('Undo', undo);
Btn('Play', play);
Btn('Blacken', blacken);

function drawBox(ev) {
    var box = $j(`<div style="background-color:${color};height:30px; width:30px; position:fixed; top:${ev.pageY - 15}; left: ${ev.pageX - 15}"></div>`);
    doCommand({
        exec: () => workspace.append(box),
        undo: () => box.remove()
    });
}

function doCommand(cmd) {
    cmd.exec();
    commands.push(cmd);
}

function undo() {
    commands.pop().undo();
}

function play() {
    workspace.html('');
    (function loop(cmds) {
        cmds.shift().exec();
        cmds.length && setTimeout(() => loop(cmds), 700);
    }(commands.slice()));
}

function blacken() {
    workspace.find('div').each(function () {
        var origColor = $j(this).css('background-color');
        doCommand({
            exec: () => $j(this).css('background-color', 'black'),
            undo: () => $j(this).css('background-color', origColor)
        });

    });
}