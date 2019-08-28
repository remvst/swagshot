class Character {
    constructor() {
        this.x = this.y = this.z = 0;

        this.lastDamage = -1;
        this.health = 1;

        this.angle = Math.PI / 4;
        this.verticalAngle = 0;
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    cycle(e) {
        this.weapon && this.weapon.cycle(e);
    }

    moveBy(x, y) {
        const beforeX = this.x;
        const beforeY = this.y;

        // Ugly collision handling
        this.x += x;
        if (hasBlock(this.x, this.y, this.collisionRadius || this.radius) && this.z < BLOCK_SIZE / 2) {
            this.x = beforeX;
            this.vX = 0;
        }

        this.y += y;
        if (hasBlock(this.x, this.y, this.collisionRadius || this.radius) && this.z < BLOCK_SIZE / 2) {
            this.y = beforeY;
            this.vY = 0;
        }
    }

    bloodParticleColor() {
        return '#f00';
    }

    hurt(source, amount) {
        if (this.health && amount > 0) {
            this.lastDamage = (amount > 0) * G.clock;
            this.health = max(0, this.health - amount);

            if (!this.health)  {
                this.die();
            }

            this.emitBloodParticles(!this.health * 30 + 10);

            damageSound();
        }
    }

    emitBloodParticles(particleCount) {
        for (let i = 0 ; i < particleCount ; i++) {
            const duration = max(0.2, (0.5 + this.z / BLOCK_SIZE) / rnd(0.4, 0.7));

            const size = BLOCK_SIZE * rnd(0.01, 0.05);

            const particle = {
                'x': this.x + rnd(-1, 1) * this.radius / 2,
                'y': this.y + rnd(-1, 1) * this.radius / 2,
                'alpha': 1,
                'worldWidth': size,
                'worldHeight': size,
                'color': this.bloodParticleColor()
            };
            SPRITES.push(particle);
            interp(particle, 'x', particle.x, particle.x + rnd(-30, 30), duration);
            interp(particle, 'y', particle.y, particle.y + rnd(-30, 30), duration);
            interp(particle, 'z', this.z + rnd(-1, 1) * this.radius / 2, -BLOCK_SIZE / 2, duration, 0, easeOutBounce);
            interp(particle, 'f', 0, 0, duration + 0.5, 0, null, () => remove(SPRITES, particle));
        }
    }

    die() {
    }

    eyeZ() {
        return this.z;
    }

    shootAngle() {
        return this.angle;
    }

    shootVerticalAngle() {
        return this.verticalAngle;
    }
}
