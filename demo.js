
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

function stupidPolygon() {
  var startPos = pos();
  var startHeading = heading();
  fd(100); rt(100);
  fd(100); rt(100);
  fd(100); 
  setH(towards(startPos));
  fd(distance(startPos));
  setH(startHeading);
}

function stupidPolygonStar() {
  setBG('#020');
  setPC('#0f0');
  repeat(360 / 60, function() {
    stupidPolygon();
    rt(60);
  });
}

function petal(size) {
  fill(function() {
    arc(size, 60); rt(120); arc(size, 60); rt(120);
  });
}

function petals(number) {
  var step = 360 / number;
  repeat(number, function() {
    petal(100);
    rt(step);
  });
}

function leaves(number) {
  var step = 180 / number;
  repeat(number, function() {
    petal(80);
    rt(step);
  });
}

function flower() {
  lt(90);
  pu();
  fd(80);
  pd();
  setPC('#0f0');;
  setPenSize(4);
  bk(250);
  pu();
  setPenSize(1);
  fd(250);
  setPC('#f00');;
  petals(20);
  setPC('#fd0');;
  fd(40);
  fill(function () { arc(40, 360); });
  bk(290);
  setPC('#0f0');;
  rt(165);
  leaves(6);
}

function hilbert(depth, size) {
  if (!size) size = 10;
  var f = function() { fd(size); };
  var p = function() { rt(90); };
  var m = function() { lt(90); };
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

function draw() {
  var t = new TurtleGraphics({
    canvasId: 'canvas',
    turtleCanvasId: 'turtleCanvas'
  });
  t.injectCommands(self);
  //ht();
  //setPos([maxX() / 4, maxY() * 1 / 10]);
  //hilbert(5, 10);

  //flower();
  //shapes();
  //stupidPolygonStar();
  //stupidPolygon();
}
