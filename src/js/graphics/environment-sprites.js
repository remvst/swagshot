MOUNTAINS = createCanvasPattern(80, 40, (ctx, can) => {
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
        ctx.lineTo(x, sins.reduce((acc, sin) => acc + sin(x), can.height / 4));
    }

    ctx.lineTo(can.width, can.height);
    ctx.fill();
});

MINIMAP_GRID = createCanvasPattern(evaluate(MINIMAP_SCALE), evaluate(MINIMAP_SCALE), ctx => {
    ctx.fs('#fff');
    ctx.globalAlpha = 0.1;
    for (let i = 0 ; i < evaluate(MINIMAP_SCALE * 10) ; i += MINIMAP_SCALE) {
        ctx.fr(i, 0, 1, evaluate(MINIMAP_SCALE * 10));
        ctx.fr(0, i, evaluate(MINIMAP_SCALE * 10), 1);
    }
});

MINIMAP_GRADIENT = createCanvas(1, 1, ctx => {
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 80);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(1, 'rgba(255,255,255, 0)');
    return grad;
});
