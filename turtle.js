function TurtleGraphics(canvasId, turtleCanvasId, bgcolor, pcolor) {
  /*
   * TurtleGraphics state
   */

  var that = this;
  that.drawing = false;
  that.hidden = false;
  that.filling = false;
  that.angle = 0;
  that.posX = 0;
  that.posY = 0;

  /*
   * Implementation
   */

  that.deg2rad = function(angle) {
    return angle * Math.PI / 180;
  };

  that.rad2deg = function(angle) {
    return angle * 180 / Math.PI;
  };

  that.angleAsRad = function() {
    return that.deg2rad(that.angle);
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
      if (!that.filling) {
        that.ctx.beginPath();
        that.ctx.moveTo(that.posX, that.posY);
      }
      that.ctx.lineTo(that.posX + x, that.posY + y);
      if (!that.filling) that.ctx.stroke();
    }
    that.posX += x;
    that.posY += y;
    if (!that.hidden && that.turtleTurtle) that.turtleTurtle.moveTurtle(that);
  };

  that.rotate = function(addAngle) {
    that.angle += addAngle;
    that.angle %= 360;
    if (that.angle < 0) that.angle += 360;
    if (that.turtleTurtle) that.turtleTurtle.rotateTurtle(that);
  };

  that.createTurtle = function(screenTurtle) {
    screenTurtle.turtleTurtle = that;
    that.canvas.style.position = 'absolute';
    that.canvas.style.visibility = 'visible';
    that.canvas.style.backgroundColor = 'transparent';
    that.canvas.style.zIndex = '1';
    that.setPenColor('white');
    that.drawTurtle();
    that.moveTurtle(screenTurtle);
  };

  that.drawTurtle = function() {
    that.forward(that.canvas.width / 2);
    that.rotate(150);
    var l = Math.ceil(Math.sqrt(that.canvas.width * that.canvas.width + that.canvas.height * that.canvas.height));
    that.forward(l / 2);
    that.rotate(120);
    that.forward(l / 2);
    that.rotate(120);
    that.forward(l / 2);
  };

  that.moveTurtle = function(screenTurtle) {
    var pos = screenTurtle.pos();
    that.canvas.style.left = (screenTurtle.canvas.offsetLeft + pos[0] - that.canvas.width / 2) + 'px';
    that.canvas.style.top = (pos[1] + screenTurtle.canvas.offsetTop - that.canvas.height / 2) + 'px';
  };

  that.rotateTurtle = function(screenTurtle) {
    var angle = screenTurtle.heading();
    that.clearScreen();
    that.setHeading(angle);
    that.drawTurtle();
  };

  /*
   * Public commands
   */

  var commands = that.commands = {};

  commands.clean = function() {
    that.ctx.clearRect(0, 0, that.canvas.width, that.canvas.height);
  };

  commands.clearScreen = function() {
    that.clean();
    that.setPos(that.centrePos());
    that.setHeading(0);
    that.penDown();
  };
  commands.cs = commands.clearScreen;

  // wrap, window, fence

  // fill

  commands.showTurtle = function() {
    that.hidden = false;
    if (!that.turtleTurtle) return;
    that.turtleTurtle.canvas.style.zIndex = 1;
    that.turtleTurtle.rotateTurtle(that);
    that.turtleTurtle.moveTurtle(that);
  }
  commands.st = commands.showTurtle;

  commands.isTurtleShown = function() {
    return !that.hidden;
  };

  commands.hideTurtle = function() {
    that.hidden = true;
    if (!that.turtleTurtle) return;
    that.turtleTurtle.canvas.style.zIndex = -1;
  }
  commands.ht = commands.hideTurtle;

  commands.isTurtleHidden = function() {
    return that.hidden;
  };

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

  commands.forward = function(length) {
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
    if (!that.hidden && that.turtleTurtle) that.turtleTurtle.rotateTurtle(that);
  };
  commands.setH = commands.setHeading;

  commands.home = function() {
    that.setPos(that.centrePos());
  };

  commands.arc = function(radius, angle) {
    var oldDrawing = that.drawing;
    that.drawing = false;
    that.back(radius);
    var startAngle = that.angleAsRad();
    var endAngle = startAngle + that.deg2rad(angle);
    if (!that.filling) that.ctx.beginPath();
    that.ctx.arc(that.posX, that.posY, radius, startAngle, endAngle, startAngle > endAngle);
    if (!that.filling) that.ctx.stroke();
    that.rotate(angle);
    that.forward(radius);
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
    var startPos = that.pos();
    var dx = endPos[0] - startPos[0];
    var dy = endPos[1] - startPos[1];
    return that.rad2deg(Math.atan2(dy, dx));
  };

  commands.distance = function(endPos) {
    var startPos = that.pos();
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
    if (!that.hidden && that.turtleTurtle) that.turtleTurtle.moveTurtle(that);
  };

  commands.setXY = function(x, y) {
    that.posX = x;
    that.posY = y;
    if (!that.hidden && that.turtleTurtle) that.turtleTurtle.moveTurtle(that);
  };

  commands.setX = function(x) {
    that.posX = x;
    if (!that.hidden && that.turtleTurtle) that.turtleTurtle.moveTurtle(that);
  };

  commands.setY = function(y) {
    that.posY = y;
    if (!that.hidden && that.turtleTurtle) that.turtleTurtle.moveTurtle(that);
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

  commands.fillBegin = function() {
    that.filling = true;
    that.ctx.beginPath();
  };

  commands.fillEnd = function() {
    that.filling = false;
    that.ctx.closePath();
    that.ctx.fill();
  };

  commands.fill = function(block) {
    that.fillBegin();
    block();
    that.fillEnd();
  }

  that.injectCommands = function(obj) {
    for (var name in that.commands) {
      obj[name] = that.commands[name];
    }
  };
  that.injectCommands(this);

  var canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.getContext) throw("need a canvas for id = '" + canvasId + "'");
  that.canvas = canvas;
  that.ctx = canvas.getContext("2d");

  if (!bgcolor) bgcolor = '#000';
  that.setBackground(bgcolor);

  if (!pcolor) pcolor = '#cc0';
  that.setPenColor(pcolor);

  that.clearScreen();

  if (turtleCanvasId) {
    var turtle = new TurtleGraphics(turtleCanvasId, null, pcolor, bgcolor);
    turtle.createTurtle(that);
  }
}
