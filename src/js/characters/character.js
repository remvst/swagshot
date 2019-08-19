class Character {
    constructor() {
        this.x = this.y = this.z = 0;

        this.baseBloodColor = [0xf, 0, 0];
        this.lastDamage = 0;
        this.health = 1;

        this.angle = Math.PI / 3;
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
        if (hasBlock(this.x, this.y, BLOCK_SIZE * 0.1) && this.z < BLOCK_SIZE / 2) {
            this.x = beforeX;
            this.vX = 0;
        }

        this.y += y;
        if (hasBlock(this.x, this.y, BLOCK_SIZE * 0.1) && this.z < BLOCK_SIZE / 2) {
            this.y = beforeY;
            this.vY = 0;
        }
    }

    bloodParticleColor() {
        return toColor(multiply(this.baseBloodColor, rnd(0.3, 1)));
    }

    hurt(source, amount) {
        this.lastDamage = G.clock;
        this.health = max(0, this.health - amount);

        if (!this.health)  {
            this.die();
        }

        this.emitBloodParticles(!this.health * 30 + 10);
    }

    emitBloodParticles(particleCount) {
        for (let i = 0 ; i < particleCount ; i++) {
            const duration = max(0.2, (0.5 + this.z / BLOCK_SIZE) / rnd(0.4, 0.7));

            const size = BLOCK_SIZE * rnd(0.01, 0.05);

            const particle = {
                'x': this.x + rnd(-1, 1) * this.width / 2,
                'y': this.y + rnd(-1, 1) * this.width / 2,
                'alpha': 1,
                'width': size,
                'height': size,
                'color': this.bloodParticleColor()
            };
            SPRITES.push(particle);
            interp(particle, 'x', particle.x, particle.x + rnd(-30, 30), duration);
            interp(particle, 'y', particle.y, particle.y + rnd(-30, 30), duration);
            interp(particle, 'z', this.z + rnd(-1, 1) * this.height / 2, -BLOCK_SIZE / 2, duration, 0, easeOutBounce);
            interp(particle, 'f', 0, 0, duration + 0.5, 0, null, () => remove(SPRITES, particle));
        }
    }

    // shoot() {
    //     // TODO use a weapon
    //     for (let i = 0 ; i < 1 ; i++) {
    //         new Bullet(
    //             this.x,
    //             this.y,
    //             this.eyeZ() - 10,
    //             this.angle + rnd(-1, 1) * PI / 128,
    //             this.verticalAngle + rnd(-1, 1) * PI / 128,
    //             ENEMIES,
    //             10,
    //             10
    //         );
    //     }
    //     this.lastShot = G.clock;
    //
    //     // explosion(this.x + cos(this.angle) * BLOCK_SIZE * 4, this.y + sin(this.angle) * BLOCK_SIZE * 4, this.z, BLOCK_SIZE / 2);
    // }

    die() {

    }

    eyeZ() {
        return this.z;
    }
}
