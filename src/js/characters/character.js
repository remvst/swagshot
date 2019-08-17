class Character {
    constructor() {
        this.x = this.y = this.z = 0;
        this.baseBloodColor = [0xf, 0, 0];
        this.lastDamage = 0;
    }

    cycle(e) {

    }

    bloodParticleColor() {
        return toColor(multiply(this.bloodColor, rnd(0.3, 1)));
    }

    hurt(source) {
        this.lastDamage = G.clock;

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
}
