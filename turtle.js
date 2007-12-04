/*
 * Implementation
 */

function Turtle(canvasId, bgcolor, pcolor) {
  var that = this;
  that.drawing = false;
  that.angle = 0;
  that.posX = 0;
  that.posY = 0;

  that.deg2rad = function(angle) {
    return angle * Math.PI / 180;
  };

  that.rad2deg = function(angle) {
    return angle * 180 / Math.PI;
  };

  that.angleAsRad = function() {
    return that.angle * Math.PI / 180;
  };

  that.prepareColor = function(color) {
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

  that.moveTo = function(x, y) {
    if (that.drawing) {
      that.ctx.beginPath();
      that.ctx.moveTo(that.posX, that.posY);
      that.ctx.lineTo(that.posX + x, that.posY + y);
      that.ctx.stroke();
    }
    that.posX += x;
    that.posY += y;
  };

  that.rotate = function(addAngle) {
    that.angle += addAngle;
    that.angle %= 360;
    if (that.angle < 0) that.angle += 360;
  };

  commands = that.commands = {};

  commands.clean = function() {
    that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
  };

  commands.clearScreen = function() {
    that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
    that.posX = that.canvas.width / 2;
    that.posY = that.canvas.height / 2;
    that.angle = 0;
    that.drawing = true;
  };
  commands.cs = commands.clearScreen;

  // wrap, window, fence

  // fill

  commands.penUp = function() {
    that.drawing = false;
  };
  commands.pu = commands.penUp;

  commands.isPenUp = function() {
    return !that.drawing;
  };

  commands.penDown = function() {
    that.drawing = true;
  }
  commands.pd = commands.penDown;

  commands.isPenDown = function() {
    return that.drawing;
  }

  // penPaint, penErase, penRevert

  commands.setPenColor = function(color) {
    color = that.prepareColor(color);
    that.ctx.strokeStyle = color;
    that.ctx.fillStyle = color;
  };
  commands.setPC = commands.setPenColor;

  commands.setBackground = function(color) {
    color = that.prepareColor(color);
    that.canvas.style.background = color;
  };
  commands.setBG = commands.setBackground;

  commands.setPenSize = function(sizes) { };

  commands.forward = function (length) {
    var x = length * Math.cos(that.angleAsRad());
    var y = length * Math.sin(that.angleAsRad());
    that.moveTo(x, y);
  };
  commands.fd = commands.forward;

  commands.back = function (length) {
    var x = length * Math.cos(that.angleAsRad() - Math.PI);
    var y = length * Math.sin(that.angleAsRad() - Math.PI);
    that.moveTo(x, y);
  };
  commands.bk = commands.back;

  commands.setHeading = function(angle) {
    that.angle = angle;
    that.angle %= 360;
    if (that.angle < 0) that.angle += 360;
  };
  commands.setH = commands.setHeading;

  commands.home = function() {
    that.posX = that.canvas.width / 2;
    that.posY = that.canvas.height / 2;
  };

  commands.arc = function(radius, angle) {
    var oldDrawing = that.drawing;
    that.drawing = false;
    back(radius);
    var startAngle = that.angleAsRad();
    var endAngle = startAngle + that.deg2rad(angle);
    that.ctx.beginPath();
    that.ctx.arc(that.posX, that.posY, radius, startAngle, endAngle, startAngle > endAngle);
    that.ctx.stroke();
    right(angle);
    forward(radius);
    that.drawing = oldDrawing;
  };

  commands.pos = function() {
    return [ that.posX, that.posY ];
  };

  commands.originPos = function() {
    return [ 0, 0 ];
  };

  commands.centrePos = function() {
    return [ that.canvas.width / 2, that.canvas.height / 2 ];
  };

  commands.maxPos = function() {
    return [ that.canvas.width, that.canvas.height ];
  };

  commands.xCor = function() {
    return that.posX;
  }

  commands.yCor = function() {
    return that.posY;
  };

  commands.heading = function() {
    return that.angle;
  };

  commands.towards = function(endPos) {
    var startPos = pos();
    var dx = endPos[0] - startPos[0];
    var dy = endPos[1] - startPos[1];
    return that.rad2deg(Math.atan(dy / dx));
  };

  commands.distance = function(endPos) {
    var startPos = pos();
    var dx = endPos[0] - startPos[0];
    var dy = endPos[1] - startPos[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  commands.right = function(angle) {
    that.rotate(angle);
  };
  commands.rt = commands.right;

  commands.left = function(angle) {
    that.rotate(-angle);
  };
  commands.lt = commands.left;

  commands.setPos = function(pos) {
    that.posX = pos[0];
    that.posY = pos[1];
  };

  commands.setXY = function(x, y) {
    that.posX = x;
    that.posY = y;
  };

  commands.setX = function(x) {
    that.posX = x;
  };

  commands.setY = function(y) {
    that.posY = y;
  };

  commands.repeat = function(n, block) {
    for (var i = 0; i < n; i++) block(i);
  };

  commands.forever = function(block) {
    var i = 0;
    for (;; i++) block(i);
  }

  commands.print = function() {
    if (!console) return;
    for (var i = 0; i < arguments.length; i++) {
      console.log(arguments[i]);
    }
  };

  for (var name in commands) {
    that[name] = commands[name];
  }

  var canvas = document.getElementById(canvasId);
  if (!canvas.getContext) throw("need a canvas for id = '" + canvasId + "'");
  that.canvas = canvas;
  that.ctx = canvas.getContext("2d");

  if (!bgcolor) bgcolor = 'black';
  that.setBackground(bgcolor);

  if (!pcolor) pcolor = 'white';
  that.setPenColor(pcolor);

  that.clearScreen();
}

/*
  that.createthat = function() {
    that.turtleCanvas.style.position = 'absolute';
    that.turtleCanvas.style.left = (that.canvas.offsetLeft + 320 - that.turtleCanvas.width) + 'px';
    that.turtleCanvas.style.top = (200 + that.canvas.offsetTop - that.turtleCanvas.height / 2) + 'px';
    that.turtleCanvas.style.visibility = 'visible';
    that.turtleCanvas.style.zIndex = '1';
    that.turtleCtx.strokeStyle = 'red';
    that.turtleCtx.beginPath();
    that.turtleCtx.moveTo(0,0);
    that.turtleCtx.lineTo(0,10);
    that.turtleCtx.lineTo(10,5);
    that.turtleCtx.lineTo(0,0);
    that.turtleCtx.stroke();
    that.turtleCtx.rotate(30);
  };

  */

/*
 * Commands
 */

