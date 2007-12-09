
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
  setBG('#020');
  setPC('#0f0');
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

function koch_triangle(depth, size) {
  if (!size) size = 10;
  var f = function() { forward(size); };
  var p = function() { left(60); };
  var m = function() { right(60); };
  var r = function(n) {
    if (n == 0) {
      return;
    } else if (n == 1) {
      f();
    } else {
      r(n - 1); p(); r(n - 1); m(); m(); r(n - 1); p(); r(n - 1);
    }
  };
  r(depth);
}

function koch_square(depth, size) {
  if (!size) size = 10;
  var f = function() { forward(size); };
  var p = function() { left(90); };
  var m = function() { right(90); };
  var r = function(n) {
    if (n == 0) return;
    r(n - 1); p(); r(n - 1); m(); f(); m(); r(n - 1); p(); r(n - 1);
  };
  r(depth);
}

function snowflake(fractal, depth, size) {
  repeat(3, function() { fractal.apply(null, [ depth, size ]); rt(120); });
}

function hilbert(depth, size) {
  if (!size) size = 10;
  var f = function() { forward(size); };
  var p = function() { left(90); };
  var m = function() { right(90); };
  var l = function(n) {
    if (n == 0) return;
    p(); r(n - 1); f(); m(); l(n - 1); f(); l(n - 1); m(); f(); r(n - 1); p();
  };
  var r = function(n) {
    if (n == 0) return;
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
    if (n == 0) {
      f();
    } else  {
      x(n - 1); p(); y(n - 1); p();
    }
  };
  var y = function(n) {
    if (n == 0) {
      f();
    } else {
      m(); x(n - 1); m(); y(n - 1); 
    }
  };
  x(depth);
}

function dragonFiller(depth, size) {
  var startPos = pos();
  var colors = ['red', 'blue', 'green', 'black' ];
  repeat(4, function(i) {
    setPos(startPos); setPC(colors[i]); dragon(depth, size); rt(90);
  });
}

function sierpinski(depth, size) {
  if (!size) size = 10;
  var f = function() { forward(size); };
  var p = function() { left(60); };
  var m = function() { right(60); };
  var a = function(n) {
    if (n <= 0) {
      f();
    } else {
      b(n - 1); m(); a(n - 1); m(); b(n - 1)
    }
  };
  var b = function(n) {
    if (n <= 0) {
      f();
    } else {
      a(n - 1); p(); b(n - 1); p(); a(n - 1)
    }
  };
  a(depth);
}

function draw() {
  var t = new TurtleGraphics({
    canvasId: 'canvas',
    turtleCanvasId: 'turtleCanvas'
  });
  t.injectCommands(self);
  //ht();
  //setPos([maxX() * 0.25, maxY() * 0.9]);
  //hilbert(5, 10);

  //flower();
  //shapes();
  //stupidPolygonStar();
  //stupidPolygon();
}
