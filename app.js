var canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    r = Math.random,
    xGap = 50,
    colors = ['#D1F2A5', '#EFFAB4', '#FFC48C', '#FF9F80', '#F56991'];
    lines = [];
    
init();
draw();

function init() {
    canvas.width = width;
    canvas.height = height;

    lines[0] = createLine();
    lines[1] = createLine();

    //setInterval(function() {
        ////refreshLine(lines[0]);
        ////refreshLine(lines[1]);
        //draw();
    //}, 20);
}

function createLine() {
    var line = [],
        x = 0
        y = 0;

    while (x < width + 2 * xGap) {
        y = rand(y);
        var coord = {
            x: x,
            y: y
        };
        line.push(coord);
        x += xGap * (1 + r());
    }

    return line;
}

function refreshLine(line) {
    for (var i = 0; i < line.length; i++) {
        line[i].y = shift(line[i].y, 10);
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);
    fillPolygons(lines[0], lines[1]);
    //drawLine(lines[0]);
    //drawLine(lines[1]);
}

function fillPolygons(line1, line2) {
   var min = Math.min(line1.length, line2.length);
   
   for (var i = 0; i < min - 1; i++) {
       fillPolygon([line1[i], line2[i], line2[i + 1], line1[i + 1]]);
   }
}

function fillPolygon(vertices) {
    ctx.fillStyle = colors[Math.floor(r() * colors.length)];
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var i = vertices.length - 1; i >= 0; i--) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    } 
    ctx.closePath();
    ctx.fill();
}

function rand (prev) {
    return height / 2 * (0.5 + r());
}

function shift(value, offset) {
    return value + offset * (0.5 - r());
}


function drawLine(line) {
    ctx.beginPath();
    for (var i = 0; i < line.length; i++) {
        ctx.lineTo(line[i].x, line[i].y);
    }
    ctx.stroke();
}
