class Game {

    constructor() {
        G = this;
        G.clock = 0;

        G.messages = [];

        G.setupForMenu();
    }

    cycle(e) {
        e *= G.onMainMenu ? 0.3 : !onMenu * (P.health < 0.2 && G.clock - P.lastDamage < 1.5 ? 0.4 : 1);
        G.clock += e;

        if (P.health && G.clock > G.nextWave && !onMenu) {
            G.setupNextWave();
        }

        W.cycle(e);

        if (G.onMainMenu) {
            const angle = G.clock / 2 + 2;
            P.x = evaluate(BLOCK_SIZE * 25) + cos(angle) * evaluate(BLOCK_SIZE * 2);
            P.y = evaluate(BLOCK_SIZE * 25) + sin(angle) * evaluate(BLOCK_SIZE * 2);
            P.angle = angle + PI;
            P.movingClock = P.headTilt = 0;
        }

        INTERPOLATIONS.slice().forEach(i => i.cycle(e));

        wrap(() => {
            if (G.clock - P.lastDamage < 0.2 && !onMenu) {
                translate(rnd(-20, 20), rnd(-20, 20));
            }

            G.renderWorld = measure(() => wrap(renderWorld));

            if (P.health && !onMenu) {
                wrap(() => {
                    translate(evaluate(CANVAS_WIDTH / 2), evaluate(CANVAS_HEIGHT / 2));
                    rotate(PI / 4);

                    R.globalAlpha = 1 - min(1, (G.clock - P.lastHit - 0.1) / 0.15);

                    R.fs('#f00');
                    for (let i = 0 ; i < 4 ; i++) {
                        rotate(PI / 2);
                        fr(5, -1, 6, 2);
                    }
                });

                // Crosshair
                fs('#fff');
                fr(CANVAS_WIDTH / 2 - 5, CANVAS_HEIGHT / 2 - 1, 10, 2);
                fr(CANVAS_WIDTH / 2 - 1, CANVAS_HEIGHT / 2 - 5, 2, 10);

                const weaponOffsetX = sin(P.movingClock * PI * 2) * 10;
                const weaponOffsetY = cos(P.movingClock * PI * 4) * 10 +
                    max(0, 1 - (G.clock - P.weapon.lastShot) / 0.15) * 50 +
                    30 +
                    P.landingProgress() * 20 +
                    max(0, 1 - (G.clock - P.weapon.created) / 0.5) * P.weapon.sprite.height;

                // Muzzleflash
                if (G.clock - P.weapon.lastShot < 0.1) {
                    wrap(() => {
                        translate(weaponOffsetX + CANVAS_WIDTH / 2, weaponOffsetY + CANVAS_HEIGHT - P.weapon.sprite.height);
                        rotate(PI * P.weapon.lastShot * 99);
                        drawImage(MUZZLEFLASH, -MUZZLEFLASH.width / 2, -MUZZLEFLASH.height / 2);
                    });
                }

                // Weapon
                wrap(() => {
                    translate(weaponOffsetX, weaponOffsetY);
                    drawImage(P.weapon.sprite, (CANVAS_WIDTH - P.weapon.sprite.width) / 2, CANVAS_HEIGHT - P.weapon.sprite.height);
                });

                G.renderHud = measure(() => wrap(renderHud));
                G.renderMinimap = measure(() => wrap(renderMinimap));
            }

            if (!P.health && !onMenu) {
                R.font = '48pt Impact';
                R.textAlign = 'center';
                fs('#fff');
                fillText(nomangle('FINAL SCORE'), evaluate(CANVAS_WIDTH / 2), evaluate(CANVAS_HEIGHT / 2 - 50));
                fillText(G.scoreKeeper.score, evaluate(CANVAS_WIDTH / 2), evaluate(CANVAS_HEIGHT / 2 + 50));
            }

            if (G.clock - max(P.lastDamage, P.lastPickup) < 0.35 || P.health < 0.2) {
                wrap(() => {
                    R.globalAlpha = 0.2;
                    fs(P.health < 0.2 || P.lastDamage > P.lastPickup ? '#f00' : '#fff');
                    fr(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
                });
            }
        });

        if (onMenu) {
            wrap(renderMenu);
        }

        if (DEBUG) {
            wrap(() => {
                R.font = '7pt Courier';
                R.textAlign = 'left';
                fs('#fff');

                const fpsGauge = [];
                for (let i = 0 ; i < (G.fps / 60) * 20 ; i++) {
                    fpsGauge.push('-');
                }

                const info = [
                    'fps: ' + G.fps,
                    fpsGauge.join(''),
                    '',
                    '--------------------',
                    'sprites: ' + SPRITES.length,
                    'items: ' + ITEMS.length,
                    'cyclables: ' + CYCLABLES.length,
                    'enemies: ' + ENEMIES.length,
                    '--------------------',
                    'renderWorld: ' + G.renderWorld,
                    'castTime: ' + G.castTime,
                    'casts: ' + G.casts,
                    'interpolations: ' + G.interpolations,
                    'cast+interp: ' + (G.casts + G.interpolations),
                    'castIterations: ' + G.castIterations,
                    '--------------------',
                    'renderWalls: ' + G.renderWalls,
                    'renderFloor: ' + G.renderFloor,
                    'floorTiles: ' + G.floorTiles,
                    '--------------------',
                    'topSprites: ' + G.topSprites,
                    'bottomSprites: ' + G.bottomSprites,
                    'decorationParticles: ' + G.decorationParticles,
                    'sortIterations: ' + G.sortIterations,
                    'sortTime: ' + G.sortTime,
                    '--------------------',
                    'renderHud: ' + G.renderHud,
                    'renderMinimap: ' + G.renderMinimap,
                ];
                let y = 20;
                info.forEach(info => {
                    fillText(info, CANVAS_WIDTH - 200, y);
                    y += 10;
                });
            });
        }
    }

    resume() {
        if (G.onMainMenu) {
            G.setupNewGame();
        }
        onMenu = false;
    }

    setupNewGame() {
        G.scoreKeeper = new ScoreKeeper();
        G.onMainMenu = null;

        P = new Player();
        P.setWeapon(new Pistol(P));

        W = new World(generateRandomWorld());

        G.showMessage(nomangle('PAUSE'), nomangle('ESC'), 5);
        G.showMessage(nomangle('JUMP'), nomangle('SPACE'), 5);
        G.showMessage(nomangle('AIM/SHOOT'), nomangle('MOUSE'), 5);
        G.showMessage(nomangle('MOVE'), nomangle('WASD/ARROW KEYS'), 5);

        G.waveCount = 0;
        G.setupNextWave();

        G.nextWave = G.clock + 10;
    }

    setupForMenu() {
        G.setupNewGame();

        onMenu = true;
        G.onMainMenu = true;
        G.messages = [];

        for (let i = 0 ; i < 10 ; i++) {
            const angle = random() * TWO_PI;
            const distance = rnd(BLOCK_SIZE * 2, BLOCK_SIZE * 3.5);
            const enemy = new Enemy();
            enemy.x = 25 * BLOCK_SIZE + cos(angle) * distance;
            enemy.y = 25 * BLOCK_SIZE + sin(angle) * distance;
            enemy.sprite.sprite = enemy.aggressiveCanvas;
            enemy.weapon.maybeShoot();
        }
    }

    setupNextWave() {
        G.nextWave = G.clock + WAVE_INTERVAL;

        for (let row = 1 ; row < W.matrix.length ; row++) {
            for (let col = 1 ; col < W.matrix[0].length ; col++) {
                if (W.matrix[row][col]) {
                    continue;
                }

                const x = (col + 0.5) * BLOCK_SIZE;
                const y = (row + 0.5) * BLOCK_SIZE;

                const neighborCount = (W.matrix[row - 1][col] ? 1 : 0) +
                    (W.matrix[row + 1][col]  ? 1 : 0)+
                    (W.matrix[row][col - 1]  ? 1 : 0)+
                    (W.matrix[row][col + 1]? 1 : 0);

                if (G.waveCount != 1 && neighborCount > 1 && random() < ITEM_DENSITY && !ITEMS.filter(i => i.x == x && i.y == y).length) {
                    const item = new (pick([
                        WeaponItem,
                        HealthItem
                    ]))();
                    item.x = x;
                    item.y = y;

                    explosionEffect(x, y, evaluate(-BLOCK_SIZE / 2), evaluate(BLOCK_SIZE / 2));
                }

                if (G.waveCount && random() < INITIAL_ENEMY_DENSITY + ENEMY_DENSITY_INCREMENT * G.waveCount) {
                    const enemy = new Enemy();
                    enemy.x = (col + 0.5) * BLOCK_SIZE;
                    enemy.y = (row + 0.5) * BLOCK_SIZE;

                    explosionEffect(x, y, enemy.z, evaluate(BLOCK_SIZE / 2));
                }
            }
        }

        if (++G.waveCount > 2) {
            G.scoreKeeper.bonus(nomangle('SURVIVED WAVE'), 500);
        }
    }

    showMessage(primary, secondary, duration = 2) {
        const messageObject = {
            'primary': primary,
            'secondary': secondary
        };
        G.messages.unshift(messageObject);

        interp(messageObject, 'offset', -1, 0, 0.3, 0, null, () => {
            setTimeout(() => {
                interp(messageObject, 'offset', 0, 1, 0.3, 0, null, () => remove(G.messages, messageObject));
            }, duration * 1000);
        });
    }

}
