var drawer = document.getElementById("drawer");
var canvas = document.getElementById("canvas");
var btnUndo = document.getElementById("btn-undo");
var btnClear = document.getElementById("btn-erase");
var ctx = canvas.getContext("2d");
resize();

// last known position
var paths = [];
var points = [];
var isDrawing = false;
var pos = { x: 0, y: 0 };
var lineWidth = 5;
var lineCap = "round";
var lineColor = "red";

window.addEventListener("resize", resize);
canvas.addEventListener("mousedown", beginDrawl);
document.addEventListener("mousemove", draw);
document.addEventListener("mouseup", endDrawl);
document.addEventListener("keydown", handleKeyEvent);
btnUndo.addEventListener("click", undoCrawl);
btnClear.addEventListener("click", clearCrawl);

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

function beginDrawl(event) {
  isDrawing = true;
  setPosition(event);
  points = [{ ...pos }];
}

function draw(e) {
  if (!isDrawing) return;

  ctx.beginPath(); // begin

  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;
  ctx.strokeStyle = lineColor;

  ctx.moveTo(pos.x, pos.y); // from
  setPosition(e);
  ctx.lineTo(pos.x, pos.y); // to

  ctx.stroke(); // draw it!

  points.push({ ...pos });
}

function endDrawl() {
  if (!isDrawing) return;

  isDrawing = false;

  if (points.length > 1) {
    paths.push({
      points,
      lineCap,
      lineColor,
      lineWidth,
    });
  }
}

function drawPaths() {
  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // draw all the paths in the paths array
  paths.forEach((path) => {
    const { points, lineCap, lineColor, lineWidth } = path;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;
    ctx.strokeStyle = lineColor;

    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }

    ctx.stroke();
  });
}

function undoCrawl() {
  paths.pop();
  drawPaths();
}

function clearCrawl() {
  paths = [];
  drawPaths();
}

function handleKeyEvent(event) {
  const radios = document.querySelectorAll('input[name="color"]');
  const pattern = /^Digit(\d+)$/g;
  if (event.altKey && event.code.match(pattern)) {
    const [, digit] = pattern.exec(event.code);
    const index = +digit - 1;

    if (index >= 0 && index < radios.length) {
      const radio = radios[index];
      radio.checked = true;
      handleColorChange(radio);
    }
  }
}

function handleColorChange(radio) {
  const docStyle = getComputedStyle(document.documentElement);
  lineColor = docStyle.getPropertyValue(radio.value);
}

// BOOTSTRAP
handleColorChange(document.querySelector('input[name="color"]:checked'));
