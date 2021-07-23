var drawer = document.getElementById("drawer");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
resize();

// last known position
var pos = { x: 0, y: 0 };
var lineWidth = 5;
var lineCap = "round";
var lineColor = "red";

window.addEventListener("resize", resize);
document.addEventListener("mousemove", draw);
document.addEventListener("mousedown", setPosition);
document.addEventListener("mouseenter", setPosition);

// new position from mouse event
function setPosition(e) {
  pos.x = e.clientX - 16; // offset
  pos.y = e.clientY - 16; // offset
}

// resize canvas
function resize() {
  ctx.canvas.width = drawer.offsetWidth;
  ctx.canvas.height = drawer.offsetHeight;
}

function draw(e) {
  // mouse left button must be pressed
  if (e.buttons !== 1) return;

  ctx.beginPath(); // begin

  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;
  ctx.strokeStyle = lineColor;

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!
}
