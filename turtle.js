var Turtle = {
  drawing:  true,
  angle:    0,
  posX: 0,
  posY: 0,
  canvasId: null,
  canvas:   null,
  ctx:      null,
  angleAsRad: function(angle) { return Turtle.angle * Math.PI / 180; }
};

function initCanvas(canvasId, bgcolor, pcolor) {
  var canvas = document.getElementById(canvasId);
  if (!canvas.getContext) return;
  Turtle.canvasId = canvasId;
  Turtle.canvas = canvas;
  Turtle.ctx = canvas.getContext("2d");

  if (!bgcolor) bgcolor = 'black';
  setbg(bgcolor);

  if (!pcolor) pcolor = 'white';
  setpc(pcolor);

  return true;
}

function clean() {
  Turtle.ctx.clearRect(0, 0, Turtle.canvas.width, Turtle.canvas.height);
}

function clearScreen() {
  Turtle.ctx.clearRect(0, 0, Turtle.canvas.width, Turtle.canvas.height);
  Turtle.posX = Turtle.canvas.width / 2;
  Turtle.posY = Turtle.canvas.height / 2;
  Turtle.angle = 0;
}
var cs = clearScreen;

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


function back(length) {
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
var bk = back;

function rotate(addAngle) {
  Turtle.angle += addAngle;
  Turtle.angle %= 360;
  if (Turtle.angle < 0) Turtle.angle += 360;
}

function setHeading(angle) {
  Turtle.angle = angle;
  Turtle.angle %= 360;
  if (Turtle.angle < 0) Turtle.angle += 360;
}
setH = setHeading;

function home() {
  Turtle.posX = Turtle.canvas.width / 2;
  Turtle.posY = Turtle.canvas.height / 2;
}

// arc

function pos() {
  return [ Turtle.posX, Turtle.posY ];
}

function xCor() {
  return Turtle.posX;
}

function yCor() {
  return Turtle.posY;
}

function heading() {
  return Turtle.angle;
}

function towards(endPos) {
  var startPos = pos();
  var dx = endPos[0] - startPos[0];
  var dy = endPos[1] - startPos[1];
  return (Math.atan(dx, dy) * 180 / Math.PI) - 90;
}

function distance(endPos) {
  var startPos = pos();
  var dx = endPos[0] - startPos[0];
  var dy = endPos[1] - startPos[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function right(angle) {
  rotate(angle);
}
var rt = right;

function left(angle) {
  rotate(-angle);
}
var lt = left;

function setPos(pos) {
  Turtle.posX = pos[0];
  Turtle.posY = pos[1];
}

function setXY(x, y) {
  Turtle.posX = x;
  Turtle.posY = y;
}

function setX(x) {
  Turtle.posX = x;
}

function setY(y) {
  Turtle.posY = y;
}

function squares() {
  home();
  var n = 0;
  var s = 20;
  while (n <= 360) {
    forward(100);
    right(90);
    forward(100);
    right(90);
    forward(100);
    right(90);
    forward(100);
    right(90 + s);
    n += s;
  }
}
