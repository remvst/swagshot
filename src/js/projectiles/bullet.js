class Bullet {
    constructor(x, y, z, angle, verticalAngle) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.angle = angle;
        this.verticalAngle = verticalAngle;

        SPRITES.push(this.particle = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'width': BLOCK_SIZE / 40,
            'height': BLOCK_SIZE / 40,
            'color': '#fff'
        });
        CYCLABLES.push(this);
    }

    cycle(e) {
        this.x += Math.cos(this.angle) * BULLET_SPEED * e;
        this.y += Math.sin(this.angle) * BULLET_SPEED * e;
        this.z -= Math.sin(this.verticalAngle) * BULLET_SPEED * e;

        if (hasBlock(this.x, this.y, 0) || abs(this.z) > BLOCK_SIZE * 2 || this.z < -BLOCK_SIZE / 2) {
            remove(CYCLABLES, this);
            remove(SPRITES, this.particle);

            for (let i = 0 ; i < 10 ; i++) {
                const x = this.x + -Math.cos(this.angle) * 10;
                const y = this.y + -Math.sin(this.angle) * 10;
                const duration = rnd(0.3, 1);

                const particle = {
                    'x': x,
                    'y': y,
                    'z': this.z,
                    'alpha': 1,
                    'width': BLOCK_SIZE / 20,
                    'height': BLOCK_SIZE / 20,
                    'color': '#fff'
                };
                SPRITES.push(particle);
                interp(particle, 'x', x, x + rnd(-10, 10), duration);
                interp(particle, 'y', y, y + rnd(-10, 10), duration);
                interp(particle, 'z', this.z, this.z + rnd(-10, 10), duration);
                interp(particle, 'alpha', 1, 0, duration, 0, null, () => remove(SPRITES, particle));
            }
        }

        this.particle.x = this.x;
        this.particle.y = this.y;
        this.particle.z = this.z;

        const trail = {
            'x': this.x,
            'y': this.y,
            'z': this.z,
            'alpha': 1,
            'width': 1,
            'height': 1,
            'color': '#fff'
        };
        SPRITES.push(trail);
        interp(trail, 'alpha', 1, 0, 0.8, 0, null, () => remove(SPRITES, trail));
        interp(trail, 'x', trail.x, trail.x + rnd(-5, 5), 0.8);
        interp(trail, 'y', trail.y, trail.y + rnd(-5, 5), 0.8);
        interp(trail, 'z', trail.z, trail.z + rnd(-5, 5), 0.8);
    }
}
