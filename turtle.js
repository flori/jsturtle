var Turtle = {
  drawing:  true,
  angle:    0,
  posX: 0,
  posY: 0,
  canvasId: null,
  canvas:   null,
  ctx:      null,
  angleAsRad: function(angle) { return (Turtle.angle / 180 ) * Math.PI; }
};

function initCanvas(canvasId, bgcolor, pcolor) {
  var canvas = document.getElementById(canvasId);
  if (!canvas.getContext) return;
  Turtle.canvasId = canvasId;
  Turtle.canvas = canvas;
  Turtle.ctx = canvas.getContext("2d");
  Turtle.posX = canvas.width / 2;
  Turtle.posY = canvas.height / 2;

  if (!bgcolor) bgcolor = 'black';
  setbg(bgcolor);

  if (!pcolor) pcolor = 'white';
  setpc(pcolor);

  return true;
}

function clearGraphics() {
  Turtle.ctx.clearRect(0, 0, Turtle.canvas.width, Turtle.canvas.height);
}
var cg = clearGraphics;

function penup() {
  Turtle.drawing = false;
}
var pu = penup;

function pendown() {
  Turtle.drawing = true;
}
var pd = pendown;

function setpc(color) {
  Turtle.ctx.strokeStyle = color;
}

function setbg(color) {
  Turtle.canvas.style.background = color;
}

function forward(length) {
  var x = length * Math.cos(Turtle.angleAsRad());
  var y = length * Math.sin(Turtle.angleAsRad());
  if (Turtle.drawing) {
    Turtle.ctx.moveTo(Turtle.posX, Turtle.posY);
    Turtle.ctx.lineTo(Turtle.posX + x, Turtle.posY + y);
    Turtle.ctx.stroke();
  }
  Turtle.posX += x;
  Turtle.posY += y;
}
var fd = forward;


function backward(length) {
  var x = length * Math.cos(Turtle.angleAsRad() - Math.PI);
  var y = length * Math.sin(Turtle.angleAsRad() - Math.PI);
  if (Turtle.drawing) {
    Turtle.ctx.moveTo(Turtle.posX, Turtle.posY);
    Turtle.ctx.lineTo(Turtle.posX + x, Turtle.posY + y);
    Turtle.ctx.stroke();
  }
  Turtle.posX += x;
  Turtle.posY += y;
}
var bd = backward;

function rotate(addAngle) {
  Turtle.angle += addAngle;
  Turtle.angle %= 360;
}
var rt = rotate;

function squares() {
  var n = 0;
  var s = 3;
  while (n <= 360) {
    forward(100);
    rotate(90);
    forward(100);
    rotate(90);
    forward(100);
    rotate(90);
    forward(100);
    rotate(90 + s);
    n += s;
  }
}
