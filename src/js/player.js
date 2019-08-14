class Player {
    constructor() {
        this.x = 1500;
        this.y = 150;
        this.z = 0;

        this.zSpeed = 0;

        this.angle = Math.PI / 3;

        this.verticalAngle = 0;

        this.moving = false;

        this.movingClock = 0;

        this.headTilt = 0;
    }

    cycle(e) {
        const beforeX = this.x;
        const beforeY = this.y;

        this.angle = normalize(this.angle);

        this.verticalAngle = limit(-Math.PI / 4, this.verticalAngle, Math.PI / 4);

        const x = !!w.down[KEYBOARD_W] - !!w.down[KEYBOARD_S],
            y = !!w.down[KEYBOARD_D] - !!w.down[KEYBOARD_A];

        if (x || y) {
            const angle = Math.atan2(y, x) + this.angle;
            this.x += Math.cos(angle) * PLAYER_SPEED / BLOCK_SIZE;
            if (hasBlock(this.x, this.y, BLOCK_SIZE * 0.1)) {
                this.x = beforeX;
            }

            this.y += Math.sin(angle) * PLAYER_SPEED / BLOCK_SIZE;
            if (hasBlock(this.x, this.y, BLOCK_SIZE * 0.1)) {
                this.y = beforeY;
            }

            this.movingClock += e;
        }

        if (!x && !y || this.z != 0) {
            this.movingClock = 0;
        }

        this.zSpeed -= e * JUMP_FORCE / JUMP_DURATION / 0.9;
        this.z = limit(0, this.z + this.zSpeed * e, BLOCK_SIZE * 0.45);

        if (w.down[KEYBOARD_SPACE]) {
            this.jump();
        }

        const targetTilt = (!!w.down[KEYBOARD_A] - !!w.down[KEYBOARD_D]) * PI / 100;
        this.headTilt = this.headTilt + limit(-e * PI / 8, targetTilt - this.headTilt, e * PI / 8);
    }

    jump() {
        if (this.z == 0) {
            this.zSpeed = JUMP_FORCE;
        }
    }

    eyeZ() {
        return this.z + ~~(sin(this.movingClock * PI * 2 * 2) * 5);
    }

    headTilt() {
        return (!!w.down[KEYBOARD_A] - !!w.down[KEYBOARD_D]) * PI / 128;
    }
}
