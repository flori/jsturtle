var Turtle = {
  drawing:  false,
  angle:    0,
  posX:     0,
  posY:     0,
  canvasId: null,
  canvas:   null,
  ctx:      null
};

Turtle.deg2rad = function(angle) {
  return angle * Math.PI / 180;
};

Turtle.rad2deg = function(angle) {
  return angle * 180 / Math.PI;
};

Turtle.angleAsRad = function() {
  return Turtle.angle * Math.PI / 180;
};

Turtle.prepareColor = function(color) {
  if (color instanceof Array) {
    switch (color.length) {
      case 3:
        color = 'rgb(' + Math.round(color[0]) + ',' +
          Math.round(color[1]) + ',' +
          Math.round(color[2]) + ')';
        break;
      case 4:
        color = 'rgba(' + Math.round(color[0]) + ',' +
          Math.round(color[1]) + ',' +
          Math.round(color[2]) + ',' +
          Math.round(color[3]) + ')';
        break;
      default:
      throw("only arrays of length 3 or 4 allowed");
    }
  }
  return color;
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
    Turtle.ctx.beginPath();
    Turtle.ctx.moveTo(Turtle.posX, Turtle.posY);
    Turtle.ctx.lineTo(Turtle.posX + x, Turtle.posY + y);
    Turtle.ctx.stroke();
  }
  Turtle.posX += x;
  Turtle.posY += y;
};

Turtle.rotate = function(addAngle) {
  Turtle.angle += addAngle;
  Turtle.angle %= 360;
  if (Turtle.angle < 0) Turtle.angle += 360;
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
}
var cs = clearScreen;

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
  color = Turtle.prepareColor(color);
  Turtle.ctx.strokeStyle = color;
  Turtle.ctx.fillStyle = color;
}
setPC = setPenColor;

function setBackground(color) {
  color = Turtle.prepareColor(color);
  Turtle.canvas.style.background = color;
}
var setBG = setBackground;

function setPenSize(size) {
  
}

function forward(length) {
  var x = length * Math.cos(Turtle.angleAsRad());
  var y = length * Math.sin(Turtle.angleAsRad());
  Turtle.moveTo(x, y);
}
var fd = forward;


function back(length) {
  var x = length * Math.cos(Turtle.angleAsRad() - Math.PI);
  var y = length * Math.sin(Turtle.angleAsRad() - Math.PI);
  Turtle.moveTo(x, y);
}
var bk = back;

function setHeading(angle) {
  Turtle.angle = angle;
  Turtle.angle %= 360;
  if (Turtle.angle < 0) Turtle.angle += 360;
}
var setH = setHeading;

function home() {
  Turtle.posX = Turtle.canvas.width / 2;
  Turtle.posY = Turtle.canvas.height / 2;
}

function arc(radius, angle) {
  var oldDrawing = Turtle.drawing;
  Turtle.drawing = false;
  back(radius);
  var startAngle = Turtle.angleAsRad();
  var endAngle = startAngle + Turtle.deg2rad(angle);
  Turtle.ctx.beginPath();
  Turtle.ctx.arc(Turtle.posX, Turtle.posY, radius, startAngle, endAngle, startAngle > endAngle);
  Turtle.ctx.stroke();
  right(angle);
  forward(radius);
  Turtle.drawing = oldDrawing;
}

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
  return Turtle.rad2deg(Math.atan(dy / dx));
}

function distance(endPos) {
  var startPos = pos();
  var dx = endPos[0] - startPos[0];
  var dy = endPos[1] - startPos[1];
  return Math.sqrt(dx * dx + dy * dy);
}

function right(angle) {
  Turtle.rotate(angle);
}
var rt = right;

function left(angle) {
  Turtle.rotate(-angle);
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

function print() {
  if (!console) return;
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

function shapes() {
  var size = 10;
  var step = 10;
  var color = 0;
  penUp();
  back(100);
  right(90);
  forward(100);
  left(180);
  penDown();
  repeat(36, function(x) {
    color = Math.round(256 * (x / 35));
    setPenColor('rgb(0,' + color + ',0)');
    regPoly(7, size);
    right(step);
    size *= 1.08;
  });
}

function draw() {
  setBackground('#020');
  //shapes();
  fd(100); rt(100);
  fd(100); rt(100);
  fd(100); 
  print(towards([320, 200]));
  setH(towards([320, 200]));
  fd(distance([320, 200]));
}

