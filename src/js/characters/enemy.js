class Enemy extends Character {
    constructor() {
        super();

        this.baseBloodColor = multiply(randomBrightColor(), 0.5);

        const matrix = pick([
            [
                [0, 0, 1, 1, 0],
                [0, 1, 1, 1, 1],
                [1, 1, 1, 1, 1],
                [1, 2, 2, 1, 1],
                [1, 1, 1, 1, 1],
                [0, 1, 1, 1, 1],
                [0, 1, 0, 0, 0],
                [0, 1, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0, 1],
                [0, 0, 0, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 1, 1, 2, 1],
                [0, 1, 1, 1, 1],
                [0, 0, 1, 0, 1],
                [0, 1, 0, 0, 0],
                [0, 0, 1, 0, 0]
            ],
            [
                [0, 0, 0, 0, 1],
                [0, 0, 0, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 1, 1, 1, 1],
                [1, 1, 2, 2, 1],
                [1, 1, 1, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 0, 1, 1, 1],
                [0, 1, 1, 1, 1],
                [0, 1, 1, 1, 1],
                [0, 0, 1, 1, 0]
            ]
        ]);

        this.spriteCanvas = createCanvas((matrix[0].length * 2), matrix.length, (ctx, can) => {
            const half = () => {
                renderMatrix(matrix, ctx, x => {
                    if (x == 1) {
                        return randomizeColor(this.baseBloodColor);
                    } else {
                        return randomizeColor(invertColor(this.baseBloodColor));
                    }
                });
            };

            half();
            ctx.translate(can.width, 0);
            ctx.scale(-1, 1);
            half();
        });

        this.sideCanvas = createCanvas(matrix[0].length * 2, matrix.length, (ctx, can) => {
            const half = () => {
                renderMatrix(matrix, ctx, () => {
                    return randomizeColor(this.baseBloodColor);
                });
            };

            half();
            ctx.translate(can.width, 0);
            ctx.scale(-1, 1);
            half();
        });

        this.hurtSpriteCanvas = tintCanvas(this.sideCanvas, 'rgba(255,255,255,0.5)');

        this.width = this.spriteCanvas.width * 6;
        this.height = this.spriteCanvas.height * 6;

        SPRITES.push(this.sprite = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'width': this.width,
            'height': this.height,
            'sprite': this.spriteCanvas
        });
        CYCLABLES.push(this);
        ENEMIES.push(this);
        MINIMAP_ELEMENTS.push(this);

        SPRITES.push(this.shadowSprite = {
            'x': this.x,
            'y': this.y,
            'z': -BLOCK_SIZE / 2,
            'width': this.width / 2,
            'height': this.height / 8,
            'sprite': SHADOW_CIRCLE
        });

        this.enemies = [P];

        this.nextTrajectory = 0;
        this.nextShot = 0;

        this.radius = this.width * 0.6;

        // this.setWeapon(new EnemySpreadWeapon(this));
        // this.setWeapon(new EnemyBurstWeapon(this));
    }

    setWeapon(weapon) {
        super.setWeapon(weapon);
        weapon.ammoPerShot = 0;
    }

    cycle(e) {
        super.cycle(e);

        if (G.clock >= this.nextTrajectory || dist(this, this.target) < 10) {
            this.aggressive = dist(P, this) < BLOCK_SIZE * 5 && P.health;

            const referencePoint = this.aggressive ? P : this;
            this.target = {
                'x': limit(0, referencePoint.x + rnd(-1, 1) * BLOCK_SIZE * 4, W.matrix[0].length * BLOCK_SIZE),
                'y': limit(0, referencePoint.y + rnd(-1, 1) * BLOCK_SIZE * 4, W.matrix.length * BLOCK_SIZE),
            };
            this.nextTrajectory = G.clock + 2;
            this.aggressive = dist(P, this) < BLOCK_SIZE * 8;
        }

        const angleDiff = normalize(angleBetween(this, this.target) - this.angle);
        this.angle += limit(-e * PI / 4, angleDiff, e * PI / 4);

        const speed = this.aggressive ? 200 : 100;
        // this.moveBy(
        //     cos(this.angle) * e * speed,
        //     sin(this.angle) * e * speed
        // );

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z;

        this.shadowSprite.x = this.x + cos(P.angle);
        this.shadowSprite.y = this.y + sin(P.angle);

        if (dist(this, P) < this.width * 1.2 && this.z - P.z < this.height / 2) {
            const angle = angleBetween(this, P);
            P.x = this.x + cos(angle) * this.width * 1.2;
            P.y = this.y + sin(angle) * this.width * 1.2;
        }

        const angleToPlayer = angleBetween(this, P);
        const differenceToFacingPlayer = abs(normalize(this.angle - angleToPlayer));

        const facingPlayer = differenceToFacingPlayer < PI / 2 || this.aggressive;
        this.sprite.sprite = G.clock - this.lastDamage < 0.05 ? this.hurtSpriteCanvas : (facingPlayer ? this.spriteCanvas : this.sideCanvas);

        // TODO maybe bring back
        // const scale = 1 - min(differenceToFacingPlayer, PI - differenceToFacingPlayer);
        // this.sprite.width = this.width * (scale * 0.4 + 0.6);
    }

    die() {
        super.die();

        remove(CYCLABLES, this);
        remove(SPRITES, this.shadowSprite);
        remove(ENEMIES, this);
        remove(MINIMAP_ELEMENTS, this);

        const duration = abs(-BLOCK_SIZE / 4 - this.z) / BLOCK_SIZE;
        interp(this.sprite, 'z', this.z, -BLOCK_SIZE / 4, duration);

        interp(this.sprite, 'f', 0, 0, 0, 1.5, null, () => remove(SPRITES, this.sprite));

        this.sprite.sprite = tintCanvas(this.spriteCanvas, 'rgba(0,0,0,0.8)');
    }

    hurt(source, amount) {
        super.hurt(source, amount);
        P.lastHit = G.clock;
    }

    shootAngle() {
        return angleBetween(this, P);
    }

    shootVerticalAngle() {
        return atan2(-(P.z - this.z), P.x - this.x);
    }
}
