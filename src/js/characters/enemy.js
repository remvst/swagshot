class Enemy extends Character {
    constructor() {
        super();

        const settings = pick([
            {
                'sprites': ROBOT_1,
                'z': -BLOCK_SIZE / 2
            },
            {
                'sprites': ROBOT_2,
                'z': -BLOCK_SIZE / 2
            },
            {
                'sprites': ROBOT_3,
                'z': rnd(1.5, 2.5) * BLOCK_SIZE
            }
        ]);

        this.hurtBy = new Set();

        this.idleCanvas = settings.sprites[0];
        this.aggressiveCanvas = settings.sprites[1];
        this.hurtCanvas = settings.sprites[2];

        this.width = this.idleCanvas.width * 0.3;
        this.height = this.idleCanvas.height * 0.3;

        this.z = settings.z + this.idleCanvas.height * 0.3 / 2;

        SPRITES.push(this.sprite = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'worldWidth': this.width,
            'worldHeight': this.height,
            'sprite': this.spriteCanvas
        });
        CYCLABLES.push(this);
        ENEMIES.push(this);
        MINIMAP_ELEMENTS.push(this);

        SPRITES.push(this.shadowSprite = {
            'x': this.x,
            'y': this.y,
            'z': -BLOCK_SIZE / 2,
            'worldWidth': this.width / 2,
            'worldHeight': this.height / 8,
            'sprite': SHADOW_CIRCLE
        });

        this.enemies = [P];

        this.nextTrajectory = 0;

        this.radius = this.width * 0.6;
        this.collisionRadius = BLOCK_SIZE / 4;

        this.setWeapon(new (pick([
            EnemyFireWeapon,
            EnemyBurstWeapon,
            EnemySpreadWeapon
        ]))(this));
    }

    bloodParticleColor() {
        return pick(['#111', '#333', '#222', '#ff0', '#f80']);
    }

    setWeapon(weapon) {
        super.setWeapon(weapon);
        weapon.ammoPerShot = 0;
    }

    cycle(e) {
        super.cycle(e);

        if (G.clock >= this.nextTrajectory || dist(this, this.target) < 10) {
            if (!this.aggressive) {
                // Delay the first shot when becoming aggressive
                this.weapon.lastShot = G.clock + rnd(1, 2);
            }

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
        this.moveBy(
            cos(this.angle) * e * speed,
            sin(this.angle) * e * speed
        );

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z;

        this.shadowSprite.x = this.x + cos(P.angle);
        this.shadowSprite.y = this.y + sin(P.angle);

        if (dist(this, P) < this.collisionRadius + P.collisionRadius && this.z - P.z < this.height / 2 && P.health) {
            const angle = angleBetween(this, P);

            const newX = this.x + cos(angle) * (this.collisionRadius + P.collisionRadius);
            const newY = this.y + sin(angle) * (this.collisionRadius + P.collisionRadius);

            P.moveBy(newX - P.x, newY - P.y);
        }

        this.sprite.sprite = G.clock - this.lastDamage < 0.05 ? this.hurtCanvas : (this.aggressive ? this.aggressiveCanvas : this.idleCanvas);
    }

    die() {
        super.die();

        remove(CYCLABLES, this);
        remove(SPRITES, this.shadowSprite);
        remove(ENEMIES, this);
        remove(MINIMAP_ELEMENTS, this);

        const duration = abs(-BLOCK_SIZE / 4 - this.z) / BLOCK_SIZE;
        interp(this.sprite, 'z', this.z, evaluate(-BLOCK_SIZE / 2) + this.idleCanvas.height * 0.3 / 2, duration);
        interp(this.sprite, 'f', 0, 0, 0, duration + 0.5, null, () => {
            remove(SPRITES, this.sprite);
            explosionEffect(this.x, this.y, evaluate(-BLOCK_SIZE / 2), evaluate(BLOCK_SIZE / 2));
        });

        dropFire(this.x, this.y, evaluate(-BLOCK_SIZE / 2), 0.5);

        this.sprite.sprite = this.hurtCanvas;

        G.scoreKeeper.bonus(nomangle('ROBOT PWNED'), 10);

        if (G.clock - G.scoreKeeper.lastKill < 4 && ++G.scoreKeeper.comboKillCount > 1) {
            G.scoreKeeper.bonus(nomangle('COMBO X') + G.scoreKeeper.comboKillCount, G.scoreKeeper.comboKillCount * 50);
        } else {
            G.scoreKeeper.comboKillCount = 1;
        }
        G.scoreKeeper.lastKill = G.clock;

        if (P.health < 0.3) {
            G.scoreKeeper.bonus(nomangle('NEAR DEATH'), 50);
        }

        if (between(0.1, G.clock - this.firstDamage, 0.7)) {
            G.scoreKeeper.bonus(nomangle('QUICK KILL'), 50);
        }
    }

    hurt(source, amount, angle) {
        super.hurt(source, amount, angle);
        P.lastHit = G.clock;
        this.aggressive = true;

        this.firstDamage = this.firstDamage || G.clock;
    }

    shootAngle() {
        return angleBetween(this, P);
    }

    shootVerticalAngle() {
        return atan2(-(P.z - this.z), dist(this, P));
    }
}
