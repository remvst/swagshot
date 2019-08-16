class Player {
    constructor() {
        this.x = 150;
        this.y = 150;
        this.z = 0;

        this.zSpeed = 0;

        this.angle = Math.PI / 3;

        this.vX = 0;
        this.vY = 0;

        this.verticalAngle = 0;

        this.moving = false;

        this.movingClock = 0;

        this.headTilt = 0;

        this.lastShot = 0;
        this.lastLanding = 0;
    }

    cycle(e) {
        const beforeX = this.x;
        const beforeY = this.y;
        const beforeZ = this.z;

        this.angle = normalize(this.angle);
        this.verticalAngle = limit(-Math.PI / 4, this.verticalAngle, Math.PI / 4);

        const x = !!w.down[KEYBOARD_W] - !!w.down[KEYBOARD_S],
            y = !!w.down[KEYBOARD_D] - !!w.down[KEYBOARD_A];

        if (x || y) {
            const maxSpeed = PLAYER_SPEED * (!!this.z * JUMP_SPEED_BOOST + 1);
            const targetAngle = atan2(y, x) + this.angle;

            const targetVX = maxSpeed * cos(targetAngle);
            const targetVY = maxSpeed * sin(targetAngle);

            const factor = 1 - abs(!!this.z * 0.7);

            const newVX = this.vX + factor * limit(-e * PLAYER_ACCELERATION, (targetVX - this.vX), e * PLAYER_ACCELERATION) * abs(cos(targetAngle));
            const newVY = this.vY + factor * limit(-e * PLAYER_ACCELERATION, (targetVY - this.vY), e * PLAYER_ACCELERATION) * abs(sin(targetAngle));

            const newSpeed = min(maxSpeed, distP(0, 0, newVX, newVY));
            const newMovementAngle = atan2(newVY, newVX);

            this.vX = cos(newMovementAngle) * newSpeed;
            this.vY = sin(newMovementAngle) * newSpeed;
        } else if (!this.z) {
            const movementAngle = atan2(this.vY, this.vX);
            const currentSpeed = distP(0, 0, this.vX, this.vY);
            const newSpeed = max(0, currentSpeed - e * PLAYER_ACCELERATION);

            this.vX = cos(movementAngle) * newSpeed;
            this.vY = sin(movementAngle) * newSpeed;
        }

        // Ugly collision handling
        this.x += this.vX * e;
        if (hasBlock(this.x, this.y, BLOCK_SIZE * 0.1)) this.x = beforeX;

        this.y += this.vY * e;
        if (hasBlock(this.x, this.y, BLOCK_SIZE * 0.1)) this.y = beforeY;

        this.movingClock += (distP(0, 0, this.vX, this.vY) / PLAYER_SPEED) * e;

        this.zSpeed -= e * JUMP_FORCE / JUMP_DURATION / 0.9;
        this.z = limit(0, this.z + this.zSpeed * e, BLOCK_SIZE / 2);

        if (!this.z && beforeZ) {
            this.lastLanding = G.clock;
        }

        if (w.down[KEYBOARD_SPACE]) {
            this.jump();
        }

        const targetTilt = (!!w.down[KEYBOARD_A] - !!w.down[KEYBOARD_D]) * PI / 100;
        this.headTilt = this.headTilt + limit(-e * PI / 8, targetTilt - this.headTilt, e * PI / 8);
    }

    jump() {
        if (this.z == 0) {
            this.zSpeed = JUMP_FORCE;
            this.vX *= evaluate(1 + JUMP_SPEED_BOOST);
            this.vY *= evaluate(1 + JUMP_SPEED_BOOST);
        }
    }

    eyeZ() {
        return this.z +
            // Landing animation
            this.landingProgress() * 10 +
            // Bobbing animation
            !this.z * ~~(sin(this.movingClock * PI * 2 * 2) * 5);
    }

    landingProgress() {
        return -sin(min(1, (G.clock - this.lastLanding) / 0.3) * PI);
    }

    headTilt() {
        return (!!w.down[KEYBOARD_A] - !!w.down[KEYBOARD_D]) * PI / 128;
    }

    shoot() {
        for (let i = 0 ; i < 3 ; i++) {
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
    }
}
