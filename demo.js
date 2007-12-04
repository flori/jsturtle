
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
