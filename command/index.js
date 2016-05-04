var commands = [() => workspace.innerHTML = ''];
var workspace = document.querySelector('workspace');
var undoBtn = document.querySelector('#undo');
var playBtn = document.querySelector('#play');

var color = 'red';

var changeColor = c => color = c;

var selectors = document.querySelectorAll('.color-selector');
Array.prototype.forEach.call(selectors,s => s.addEventListener('click', changeColor.bind(null, s.getAttribute('data-color'))));

workspace.addEventListener('click', drawBox);
undoBtn.addEventListener('click', undo);
playBtn.addEventListener('click', play);

function drawBox(ev) {
    var html = `${workspace.innerHTML}<div style="background-color:${color};height:30px; width:30px; position:fixed; top:${ev.y-15}; left: ${ev.x-15}"></div>`;
    doCommand(() => workspace.innerHTML = html);
}

function doCommand(cmd) {
    commands.push(cmd);
    cmd();
}

function undo() {
        commands.pop();
        commands[commands.length-1]();
}

function play() {
    (function loop(cmds) {
        cmds.shift()();
        cmds.length && setTimeout(() => loop(cmds), 1000);
    }(commands.slice()));
}

