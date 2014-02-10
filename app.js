var canvas = document.getElementsByTagName('canvas')[0],
    ctx = canvas.getContext('2d'),
    width = window.innerWidth,
    height = window.innerHeight,
    r = Math.random,
    xGap = 50,
    colors = ['#D1F2A5', '#EFFAB4', '#FFC48C', '#FF9F80', '#F56991'],
    t = 0,
    lines = [];
    
init();
draw();

function init() {
    canvas.width = width;
    canvas.height = height;

    lines[0] = createLine();
    lines[1] = createLine();

    setInterval(function() {
        t += r() * 0.001 + 0.002;
        draw();
    }, 20);

    canvas.addEventListener('mousemove', function () {
        t += 0.01;
    });
}

function createLine() {
    var line = [],
        x = -20 * xGap,
        y = 0;

    while (x < width + 2 * xGap) {
        y = rand(y);
        var hex = colors[Math.floor(r() * colors.length)],
            rgb = hexToRgb(hex),
            coord = {
            x: x,
            y: y,
            color: "rgba(" + rgb.r + ", " + rgb.g + ", " + rgb.b + ", 0.4)",
            sign: sign(0.5 - r())
        };
        line.push(coord);
        x += xGap * (1 + r());
    }

    return line;
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
    ctx.fillStyle = vertices[0].color;
    ctx.beginPath();
    //ctx.moveTo(vertices[0].x, vertices[0].y);
    for (var i = vertices.length - 1; i >= 0; i--) {
        ctx.lineTo(shift(vertices[i].x, vertices[i].sign, 40), shift(vertices[i].y, vertices[i].sign, 100));
    } 
    ctx.closePath();
    ctx.fill();
}

function rand (prev) {
    return height / 2 * (0.5 + r());
}

function shift(value, sgn, offset) {
    return value + sgn * Math.sin(t * 0.7) * offset;
}


function drawLine(line) {
    ctx.beginPath();
    for (var i = 0; i < line.length; i++) {
        ctx.lineTo(line[i].x, line[i].y);
    }
    ctx.stroke();
}

function sign(number) {
    return number < 0 ? -1 : 1;
}


function hexToRgb(hex) {
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
