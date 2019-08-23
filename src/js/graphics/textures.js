const BASE_LIGHT_WALL = createCanvas(40, 40, ctx => {
    ctx.fillStyle = '#3F1F0C';
    ctx.fillRect(0, 0, 40, 40);

    ctx.fillStyle = '#926D59';
    ctx.fillRect(0, 20, 40, 1);

    ctx.fillStyle = '#59341F';
    ctx.fillRect(2, 2, 16, 16);
    ctx.fillRect(21, 2, 16, 16);

    ctx.fillRect(2, 22, 36, 17);
});

const BASE_DARK_WALL = createCanvas(40, 40, ctx => {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, 40, 40);

    ctx.globalAlpha = 0.05;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 40, 1);
    ctx.fillRect(19, 0, 2, 40);
    ctx.fillRect(0, 19, 40, 2);
    ctx.fillRect(0, 39, 40, 1);
    ctx.fillRect(39, 0, 1, 40);
    ctx.fillRect(0, 0, 1, 40);
});

wiredWall = (baseSprite, top, bottom) => addNoise(createCanvas(40, 40, ctx => {
    ctx.drawImage(baseSprite, 0, 0);

    ctx.fillStyle = 'rgba(255,255,255,' + rnd(0.05, 0.1) + ')';
    for (let y = 2 ; y < 10 ; y += 2) {
        top && ctx.fillRect(0, y, 40, 1);
        bottom && ctx.fillRect(0, 40 - y, 40, 1);
    }
}), 1, () => 'rgba(255,255,255,' + rnd(0.05, 0.1) + ')');

const consoleBase = wiredWall(BASE_DARK_WALL);
function consoleSprite() {
    return createCanvas(40, 40, ctx => {
        ctx.drawImage(consoleBase, 0, 0);

        function buttonPanel() {
            for (let x = 3 ; x < 20 - 3 ; x += 3) {
                for (let y = 3 ; y < 20 - 3 ; y += 3) {
                    ctx.fillStyle = random() < 0.5 ? '#462' : '#dfb';
                    ctx.fillRect(x, y, 2, 1);
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

const WALL_TEXTURES = [
    [wiredWall(BASE_LIGHT_WALL)],
    [wiredWall(BASE_LIGHT_WALL, true)],
    [wiredWall(BASE_LIGHT_WALL, false, true)],
    [wiredWall(BASE_LIGHT_WALL)],
    [wiredWall(BASE_LIGHT_WALL, true)],
    [wiredWall(BASE_LIGHT_WALL, false, true)],
    [wiredWall(BASE_DARK_WALL)],
    [wiredWall(BASE_DARK_WALL, true)],
    [wiredWall(BASE_DARK_WALL, false, true)],
    [consoleSprite(), consoleSprite(), consoleSprite()]
];

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
});

const FLOOR_SPRITE_LIGHT = createCanvas(40, 40, (ctx, can) => {
    for (let x = 0 ; x < 40 ; x++) {
        for (let y = 0 ; y < 40 ; y++) {
            ctx.fillStyle = pick(['#1d1c23', '#262228']);
            ctx.fillRect(x * 1, y * 1, 1, 1);
        }
    }

    ctx.fillStyle = 'black';
    for (let y = 0 ; y < can.height ; y += 2) {
        ctx.fillRect(0, y, can.width, 1);
    }

    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 40, 1);
    ctx.fillRect(0, 19, 40, 2);
    ctx.fillRect(19, 0, 2, 40);
    ctx.fillRect(0, 39, 40, 1);
    ctx.fillRect(39, 0, 1, 40);
    ctx.fillRect(0, 0, 1, 40);
});

// const FLOOR_SPRITE_LIGHT = tintCanvas(FLOOR_SPRITE, 'rgba(255,255,255,0.1)');

const FLOOR_TEXTURES = [FLOOR_SPRITE, FLOOR_SPRITE_LIGHT];
