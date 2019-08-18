class Bullet {
    constructor(x, y, z, speed, angle, verticalAngle, targets, projectileSize, trailSize, explodes) {
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

        SPRITES.push(this.particle = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'width': projectileSize,
            'height': projectileSize,
            'color': '#fff'
        });
        CYCLABLES.push(this);
    }

    cycle(e) {
        const beforeX = this.x;
        const beforeY = this.y;

        this.x += Math.cos(this.angle) * this.speed * e;
        this.y += Math.sin(this.angle) * this.speed * e;
        this.z -= Math.sin(this.verticalAngle) * this.speed * e;

        if (
            hasBlock(this.x, this.y, 0) && this.z < BLOCK_SIZE / 2 ||
            this.z < -BLOCK_SIZE / 2 ||
            G.clock - this.created > 2
        ) {
            this.remove(beforeX, beforeY);
        }

        this.targets.forEach(target => {
            if (dist(target, this) < target.width / 2 && abs(target.z - this.z) < target.height / 2) {
                this.remove(beforeX, beforeY, target);
                target.hurt(this, 0.2);
            }
        });

        this.particle.x = this.x;
        this.particle.y = this.y;
        this.particle.z = this.z;

        const trail = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'alpha': 1,
            'width': this.trailSize,
            'height': this.trailSize,
            'color': '#fff'
        };
        SPRITES.push(trail);
        interp(trail, 'alpha', 1, 0, 0.8, 0, null, () => remove(SPRITES, trail));
        interp(trail, 'x', trail.x, trail.x + rnd(-5, 5), 0.8);
        interp(trail, 'y', trail.y, trail.y + rnd(-5, 5), 0.8);
        interp(trail, 'z', trail.z, trail.z + rnd(-5, 5), 0.8);
    }

    remove(beforeX, beforeY, hitTarget) {
        remove(CYCLABLES, this);
        remove(SPRITES, this.particle);

        if (this.explodes) {
            explosion(beforeX, beforeY, this.z, BLOCK_SIZE / 2);
        }

        // Add some particles
        for (let i = 0 ; i < 5 ; i++) {
            const x = beforeX + -Math.cos(this.angle) * 10;
            const y = beforeY + -Math.sin(this.angle) * 10;
            const duration = rnd(0.1, 0.3);

            const particle = {
                'x': x,
                'y': y,
                'z': this.z,
                'alpha': 1,
                'width': BLOCK_SIZE / 40,
                'height': BLOCK_SIZE / 40,
                'color': hitTarget ? hitTarget.bloodParticleColor() : '#ff0'
            };
            SPRITES.push(particle);
            interp(particle, 'x', x, x + rnd(-10, 10), duration);
            interp(particle, 'y', y, y + rnd(-10, 10), duration);
            interp(particle, 'z', this.z, this.z + rnd(-10, 10), duration);
            interp(particle, 'alpha', 1, 0, duration, 0, null, () => remove(SPRITES, particle));
        }
    }
}
