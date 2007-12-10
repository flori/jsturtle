function TurtleGraphics(config) {
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
    if (!that.hidden && that.turtleTG) that.turtleTG.moveTurtle(that);
  };

  that.rotate = function(addAngle) {
    that.angle += addAngle;
    that.angle %= 360;
    if (that.angle < 0) that.angle += 360;
    if (that.turtleTG) that.turtleTG.rotateTurtle(that);
  };

  that.createTurtle = function(screenTG) {
    screenTG.turtleTG = that;
    that.canvas.style.position = 'absolute';
    that.canvas.style.visibility = 'visible';
    that.canvas.style.backgroundColor = 'transparent';
    that.canvas.style.zIndex = '1';
    that.drawTurtle();
    that.moveTurtle(screenTG);
  };

  that.drawTurtle = function() {
    that.forward(that.canvas.width / 2);
    that.right(150);
    var l = Math.ceil(Math.sqrt(that.canvas.width * that.canvas.width + that.canvas.height * that.canvas.height));
    that.forward(l / 2);
    that.right(120);
    that.forward(l / 2);
    that.right(120);
    that.forward(l / 2);
  };

  that.moveTurtle = function(screenTG) {
    var screenCanvas = screenTG.canvas;
    var pos = screenTG.pos();
    var offsetLeft = screenCanvas.offsetLeft + (screenCanvas.offsetWidth - screenCanvas.width) / 2;
    that.canvas.style.left = (offsetLeft + pos[0] - that.canvas.width / 2) + 'px';
    var offsetTop = screenCanvas.offsetTop + (screenCanvas.offsetHeight - screenCanvas.height) / 2;
    that.canvas.style.top = (offsetTop + pos[1] - that.canvas.height / 2) + 'px';
  };

  that.rotateTurtle = function(screenTG) {
    var angle = screenTG.heading();
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
    that.setLineCap('butt');
    that.penDown();
  };
  commands.cs = commands.clearScreen;

  // wrap, window, fence

  // fill

  commands.showTurtle = function() {
    that.hidden = false;
    if (that.turtleTG === undefined) return;
    that.turtleTG.canvas.style.zIndex = 1;
    that.turtleTG.rotateTurtle(that);
    that.turtleTG.moveTurtle(that);
  }
  commands.st = commands.showTurtle;

  commands.isTurtleShown = function() {
    return !that.hidden;
  };

  commands.hideTurtle = function() {
    that.hidden = true;
    if (that.turtleTG === undefined) return;
    that.turtleTG.canvas.style.zIndex = -1;
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

  commands.setTurtleColor = function(color) {
    if (that.turtleTG === undefined) return;
    that.turtleTG.setPenColor(color);
    that.turtleTG.clearScreen();
    that.turtleTG.drawTurtle();
  }

  commands.setBackground = function(color) {
    color = that.prepareColor(color);
    that.canvas.style.background = color;
  };
  commands.setBG = commands.setBackground;

  commands.setPenSize = function(size) {
    if (size instanceof Array) {
      if (size.length != 2) throw("size array of length 2 required");
      size = size[0] > size[1] ? size[0] : size[1];
    }
    that.ctx.lineWidth = size;
  };

  // 'butt', 'round', 'square'
  commands.setLineCap = function(type) {
    that.ctx.lineCap = type;
  }

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
    if (!that.hidden && that.turtleTG) that.turtleTG.rotateTurtle(that);
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
    that.right(angle);
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

  commands.maxX = function() {
    return that.canvas.width;
  };

  commands.maxY = function() {
    return that.canvas.height;
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
    if (pos.length != 2) throw("pos array of length 2 required");
    that.posX = pos[0];
    that.posY = pos[1];
    if (!that.hidden && that.turtleTG) that.turtleTG.moveTurtle(that);
  };

  commands.setXY = function(x, y) {
    that.posX = x;
    that.posY = y;
    if (!that.hidden && that.turtleTG) that.turtleTG.moveTurtle(that);
  };

  commands.setX = function(x) {
    that.posX = x;
    if (!that.hidden && that.turtleTG) that.turtleTG.moveTurtle(that);
  };

  commands.setY = function(y) {
    that.posY = y;
    if (!that.hidden && that.turtleTG) that.turtleTG.moveTurtle(that);
  };

  commands.random = function(start, end) {
    if (start === undefined) {
      return Math.random();
    } else if (end === undefined) {
      return Math.floor(Math.random() * Math.floor(start));
    } else if (start < end) {
      return start + Math.floor(Math.random() * (1 + Math.floor(end) - Math.floor(start)));
    } else {
      throw("start has to be < end")
    }
  }

  commands.repeat = function(n, block) {
    for (var i = 0; i < n; i++) block(i);
  };

  commands.forever = function(block) {
    var i = 0;
    for (;; i++) block(i);
  }

  commands.show = function() {
    if (console === undefined) return;
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

  var screen = document.getElementById(config.screenId);
  if (!screen) throw("need a screen for id = '" + config.screenId + "'");
  that.screen = screen;
  var canvas = document.createElement("canvas");
  canvas.setAttribute('width', config.width);
  canvas.setAttribute('height', config.height);
  if (config.border) canvas.style.border = config.border;
  screen.appendChild(canvas);
  that.canvas = canvas;
  that.ctx = canvas.getContext("2d");

  var background = config.background;
  if (background === undefined) background = 'white';
  that.setBackground(background);

  var penColor = config.penColor;
  if (penColor === undefined) penColor = 'black';
  that.setPenColor(penColor);

  that.clearScreen();

  if (!config.isTurtle) {
    var turtle = new TurtleGraphics({
      screenId: config.screenId,
      isTurtle: true,
      width: config.turtleSize || 14,
      height: config.turtleSize || 14,
      penColor: config.turtleColor || '#b00'
    });
    turtle.createTurtle(that);
  }
}
