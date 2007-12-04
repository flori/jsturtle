
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

function draw() {
  var screenTurtle = new Turtle('canvas');
  var t = new Turtle('turtleCanvas');
  t.createTurtle(screenTurtle);
  screenTurtle.injectCommands(self);
  shapes();
  //stupidPolygonStar();
  //stupidPolygon();
}
