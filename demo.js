
function regPoly(edges, size) {
  repeat(edges, function() {
    forward(size);
    right(360 / edges);
  });
}

function shapes() {
  var size = 10;
  var step = 10;
  var color = 0;
  penUp();
  back(100);
  right(90);
  forward(100);
  right(180);
  penDown();
  repeat(36, function(x) {
    color = Math.round(256 * (x / 35));
    setPenColor([ 0, color, 128 - color / 2 ]);
    regPoly(7, size);
    right(step);
    size *= 1.08;
  });
}

function stupidPolygon() {
  var startPos = pos();
  var startHeading = heading();
  forward(100); left(100);
  forward(100); left(100);
  forward(100); 
  setH(towards(startPos));
  forward(distance(startPos));
  setH(startHeading);
}

function stupidPolygonStar() {
  repeat(360 / 60, function() {
    stupidPolygon();
    left(60);
  });
}

function petal(size) {
  fill(function() {
    arc(size, 60); right(120); arc(size, 60); right(120);
  });
}

function petals(number) {
  var step = 360 / number;
  repeat(number, function() {
    petal(100);
    right(step);
  });
}

function leaves(number) {
  var step = 180 / number;
  repeat(number, function() {
    petal(80);
    right(step);
  });
}

function flower() {
  left(90);
  pu();
  forward(80);
  pd();
  setPC('#0f0');;
  setPenSize(4);
  bk(250);
  pu();
  setPenSize(1);
  forward(250);
  setPC('#f00');;
  petals(20);
  setPC('#fd0');;
  forward(40);
  fill(function () { arc(40, 360); });
  bk(290);
  setPC('#0f0');;
  right(165);
  leaves(6);
}

/*
 * L-Systems
 */

function kochTriangle(depth, size) {
  if (!size) size = 10;
  var p = function() { left(60); };
  var m = function() { right(60); };
  var f = function(n) {
    if (n <= 0) return;
    if (n == 1) {
      forward(size);
    } else {
      f(n - 1); p(); f(n - 1); m(); m(); f(n - 1); p(); f(n - 1);
    }
  };
  f(depth);
}

function kochRandom(depth, size) {
  if (!size) size = 10;
  var p = function() { left(60); };
  var m = function() { right(60); };
  var f = function(n) {
    if (n <= 0) return;
    if (n == 1) {
      forward(size);
    } else if (random() < 0.5) {
      f(n - 1); p(); f(n - 1); m(); m(); f(n - 1); p(); f(n - 1);
    } else {
      f(n - 1); m(); f(n - 1); p(); p(); f(n - 1); m(); f(n - 1);
    }
  };
  f(depth);
}

function kochSquare(depth, size) {
  if (!size) size = 10;
  var p = function() { left(90); };
  var m = function() { right(90); };
  var f = function(n) {
    if (n <= 0) return;
    if (n == 1) {
      forward(size);
    } else {
      f(n - 1); p(); f(n - 1); m(); f(n - 1); m(); f(n - 1); p(); f(n - 1);
    }
  };
  f(depth);
}

function snowflake(fractal, depth, size) {
  repeat(3, function() { fractal.apply(null, [ depth, size ]); right(120); });
}

function hilbert(depth, size) {
  if (!size) size = 10;
  var f = function() { forward(size); };
  var p = function() { left(90); };
  var m = function() { right(90); };
  var l = function(n) {
    if (n <= 0) return;
    p(); r(n - 1); f(); m(); l(n - 1); f(); l(n - 1); m(); f(); r(n - 1); p();
  };
  var r = function(n) {
    if (n <= 0) return;
    m(); l(n - 1); f(); p(); r(n - 1); f(); r(n - 1); p(); f(); l(n - 1); m();
  };
  l(depth);
}

function dragon(depth, size) {
  if (!size) size = 10;
  var f = function() { forward(size); };
  var p = function() { left(90); };
  var m = function() { right(90); };
  var x = function(n) {
    if (n <= 0) return;
    x(n - 1); p(); y(n - 1); f(); p();
  };
  var y = function(n) {
    if (n <= 0) return;
    m(); f(); x(n - 1); m(); y(n - 1); 
  };
  f(); x(depth);
}

