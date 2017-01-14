const nativeImage = require('electron').nativeImage;

var pixelPosDom = document.getElementById("pixel-pos")
var tiledPosDom = document.getElementById("tiled-pos")
var canvas = document.getElementById("canvas");
canvas.width = 0;
canvas.height = 0;
canvas.onmousemove = function(e) {
    var x = e.offsetX;
    var y = canvas.height - e.offsetY;
    var tiledPosX = (x / 32 | 0) * 2;
    var tiledPosY = (y / 32 | 0) * 2;
    var tiledPos = `(${tiledPosX},${tiledPosY})`
    var pixelPosX = tiledPosX * 16;
    var pixelPosY = tiledPosY * 16;
    var pixelPos = `(${pixelPosX},${pixelPosY})`
    pixelPosDom.innerHTML = pixelPos;
    tiledPosDom.innerHTML = tiledPos;
}
var holder = document.getElementById('holder');
holder.ondragover = function() {
    return false;
};
holder.ondragleave = holder.ondragend = function() {
    return false;
};
holder.ondrop = function(e) {
    e.preventDefault();
    var file = e.dataTransfer.files[0];
    console.log('File you dragged here is', file.path);

    var img = new Image();
    img.src = file.path;
    var image = nativeImage.createFromPath(file.path);
    var imageSize = image.getSize();
    img.onload = function() {
        var ctx = canvas.getContext("2d");
        canvas.width = imageSize.width;
        canvas.height = imageSize.height;
        ctx.drawImage(img, 0, 0);
        drawGrid(ctx, imageSize.width, imageSize.height);
        console.log(img);
    }
    return false;
};

var drawGrid = function(ctx, width, height) {
    var columnNum = (width / 16 | 0) + 1;
    var rowNum = (height / 16 | 0) + 1;
    for (var i = 0; i < columnNum; i++) {
        if (i % 2 == 0) {
            ctx.moveTo(i * 16, 0);
            ctx.lineTo(i * 16, height);
            ctx.stroke();
        }
    }
    for (var i = 0; i < rowNum; i++) {
        if (i % 2 == 0) {
            ctx.moveTo(0, i * 16);
            ctx.lineTo(width, i * 16);
            ctx.stroke();
        }
    }
}