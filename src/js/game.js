class Game {

    constructor() {
        G = this;

        G.setupNewGame();

        G.clock = 0;

        G.resourceIconOffsetY = 0;
        G.resourceIconScale = 1;
        G.resourceIconAlpha = 1;
        G.healthIconScale = 1;

        G.healthGaugeColor = '#fff';
    }

    cycle(e) {
        G.clock += e;

        W.cycle(e);

        INTERPOLATIONS.slice().forEach(i => i.cycle(e));

        wrap(() => {
            if (G.clock - P.lastDamage < 0.2) {
                console.log('ahahahah');
                translate(rnd(-20, 20), rnd(-20, 20));
            }

            wrap(renderWorld);
            wrap(renderHud);

            // Crosshair
            R.fillStyle = '#fff';
            fillRect(
                CANVAS_WIDTH / 2 - 5,
                CANVAS_HEIGHT / 2 - 1,
                10,
                2
            );
            fillRect(
                CANVAS_WIDTH / 2 - 1,
                CANVAS_HEIGHT / 2 - 5,
                2,
                10
            );

            if (G.clock - P.lastShot < 0.1) {
                wrap(() => {
                    // R.globalAlpha = 1 - (G.clock - P.lastShot) / 0.1;
                    translate(CANVAS_WIDTH / 2 + sin(P.movingClock * PI * 2) * 10, CANVAS_HEIGHT - SHOTGUN.height + 40);
                    rotate(PI * P.lastShot * 99);
                    drawImage(MUZZLEFLASH, -MUZZLEFLASH.width / 2, -MUZZLEFLASH.height / 2);
                });
            }

            wrap(() => {
                translate(
                    sin(P.movingClock * PI * 2) * 10,
                    cos(P.movingClock * PI * 4) * 10 + max(0, 1 - (G.clock - P.lastShot) / 0.15) * 30 + 30 + P.landingProgress() * 20);
                drawImage(SHOTGUN, (CANVAS_WIDTH - SHOTGUN.width) / 2, CANVAS_HEIGHT - SHOTGUN.height);
            });

            if (G.clock - P.lastDamage < 0.15) {
                R.fillStyle = 'rgba(255,0,0,0.25)';
                fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
            }
        });

        if (DEBUG) {
            wrap(() => {
                R.font = '10pt ' + monoFont;
                fs('#fff');

                const info = [
                    'fps: ' + G.fps,
                    'sprites: ' + SPRITES.length,
                    'casts: ' + G.casts,
                    'interpolations: ' + G.interpolations,
                    'cast+interp: ' + (G.casts + G.interpolations),
                    'castTime: ' + G.castTime,
                    'renderWalls: ' + G.renderWalls,
                    'renderFloor: ' + G.renderFloor,
                    'castIterations: ' + G.castIterations,
                    'floorTiles: ' + G.floorTiles,
                ];
                let y = 20;
                info.forEach(info => {
                    fillText(info, CANVAS_WIDTH - 200, y);
                    y += 20;
                });
            });
        }
    }

    setupNewGame() {
        W = new World();
        P = new Player();
    }

}
