FIRE_1 = pixelate(createCanvas(80, 120, ctx => {
    const grad = ctx.createRadialGradient(
        40, 120 * 0.7, 0,
        40, 120 * 0.7, 40
    );
    grad.addColorStop(0, '#ff0');
    grad.addColorStop(1, '#f00');

    const points = [];
    for (let ratio = 0 ; ratio <= 1 ; ratio += 0.1) {
        const waveCenterX = 0.5 + sin(ratio * PI * 3) * 0.2;
        points.unshift({'x': waveCenterX - ratio / 2, 'y': ratio});
        points.push({'x': waveCenterX + ratio / 2, 'y': ratio});
    }

    ctx.fs(grad);
    ctx.strokeStyle = '#ff0';
    ctx.lineWidth = 5;
    ctx.beginPath();
    points.forEach(pt => ctx.lineTo(80 * pt.x, 120 * pt.y));
    ctx.stroke();
    ctx.fill();
}), 10);

FIRE_FRAMES = [FIRE_1, scaleCanvas(FIRE_1, -1, 1)];

EXPLOSION_CIRCLE = pixelate(createCanvas(200, 200, ctx => {
    const grad = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.5, '#ff0');
    grad.addColorStop(1, '#f80');

    ctx.fs(grad);
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, TWO_PI);
    ctx.fill();
}), 10);
