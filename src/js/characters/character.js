class Character {
    constructor() {
        this.x = this.y = this.z = 0;

        this.baseBloodColor = [0xf, 0, 0];
        this.lastDamage = 0;
        this.lastShot = 0;
        this.health = 1;
    }

    cycle(e) {
    }

    bloodParticleColor() {
        return toColor(multiply(this.baseBloodColor, rnd(0.3, 1)));
    }

    hurt(source, amount) {
        this.lastDamage = G.clock;
        this.health = max(0, this.health - amount);

        for (let i = 0 ; i < 10 ; i++) {
            const duration = max(0.2, (0.5 + this.z / BLOCK_SIZE) / rnd(0.4, 0.7));

            const size = BLOCK_SIZE * rnd(0.01, 0.05);

            const particle = {
                'alpha': 1,
                'width': size,
                'height': size,
                'color': this.bloodParticleColor()
            };
            SPRITES.push(particle);
            interp(particle, 'x', source.x + rnd(-10, 10), source.x + rnd(-30, 30), duration);
            interp(particle, 'y', source.y + rnd(-10, 10), source.y + rnd(-30, 30), duration);
            interp(particle, 'z', source.z + rnd(-10, 10), -BLOCK_SIZE / 2, duration, 0, easeOutBounce);
            interp(particle, 'f', 0, 0, duration + 0.5, 0, null, () => remove(SPRITES, particle));
        }
    }

    shoot() {
        // TODO use a weapon
        for (let i = 0 ; i < 1 ; i++) {
            new Bullet(
                this.x,
                this.y,
                this.eyeZ() - 10,
                this.angle + rnd(-1, 1) * PI / 128,
                this.verticalAngle + rnd(-1, 1) * PI / 128,
                ENEMIES
            );
        }
        this.lastShot = G.clock;

        // explosion(this.x + cos(this.angle) * BLOCK_SIZE * 4, this.y + sin(this.angle) * BLOCK_SIZE * 4, this.z, BLOCK_SIZE / 2);
    }
}
