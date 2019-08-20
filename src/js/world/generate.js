generateWorld = () => {
    const can = createCanvas(50, 50, (ctx, can) => {
        ctx.fillStyle = '#fff';

        function clearPath(x1, y1, x2, y2) {
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
        }

        ctx.fillRect(0, 0, can.width, can.height);

        ctx.clearRect(4, 4, 3, 3);

        for (let x = 5 ; x < can.width ; x += 5) {
            clearPath(x, 5, x, can.height - 5);
            clearPath(5, x, can.height - 5, x);
        }

        // Close the arena
        ctx.fillRect(0, 0, can.width, 1);
        ctx.fillRect(0, 0, 1, can.height);
        ctx.fillRect(0, can.height - 1, can.width, 1);
        ctx.fillRect(can.width - 1, 0, 1, can.height);
    });

    const grid = [];

    const ctx = can.getContext('2d');
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
    ctx.fillStyle = '#0be';
    ctx.fillRect(0, 0, can.width, can.height);

    return {'matrix': grid, 'can': can};
};
