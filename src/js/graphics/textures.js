BASE_LIGHT_WALL = addNoise(createCanvas(40, 40, ctx => {
    ctx.fs('#3F1F0C');
    ctx.fr(0, 0, 40, 40);

    ctx.fs('#926D59');
    ctx.fr(0, 20, 40, 1);

    ctx.fs('#59341F');
    ctx.fr(2, 2, 16, 16);
    ctx.fr(21, 2, 16, 16);

    ctx.fr(2, 22, 36, 17);
}), 1, () => 'rgba(255,255,255,' + rnd(0.05, 0.1) + ')');

BASE_DARK_WALL = addNoise(createCanvas(40, 40, ctx => {
    ctx.fs('#000');
    ctx.fr(0, 0, 40, 40);

    ctx.globalAlpha = 0.05;
    ctx.fs('#fff');
    ctx.fr(0, 0, 40, 1);
    ctx.fr(19, 0, 2, 40);
    ctx.fr(0, 19, 40, 2);
    ctx.fr(0, 39, 40, 1);
    ctx.fr(39, 0, 1, 40);
    ctx.fr(0, 0, 1, 40);
}), 1, () => 'rgba(255,255,255,' + rnd(0.05, 0.1) + ')');

function consoleSprite() {
    return createCanvas(40, 40, ctx => {
        ctx.drawImage(BASE_DARK_WALL, 0, 0);

        function buttonPanel() {
            for (let x = 3 ; x < 20 - 3 ; x += 3) {
                for (let y = 3 ; y < 20 - 3 ; y += 3) {
                    ctx.fillStyle = random() < 0.5 ? '#462' : '#dfb';
                    ctx.fr(x, y, 2, 1);
                }
            }
        }

        buttonPanel();
        ctx.translate(20, 0);
        buttonPanel();
        ctx.translate(-20, 20);
        buttonPanel();
        ctx.translate(20, 0);
        buttonPanel();
    });
}

WALL_TEXTURES = [...Array(11)].map((x, i) => {
    return i < 6 ? [BASE_LIGHT_WALL] : (i < 10 ? [BASE_DARK_WALL] : [consoleSprite(), consoleSprite(), consoleSprite()])
});

const FLOOR_SPRITE = createCanvas(40, 40, (ctx, can) => {
    for (let x = 0 ; x < 40 ; x++) {
        for (let y = 0 ; y < 40 ; y++) {
            ctx.fillStyle = pick(['#1d1c23', '#262228']);
            ctx.fr(x * 1, y * 1, 1, 1);
        }
    }

    ctx.globalAlpha = 0.1;
    ctx.fs('#fff');
    ctx.fr(0, 0, 40, 1);
    ctx.fr(0, 19, 40, 2);
    ctx.fr(19, 0, 2, 40);
    ctx.fr(0, 39, 40, 1);
    ctx.fr(39, 0, 1, 40);
    ctx.fr(0, 0, 1, 40);
});

const FLOOR_SPRITE_GRID = createCanvas(40, 40, (ctx, can) => {
    ctx.drawImage(FLOOR_SPRITE, 0, 0);

    ctx.fs('black');
    for (let y = 0 ; y < can.height ; y += 2) {
        ctx.fr(0, y, can.width, 1);
    }

    ctx.globalAlpha = 0.1;
    ctx.fs('#fff');
    ctx.fr(0, 0, 40, 1);
    ctx.fr(0, 19, 40, 2);
    ctx.fr(19, 0, 2, 40);
    ctx.fr(0, 39, 40, 1);
    ctx.fr(39, 0, 1, 40);
    ctx.fr(0, 0, 1, 40);
});
