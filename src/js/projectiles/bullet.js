class Bullet {
    constructor(x, y, z, speed, angle, verticalAngle, targets, trailSize, explodes) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.speed = speed;
        this.angle = angle;
        this.verticalAngle = verticalAngle;
        this.targets = targets;
        this.trailSize = trailSize;
        this.explodes = explodes;
        this.created = G.clock;
        this.jumpShot = P.z;

        SPRITES.push(this.sprite = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'worldWidth': this.trailSize,
            'worldHeight': this.trailSize,
            'color': targets[0] == P ? '#ff0' : '#ff0'
        });
        CYCLABLES.push(this);
    }

    cycle(e) {
        let iterations = 0;
        let remaining = e;
        while (remaining > 0 && !this.removed) {
            const removed = min(remaining, (BLOCK_SIZE / 5) / this.speed);
            remaining -= removed;
            this.actualCycle(removed);
            iterations++;
        }

        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z;
    }

    actualCycle(e) {
        const beforeX = this.x;
        const beforeY = this.y;

        this.x += cos(this.angle) * this.speed * e;
        this.y += sin(this.angle) * this.speed * e;
        this.z -= sin(this.verticalAngle) * this.speed * e;

        if (
            hasBlock(this.x, this.y, 0) && this.z < BLOCK_SIZE / 2 ||
            this.z < -BLOCK_SIZE / 2 ||
            G.clock - this.created > 3
        ) {
            this.remove(beforeX, beforeY);
        }

        this.targets.forEach(target => {
            if (dist(target, this) < target.radius && abs(target.z - this.z) < target.radius) {
                this.remove(beforeX, beforeY, target);
                target.hurt(this, 0.2, this.angle);
            }
        });

        if (dist(this, P) < DRAW_DISTANCE) {
            const trail = {
                'x': this.x,
                'y': this.y,
                'z': this.z,
                'alpha': 1,
                'worldWidth': this.trailSize,
                'worldHeight': this.trailSize,
                'color': this.targets[0] == P ? '#f00' : '#fff'
            };
            SPRITES.push(trail);
            interp(trail, 'alpha', 1, 0, 0.8, 0, null, () => remove(SPRITES, trail));
            interp(trail, 'x', trail.x, trail.x + rnd(-5, 5), 0.8);
            interp(trail, 'y', trail.y, trail.y + rnd(-5, 5), 0.8);
            interp(trail, 'z', trail.z, trail.z + rnd(-5, 5), 0.8);
        }
    }

    remove(beforeX, beforeY, hitTarget) {
        remove(CYCLABLES, this);
        remove(SPRITES, this.sprite);

        const isEnemyGenerated = this.targets[0] == P;

        let hurtEnemies = hitTarget && hitTarget != P;

        if (this.explodes) {
            // Drop some fire
            dropFire(beforeX, beforeY, this.z);

            if (!isEnemyGenerated) {
                const hurtInExplosion = explosion(beforeX, beforeY, this.z, evaluate(BLOCK_SIZE / 2));
                if (hurtInExplosion > 1) {
                    G.scoreKeeper.bonus(nomangle('EXPLOSION COMBO X') + hurtInExplosion, hurtInExplosion * 50);
                }
                hurtEnemies = hurtEnemies || hurtInExplosion;

                if (hitTarget) {
                    G.scoreKeeper.bonus(nomangle('DIRECT ROCKET HIT'), 50);
                }
            }
        }

        if (!isEnemyGenerated && this.jumpShot && hitTarget && !hitTarget.hurtBy.has(this.created)) {
            G.scoreKeeper.bonus(nomangle('JUMPSHOT'), 10);
            hitTarget.hurtBy.add(this.created);
        }

        if (!hitTarget) {
            W.emitBloodParticles(beforeX, beforeY, this.z, 2, () => '#ff0');
        }

        this.removed = true;
    }
}
