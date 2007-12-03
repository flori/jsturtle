var Turtle = {
  drawing:  false,
  hidden:   false,
  angle:    0,
  posX:     0,
  posY:     0,
  canvasId: null,
  canvas:   null,
  ctx:      null,
};

Turtle.angleAsRad = function(angle) {
  return Turtle.angle * Math.PI / 180;
};

Turtle.init = function(canvasId, bgcolor, pcolor) {
  var canvas = document.getElementById(canvasId);
  if (!canvas.getContext) return;
  Turtle.canvasId = canvasId;
  Turtle.canvas = canvas;
  Turtle.ctx = canvas.getContext("2d");

  if (!bgcolor) bgcolor = 'black';
  setBackground(bgcolor);

  if (!pcolor) pcolor = 'white';
  setPenColor(pcolor);

  clearScreen();

  return true;
};

Turtle.moveTo = function(x, y) {
  if (Turtle.drawing) {
    Turtle.ctx.moveTo(Turtle.posX, Turtle.posY);
    Turtle.ctx.lineTo(Turtle.posX + x, Turtle.posY + y);
    Turtle.ctx.stroke();
  }
  Turtle.posX += x;
  Turtle.posY += y;
};

Turtle.forward = function(length, turtle) {
  var x = length * Math.cos(Turtle.angleAsRad());
  var y = length * Math.sin(Turtle.angleAsRad());
  Turtle.moveTo(x, y);
  if (turtle) Turtle.drawTurtle();
};

Turtle.back = function(length, turtle) {
  var x = length * Math.cos(Turtle.angleAsRad() - Math.PI);
  var y = length * Math.sin(Turtle.angleAsRad() - Math.PI);
  Turtle.moveTo(x, y);
  if (turtle) Turtle.drawTurtle();
};

Turtle.rotate = function(addAngle, turtle) {
  Turtle.angle += addAngle;
  Turtle.angle %= 360;
  if (Turtle.angle < 0) Turtle.angle += 360;
  if (turtle) Turtle.drawTurtle();
}

Turtle.drawTurtle = function() {
  if (Turtle.hidden) return;
  var oldDrawing = Turtle.drawing;
  var oldPos = pos();
  var oldHeading = Turtle.angle;
  penUp();
  Turtle.back(10);
  Turtle.rotate(-90);
  Turtle.forward(5);
  penDown();
  repeat(3, function() {
    Turtle.rotate(120);
    Turtle.forward(10);
  });
  setPos(oldPos);
  setHeading(oldHeading);
  Turtle.drawing = oldDrawing;
};

function clean() {
  Turtle.ctx.clearRect(0, 0, Turtle.canvas.width, Turtle.canvas.height);
}

function clearScreen() {
  Turtle.ctx.clearRect(0, 0, Turtle.canvas.width, Turtle.canvas.height);
  Turtle.posX = Turtle.canvas.width / 2;
  Turtle.posY = Turtle.canvas.height / 2;
  Turtle.angle = 0;
  Turtle.drawing = true;
  Turtle.hidden = true;
  Turtle.drawTurtle();
}
var cs = clearScreen;

function hideTurtle() {
  Turtle.hidden = true;
}
var ht = hideTurtle;

function isTurtleHidden() {
  return Turtle.hidden;
}

function showTurtle() {
  Turtle.hidden = false;
}
var st = showTurtle;

function isTurtleShown() {
  return !Turtle.hidden;
}

// wrap, window, fence

// fill

function penUp() {
  Turtle.drawing = false;
}
var pu = penUp;

function isPenUp() {
  return !Turtle.drawing;
}

function penDown() {
  Turtle.drawing = true;
}
var pd = penDown;

function isPenDown() {
  return Turtle.drawing;
}

// penPaint, penErase, penRevert

function setPenColor(color) {
  Turtle.ctx.strokeStyle = color;
}
setPC = setPenColor;

function setBackground(color) {
  Turtle.canvas.style.background = color;
}
setBG = setBackground;

function setPenSize(size) {
  
}

function forward(length) {
  Turtle.forward(length, true);
}
var fd = forward;


function back(length) {
  Turtle.back(length, true);
}
var bk = back;

function rotate(addAngle) {
  Turtle.rotate(addAngle, true);
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

function repeat(n, block) {
  for (var i = 0; i < n; i++) block(i);
}

function forever(block) {
  var i = 0;
  for (;; i++) block(i);
}

function regPoly(edges, size) {
  repeat(edges, function() {
    forward(size);
    right(360 / edges);
  });
}

function squares() {
  var size = 10;
  var step = 10;
  penUp();
  back(100);
  right(90);
  forward(100);
  left(180);
  penDown();
  repeat(36, function() {
    regPoly(7, size);
    right(step);
    size *= 1.08;
  });
}

function draw() {
  squares();
}

