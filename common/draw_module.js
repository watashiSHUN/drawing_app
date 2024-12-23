// Clear the canvas context before drawing
function drawPath(ctx, path) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    for (let i = 0; i < path.length; i++){
        ctx.beginPath();
        const line = path[i]; // [[x1,y1], [x2,y2], ...]
        ctx.moveTo(...line[0]);
        for (let j = 1; j < line.length; j++){
            ctx.lineTo(...line[j]);
        }
        ctx.stroke();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        drawPath
    };
}