var commands = [];
var workspace = document.querySelector('workspace');
var undoBtn = document.querySelector('#undo');
var playBtn = document.querySelector('#play');
var halfBtn = document.querySelector('#half');

var color = 'red';

var changeColor = c => color = c;

var selectors = document.querySelectorAll('.color-selector');
Array.prototype.forEach.call(selectors,s => s.addEventListener('click', changeColor.bind(null, s.getAttribute('data-color'))));

workspace.addEventListener('click', drawBox);
undoBtn.addEventListener('click', undo);
playBtn.addEventListener('click', play);
halfBtn.addEventListener('click', half);

function drawBox(ev) {
    var html = `${workspace.innerHTML}<div style="background-color:${color};height:30px; width:30px; position:fixed; top:${ev.y-15}; left: ${ev.x-15}"></div>`;
    var prevHTML = workspace.innerHTML;
    doCommand({
        exec: () => workspace.innerHTML = html,
        undo: () => workspace.innerHTML = prevHTML
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
    (function loop(cmds) {
        cmds.shift().exec();
        cmds.length && setTimeout(() => loop(cmds), 700);
    }(commands.slice()));
}

function half() {
    var len = Math.floor(commands.length / 2);
    while(len--) {
        commands.pop().undo();
    }
}
