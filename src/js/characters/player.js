class Player extends Character {
    constructor() {
        super();

        this.vX = this.vY = 0;

        this.x = evaluate(BLOCK_SIZE * 5.5);
        this.y = evaluate(BLOCK_SIZE * 5.5);

        this.zSpeed = 0;

        this.moving = false;
        this.movingClock = 0;

        this.headTilt = 0;
        this.lastLanding = -1;
        this.lastHit = -1;
        this.lastPickup = -1;
        this.lastFireDamage = -1;

        this.enemies = ENEMIES;

        this.radius = evaluate(BLOCK_SIZE * 0.5);
        this.collisionRadius = evaluate(BLOCK_SIZE * 0.2);

        this.power = 0;
    }

    cycle(e) {
        if (!this.health) {
            return;
        }

        super.cycle(e);

        const beforeZ = this.z;

        this.angle = normalize(this.angle);
        this.verticalAngle = limit(-PI / 4, this.verticalAngle, PI / 4);

        const x = !!w.down[KEYBOARD_W] + !!w.down[KEYBOARD_Z] + !!w.down[KEYBOARD_UP] - !!w.down[KEYBOARD_S] - !!w.down[KEYBOARD_DOWN],
            y = !!w.down[KEYBOARD_D] + !!w.down[KEYBOARD_RIGHT] - !!w.down[KEYBOARD_A] - !!w.down[KEYBOARD_LEFT] - !!w.down[KEYBOARD_Q];

        if ((x || y) && !G.levelCleared) {
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
        this.moveBy(this.vX * e, this.vY * e);

        this.movingClock += (1 - !!this.z * 0.5) * (distP(0, 0, this.vX, this.vY) / PLAYER_SPEED) * e;

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
        if (!this.z && !onMenu) {
            this.zSpeed = JUMP_FORCE;
            this.vX *= evaluate(1 + JUMP_SPEED_BOOST);
            this.vY *= evaluate(1 + JUMP_SPEED_BOOST);
        }
    }

    eyeZ() {
        if (!this.health) {
            return evaluate(-BLOCK_SIZE / 4);
        }

        return this.z +
            // Landing animation
            this.landingProgress() * 10 +
            // Bobbing animation
            !this.z * (sin(this.movingClock * PI * 2 * 2) * 3);
    }

    landingProgress() {
        return -sin(min(1, (G.clock - this.lastLanding) / 0.3) * PI);
    }

    headTilt() {
        return (!!w.down[KEYBOARD_A] - !!w.down[KEYBOARD_D]) * PI / 128;
    }

    die() {
        super.die();
        this.verticalAngle = 0;
        this.headTilt = 0;

        document.exitPointerLock();

        setTimeout(G.setupForMenu, 5000);
    }

    hurt(source, amount, angle) {
        super.hurt(source, amount * 0.1, angle);

        const damageAngle = {'angle': angle, 'alpha': 1};
        DAMAGE_ANGLES.push(damageAngle);
        interp(damageAngle, 'alpha', 1, 0, 1, 0, null, () => remove(DAMAGE_ANGLES, damageAngle));

        backgroundAnimation('#400');
    }
}
