const MOUNTAINS = createCanvasPattern(80, 40, (ctx, can) => {
    ctx.imageSmoothingEnabled = false;
    ctx.fs(MOUNTAIN_COLOR);
    ctx.beginPath();
    ctx.moveTo(0, can.height);

    const sins = [
        x => sin(x * TWO_PI / (can.width)) * can.height / 8,
        x => sin(x * TWO_PI / (can.width / 2)) * can.height / 16,
        x => sin(x * TWO_PI / (can.width / 4)) * can.height / 32,
        x => sin(x * TWO_PI / (can.width / 8)) * can.height / 64
    ];

    for (let x = 0 ; x <= can.width ; x += 2) {
        const y = sins.reduce((acc, sin) => {
            return acc + sin(x);
        }, can.height / 4);
        ctx.lineTo(x, y);
    }

    ctx.lineTo(can.width, can.height);
    ctx.fill();
});

const MINIMAP_GRID = createCanvasPattern(MINIMAP_SCALE * 10, MINIMAP_SCALE * 10, (ctx, can) => {
    ctx.fs('#fff');
    ctx.globalAlpha = 0.1;
    for (let i = 0 ; i < can.width ; i+=MINIMAP_SCALE) {
        ctx.fillRect(i, 0, 1, can.height);
        ctx.fillRect(0, i, can.width, 1);
    }
});
