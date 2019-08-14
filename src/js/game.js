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
            renderWorld();
        });

        // Crosshair
        R.strokeStyle = '#fff';
        R.fillStyle = '#fff';
        R.lineWidth = 2;
        // beginPath();
        // arc(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 5, 0, PI * 2);
        // stroke();
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

        // wrap(() => {
        //     scale(0.2, 0.2);
        //
        //     renderDebug();
        // });

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
                    'renderCeiling: ' + G.renderCeiling,
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
