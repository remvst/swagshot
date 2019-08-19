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

function consoleSprite() {
    return createCanvas(40, 40, (ctx, can) => {
        ctx.fillStyle = '#01020a';
        ctx.fillRect(0, 0, 40, 40);

        ctx.globalAlpha = 0.05;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, 40, 1);
        ctx.fillRect(19, 0, 2, 40);
        ctx.fillRect(0, 19, 40, 2);
        ctx.fillRect(0, 39, 40, 1);
        ctx.fillRect(39, 0, 1, 40);
        ctx.fillRect(0, 0, 1, 40);

        const generator = createNumberGenerator(1);
        for (let x = 0 ; x < 40 ; x++) {
            for (let y = 0 ; y < 40 ; y++) {
                ctx.globalAlpha = generator() * 0.03 + 0.05;
                ctx.fillStyle = '#fff';
                ctx.fillRect(x * 1, y * 1, 1, 1);
            }
        }

        ctx.globalAlpha = 1;

        function buttonPanel() {
            for (let x = 3 ; x < 20 - 3 ; x += 3) {
                for (let y = 3 ; y < 20 - 3 ; y += 3) {
                    ctx.fillStyle = random() < 0.5 ? '#426026' : '#d5f6b2';
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

const CONSOLE_SPRITES = [consoleSprite(), consoleSprite(), consoleSprite()];

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

const BACKGROUND_SPRITE = createCanvasPattern(1, CANVAS_HEIGHT / 2, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, 0, can.height);
    grad.addColorStop(0, '#000');
    grad.addColorStop(1, '#1d1c23');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1, can.height);

});

const STARRY_BACKGROUND = createCanvasPattern(400, 400, (ctx, can) => {
    ctx.fillStyle = '#0e0409';
    ctx.fillRect(0, 0, 400, 400);

    const starGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    starGradient.addColorStop(0, 'rgba(255,255,200,1)');
    starGradient.addColorStop(0.3, 'rgba(255,255,200,0.1)');
    starGradient.addColorStop(1, 'rgba(255,255,200,0)');

    ctx.fillStyle = starGradient;

    for (let i = 0 ; i < 0 ; i++) {
        ctx.beginPath();
        ctx.arc(
            random() * 400,
            random() * 400,
            1,
            0,
            TWO_PI
        );
        ctx.fill();

        ctx.fillStyle = '#fff';
        // ctx.fillRect(random() * 200, random() * 200, 1, 1);
    }
});

const SHOTGUN = pixelate(createCanvas(165, 150, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, can.width / 2, 10);
    grad.addColorStop(0, '#765');
    grad.addColorStop(0.7, '#ddd');
    grad.addColorStop(1, '#765');

    const barrel = () => {
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.arc(60, 20, 20, PI, 0, false);
        ctx.lineTo(80, can.height);
        ctx.lineTo(10, can.height);
        ctx.fill();
    };

    ctx.fillStyle = grad;
    barrel();

    ctx.translate(can.width, 0);
    ctx.scale(-1, 1);
    barrel();
}), 5);

const MACHINE_GUN = pixelate(createCanvas(100, 150, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, can.width, 0);
    grad.addColorStop(0.2, '#000');
    grad.addColorStop(0.5, '#222');
    grad.addColorStop(0.8, '#000');

    const barrelRadius = 20;

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(can.width / 2, barrelRadius + 10, barrelRadius, PI, 0);
    ctx.lineTo(can.width / 2 + barrelRadius + 20, can.height);
    ctx.lineTo(can.width / 2 - barrelRadius - 20, can.height);
    ctx.fill();

    ctx.fillStyle = '#000';
    ctx.fillRect(can.width / 2 - 4, 0, 8, 20);

}), 5);

const MUZZLEFLASH = pixelate(createCanvas(160, 160, (ctx, can) => {
    const grad = ctx.createRadialGradient(can.width / 2, can.width / 2, 0, can.width / 2, can.width / 2, can.width / 2);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.4, '#fff');
    grad.addColorStop(0.6, '#ff0');
    grad.addColorStop(1, '#ff0');

    ctx.fillStyle = grad;
    for (let i = 0 ; i < 3 ; i++) {
        // ctx.rotate(PI / 3);
        ctx.beginPath();
        ctx.ellipse(can.width / 2, can.width / 2, can.width / 2, 16, i * PI / 3, 0, PI * 2);
        ctx.fill();
    }
}), 5);

const EXPLOSION_CIRCLE = pixelate(createCanvas(200, 200, (ctx, can) => {
    const grad = ctx.createRadialGradient(can.width / 2, can.width / 2, 0, can.width / 2, can.width / 2, can.width / 2);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.5, '#ff0');
    grad.addColorStop(1, '#f80');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, TWO_PI);
    ctx.fill();
}), 10);

const SHADOW_CIRCLE = pixelate(createCanvas(200, 200, (ctx, can) => {
    ctx.fillStyle = '#250000';
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, TWO_PI);
    ctx.fill();
}), 10);

