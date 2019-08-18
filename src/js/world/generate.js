generateWorld = () => {
    const can = createCanvas(100, 100, (ctx, can) => {
        const shapes = [
            // Colon
            () => {
                ctx.beginPath();
                ctx.arc(0, 0, rnd(1, 3), 0, TWO_PI);
                ctx.fill();
            },

            // // Wall
            () => {
                if (random() < 0.5) {
                    ctx.rotate(PI / 2);
                }
                ctx.fillRect(0, 0, ~~rnd(2, 5), 1);
            },

            // Circular room
            () => {
                ctx.rotate(rnd(0, PI));
                ctx.beginPath();
                ctx.arc(0.5, 0.5, rnd(1, 5), 0, rnd(PI, PI * 3 / 4));
                ctx.stroke();
            },

            // Cross
            () => {
                const thickness = ~~rnd(1, 3);
                const radius = thickness + ~~rnd(1, 3);
                ctx.fillRect(-radius, 0, radius * 2 + thickness, thickness);
                ctx.fillRect(0, -radius, thickness, radius * 2 + thickness);
            }
        ];

        ctx.fillStyle = ctx.strokeStyle = '#fff';

        for (let i = 0 ; i < (can.width * can.height) * 0.04 ; i++) {
            const shape = pick(shapes);
            ctx.wrap(() => {
                ctx.translate(~~rnd(0, can.width), ~~rnd(0, can.height));
                shape();
            });
        }

        function clearPath(x1, y1, x2, y2) {
            const distance = distP(x1, y1, x2, y2);

            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;

            let prevX = x1,
                prevY = y1;
            for (let d = 0 ; d <= distance ; d += 5) {
                const ratio = d / distance;
                const x = limit(0, x1 + (x2 - x1) * ratio + rnd(-0.1, 0.1) * distance, 40);
                const y = limit(0, y1 + (y2 - y1) * ratio + rnd(-0.1, 0.1) * distance, 40);
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.stroke();

                prevX = x;
                prevY = y;
            }
        }

        // Close the arena
        ctx.fillRect(0, 0, can.width, 1);
        ctx.fillRect(0, 0, 1, can.height);
        ctx.fillRect(0, can.height - 1, can.width, 1);
        ctx.fillRect(can.width - 1, 0, 1, can.height);

        for (let x = 5 ; x < 40 ; x += 10) {
            clearPath(x, 5, x, can.height - 5);
            clearPath(5, x, can.height - 5, x);
        }

        return ctx.getImageData(0, 0, can.width, can.height);
    });

    const grid = [];

    for (let x = 0 ; x < can.width ; x++) {
        grid.push([]);
        for (let y = 0 ; y < can.height ; y++) {
            grid[x][y] = can.data[y * can.width * 4 + x * 4] > 0x80;
        }
    }

    return grid;
};
