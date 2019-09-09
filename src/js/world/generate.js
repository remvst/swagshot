generateFromCanvas = (can, ctx) => {
    const grid = [];

    const imageData = ctx.getImageData(0, 0, can.width, can.height);

    for (let y = 0 ; y < can.height ; y++) {
        grid.push([]);
        for (let x = 0 ; x < can.width ; x++) {
            grid[y][x] = imageData.data[y * can.width * 4 + x * 4] > 0x80;
            imageData.data[y * can.width * 4 + x * 4] = grid[y][x] * 255;
            imageData.data[y * can.width * 4 + x * 4 + 1] = grid[y][x] * 255;
            imageData.data[y * can.width * 4 + x * 4 + 2] = grid[y][x] * 255;
            imageData.data[y * can.width * 4 + x * 4 + 3] = grid[y][x] * 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);

    ctx.globalCompositeOperation = nomangle('source-atop');
    ctx.fs('#048');
    ctx.fr(0, 0, can.width, can.height);

    return {'matrix': grid, 'can': can};
};

generateRandomWorld = () => createCanvas(50, 50, (ctx, can) => {
    ctx.fs('#fff');

    clearPath = (x1, y1, x2, y2) => {
        const distance = distP(x1, y1, x2, y2);

        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;

        let prevX = x1,
            prevY = y1;
        for (let d = 0 ; d <= distance ; d += 5) {
            const ratio = d / distance;
            const x = limit(0, x1 + (x2 - x1) * ratio + rnd(-0.1, 0.1) * distance, can.width);
            const y = limit(0, y1 + (y2 - y1) * ratio + rnd(-0.1, 0.1) * distance, can.height);
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(x, y);
            ctx.stroke();

            prevX = x;
            prevY = y;
        }
    };

    ctx.fr(0, 0, can.width, can.height);

    ctx.clearRect(4, 4, 3, 3);

    for (let x = 5 ; x < can.width ; x += 5) {
        clearPath(x, 5, x, can.height - 5);
        clearPath(5, x, can.height - 5, x);
    }

    // Close the arena
    ctx.fr(0, 0, can.width, 1);
    ctx.fr(0, 0, 1, can.height);
    ctx.fr(0, can.height - 1, can.width, 1);
    ctx.fr(can.width - 1, 0, 1, can.height);

    // Open up the center (for the menu)
    ctx.fs('#000');
    ctx.beginPath();
    ctx.arc(25, 25, 4, 0, TWO_PI);
    ctx.fill();

    return generateFromCanvas(can, ctx);
});
