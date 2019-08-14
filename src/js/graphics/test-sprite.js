const TEST_SPRITE_1 = createCanvas(20, 20, ctx => {
    ctx.fillStyle = '#3F1F0C';
    ctx.fillRect(0, 0, 20, 20);

    ctx.fillStyle = '#926D59';
    ctx.fillRect(0, 10, 20, 1);

    ctx.fillStyle = '#59341F';
    ctx.fillRect(1, 1, 8, 8);
    ctx.fillRect(11, 1, 8, 8);

    ctx.fillRect(1, 12, 18, 7);

    ctx.fillStyle = '#000';
    // for (let y = 0 ; y < 6 ; y += 2) {
    //     ctx.fillRect(0, y, 20, 1);
    // }

    for (let x = 0 ; x < 20 ; x++) {
        for (let y = 0 ; y < 20 ; y++) {
            ctx.globalAlpha = rnd(0.05, 0.1);
            ctx.fillStyle = '#fff';
            ctx.fillRect(x * 1, y * 1, 1, 1);
        }
    }
});

const TEST_SPRITE = createCanvas(40, 40, ctx => {
    ctx.fillStyle = '#01020a';
    ctx.fillRect(0, 0, 40, 40);

    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 40, 1);
    ctx.fillRect(19, 0, 2, 40);
    ctx.fillRect(0, 39, 40, 1);
    ctx.fillRect(39, 0, 1, 40);
    ctx.fillRect(0, 0, 1, 40);

    for (let x = 0 ; x < 40 ; x++) {
        for (let y = 0 ; y < 40 ; y++) {
            ctx.globalAlpha = rnd(0.02, 0.05);
            ctx.fillStyle = '#fff';
            ctx.fillRect(x * 1, y * 1, 1, 1);
        }
    }
});

const FLOOR_SPRITE = createCanvas(40, 40, (ctx, can) => {
    for (let x = 0 ; x < 40 ; x++) {
        for (let y = 0 ; y < 40 ; y++) {
            ctx.fillStyle = pick(['#1d1c23', '#262228']);
            ctx.fillRect(x * 1, y * 1, 1, 1);
        }
    }

    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 40, 1);
    ctx.fillRect(0, 19, 40, 2);
    ctx.fillRect(19, 0, 2, 40);
    ctx.fillRect(0, 39, 40, 1);
    ctx.fillRect(39, 0, 1, 40);
    ctx.fillRect(0, 0, 1, 40);

    // ctx.globalAlpha = 0.1;
    // ctx.strokeStyle = '#fff';
    // ctx.rect(0.5, 0.5, 9, 9);
    // ctx.stroke();
});

const BACKGROUND_SPRITE = createCanvasPattern(1, CANVAS_HEIGHT / 2, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, 0, can.height);
    grad.addColorStop(0, '#000');
    grad.addColorStop(1, '#1d1c23');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1, can.height);

});