function square(fractal, depth, size) {
  var startPos = pos();
  var colors = [ 'red', 'blue', 'green', 'black' ];
  repeat(4, function(i) {
    setPos(startPos); setPC(colors[i]); fractal(depth, size); rt(90);
  });
}

function terDragon(depth, size) {
  if (!size) size = 10;
  var p = function() { left(120); };
  var m = function() { right(120); };
  var f = function(n) {
    if (n <= 0) return;
    if (n == 1) {
      forward(size);
    } else {
      f(n - 1); p(); f(n - 1); m(); f(n - 1);
    }
  };
  f(depth);
}

function sierpinski(depth, size) {
  if (!size) size = 10;
  angle = depth % 2 == 1 ? 60 : -60;
  var p = function() { left(angle); };
  var m = function() { right(angle); };
  var a = function(n) {
    if (n <= 0) return;
    if (n == 1) {
      forward(size);
    } else {
      b(n - 1); m(); a(n - 1); m(); b(n - 1)
    }
  };
  var b = function(n) {
    if (n <= 0) return;
    if (n == 1) {
      forward(size);
    } else {
      a(n - 1); p(); b(n - 1); p(); a(n - 1)
    }
  };
  a(depth);
}

function levyC(depth, size) {
  if (!size) size = 10;
  var p = function() { left(45); };
  var m = function() { right(45); };
  var f = function(n) {
    if (n <= 0) return;
    if (n == 1) {
      forward(size);
    } else {
      p(); f(n - 1); m(); m(); f(n - 1); p();
    }
  };
  f(depth);
}

function peano1(depth, size) {
  if (!size) size = 10;
  var p = function() { left(90); };
  var m = function() { right(90); };
  var f = function(n) {
    if (n <= 0) return;
    if (n == 1) {
      forward(size);
    } else {
      f(n - 1); f(n - 1); p(); f(n - 1); p(); f(n - 1); p();
      f(n - 1); f(n - 1); p(); f(n - 1); p(); f(n - 1); m(); f(n - 1);
    }
  };
  f(depth);
}

function peano2(depth, size) {
  if (!size) size = 10;
  var f = function() { forward(size) };
  var p = function() { left(90); };
  var m = function() { right(90); };
  var x = function(n) {
    if (n <= 0) return;
    x(n - 1); f(); y(n - 1); f(); x(n - 1); p(); f(); p(); y(n - 1); f();
    x(n - 1); f(); y(n - 1); m(); f(); m(); x(n - 1); f(); y(n - 1); f();
    x(n - 1); 
  };
  var y = function(n) {
    if (n <= 0) return;
    y(n - 1); f(); x(n - 1); f(); y(n - 1); m(); f(); m(); x(n - 1); f();
    y(n - 1); f(); x(n - 1); p(); f(); p(); y(n - 1); f(); x(n - 1); f();
    y(n - 1); 
  };
  x(depth);
}

var stack = [];

function plant(depth, size) {
  if (!size) size = 10;
  var f = function(n) { if (n == 1) { var c = pc(); setPC('#0a0'); lt(90); petal(size); rt(90); setPC(c); } else { forward(size) } };
  var p = function() { left(13); };
  var m = function() { right(13); };
  var s = function() { stack.push(state()); }
  var t = function() { setState(stack.pop()); }
  var x = function(n) {
    if (n <= 0) return;
    f(n); s(); p(); x(n - 1); t(); f(n); s(); m(); x(n - 1); t(); p(); x(n - 1);
  };
  x(depth);
}

function init() {
  var t = new TurtleGraphics({
    screenId:   'screen',
    width:      640,
    height:     400,
    border:     '2px solid #aaa',
    turtleSize: 16
  });
  t.injectCommands(self);
}

function draw() {
  var depth = document.getElementById('menu').depth.value;
  eval(document.getElementById('menu').demo.value);
}

function createDepthOptions(from, to) {
  var select = document.getElementById('depth');
  while (select.childNodes.length >  0) {
    select.removeChild(select.firstChild);
  }
  for (var i = from; i <= to; i++) {
    var option = document.createElement("option");
    option.innerHTML = i;
    select.appendChild(option);
  }
}