const ROCKET_LAUNCHER = pixelate(createCanvas(120, 200, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, can.width, 0);
    grad.addColorStop(0.2, '#41403a');
    grad.addColorStop(0.5, '#6a7163');
    grad.addColorStop(0.8, '#41403a');

    ctx.fillStyle = grad;

    const bigBarrelRadius = 40;
    const smallBarrelTopY = bigBarrelRadius + 20;
    const smallBarrelRadius = 30;

    ctx.beginPath();
    ctx.arc(can.width / 2, bigBarrelRadius, bigBarrelRadius, PI, 0, false);
    ctx.arc(can.width / 2, smallBarrelTopY, bigBarrelRadius, 0, PI, false);
    ctx.fill();

    ctx.fillStyle = '#22241b';
    ctx.beginPath();
    ctx.arc(can.width / 2, smallBarrelTopY, bigBarrelRadius, 0, TWO_PI, false);
    ctx.fill();

    ctx.fillStyle = grad;

    ctx.beginPath();
    ctx.arc(can.width / 2, smallBarrelTopY, smallBarrelRadius, PI, 0, false);
    ctx.lineTo(can.width / 2 + smallBarrelRadius, smallBarrelTopY);
    ctx.lineTo(can.width / 2 + smallBarrelRadius + 20, can.height);
    ctx.lineTo(can.width / 2 - smallBarrelRadius - 20, can.height);
    ctx.fill();
}), 5);

const MOUNTAINS = createCanvasPattern(160, 40, (ctx, can) => {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(0, can.height);
    // ctx.lineTo(0, can.height / 2);

    const sins = [
        x => Math.sin(x * TWO_PI / (can.width / 2)) * can.height / 8,
        x => Math.sin(x * TWO_PI / (can.width / 4)) * can.height / 16,
        x => Math.sin(x * TWO_PI / (can.width / 8)) * can.height / 32,
        x => Math.sin(x * TWO_PI / (can.width / 16)) * can.height / 64
    ];

    for (let x = 0 ; x <= can.width ; x += 2) {
        const y = sins.reduce((acc, sin) => {
            return acc + sin(x);
        }, can.height / 4);
        ctx.lineTo(x, y);
    }

    // ctx.lineTo(can.width, can.height / 2);
    ctx.lineTo(can.width, can.height);
    ctx.fill();
// 661707
    const baseColor = [0x6, 0x1, 0x0];

    return addNoise(can, 1, () => toColor(baseColor));
});

const MINIMAP_GRID = createCanvasPattern(MINIMAP_SCALE * 10, MINIMAP_SCALE * 10, (ctx, can) => {
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.1;
    for (let i = 0 ; i < can.width ; i+=18) {
        ctx.fillRect(i, 0, 1, can.height);
        ctx.fillRect(0, i, can.height, 1);
    }
});

const PISTOL = pixelate(createCanvas(70, 150, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, can.width, 0);
    grad.addColorStop(0.2, '#000');
    grad.addColorStop(0.5, '#222');
    grad.addColorStop(0.8, '#000');

    const barrelRadius = 20;
    const bottomBarrelRadius = 35;

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(can.width / 2, barrelRadius + 5, barrelRadius, PI, 0);
    ctx.arc(can.width / 2, 80, bottomBarrelRadius, 0, PI, true);
    // ctx.lineTo(can.width / 2 + barrelRadius + 20, can.height);
    // ctx.lineTo(can.width / 2 - barrelRadius - 20, can.height);
    ctx.fill();

    ctx.fillStyle = '#000';

    ctx.fillRect(can.width / 2 - 3, 40, -10, -5);
    ctx.fillRect(can.width / 2 + 3, 40, 10, -5);
    ctx.fillRect(can.width / 2 - 3, 0, 6, 10);

    ctx.beginPath();
    ctx.arc(can.width / 2, 80, bottomBarrelRadius, PI, 0);
    ctx.lineTo(can.width / 2 + bottomBarrelRadius, can.height);
    ctx.lineTo(can.width / 2 - bottomBarrelRadius, can.height);
    ctx.fill();

    ctx.fillStyle = '#222';
    ctx.fillRect(can.width / 2 - 5, 60, 10, 16);

    ctx.fillStyle = '#111';
    ctx.fillRect(0, 80, 5, 100);
    ctx.fillRect(can.width - 5, 80, 5, 100);
}), 5);

const WEAPON_BOX = pixelate(createCanvas(100, 100, (ctx, can) => {
    ctx.fillStyle = '#816951';
    ctx.beginPath();
    ctx.moveTo(0, can.height / 6);
    ctx.lineTo(can.width / 2, can.height / 6);
    ctx.lineTo(can.width / 2, can.height);
    ctx.lineTo(0, can.height * 5 / 6);
    ctx.fill();

    ctx.fillStyle = '#b09370';
    ctx.beginPath();
    ctx.moveTo(can.width / 2, can.height / 3);
    ctx.lineTo(can.width, can.height / 6);
    ctx.lineTo(can.width, can.height * 5 / 6);
    ctx.lineTo(can.width / 2, can.height);
    ctx.fill();

    ctx.fillStyle = '#5e503a';
    ctx.beginPath();
    ctx.moveTo(can.width / 2, 0);
    ctx.lineTo(can.width, can.height / 6);
    ctx.lineTo(can.width / 2, can.height / 3);
    ctx.lineTo(0, can.height / 6);
    ctx.fill();
}), 5);

const HEALTH_ITEM = pixelate(createCanvas(100, 60, (ctx, can) => {
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, can.height * 0.2, can.width, 60);

    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.moveTo(0, can.height * 0.2);
    ctx.lineTo(can.width, can.height * 0.2);
    ctx.lineTo(can.width * 0.8, 0);
    ctx.lineTo(can.width * 0.2, 0);
    ctx.fill();

    const crossLength = 30;
    const crossThickness = 10;
    ctx.fillStyle = '#900';
    ctx.fillRect(can.width / 2 - crossThickness / 2, can.height * 0.2 + (can.height * 0.8 - crossLength) / 2, crossThickness, crossLength);
    ctx.fillRect((can.width - crossLength) / 2, can.height * 0.2 + (can.height * 0.8 - crossThickness) / 2, crossLength, crossThickness);
}), 5);
