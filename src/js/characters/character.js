class Character {
    constructor() {
        this.x = this.y = this.z = 0;

        this.lastDamage = -1;
        this.health = 1;

        this.angle = PI / 4;
        this.verticalAngle = 0;
    }

    setWeapon(weapon) {
        this.weapon = weapon;
    }

    cycle(e) {
        this.weapon && this.weapon.cycle(e);
    }

    moveBy(x, y) {
        // Ugly collision handling
        this.x += x;
        if (hasBlock(this.x, this.y, this.collisionRadius || this.radius) && this.z < BLOCK_SIZE / 2) {
            this.x -= x;
            this.vX = 0;
        }

        this.y += y;
        if (hasBlock(this.x, this.y, this.collisionRadius || this.radius) && this.z < BLOCK_SIZE / 2) {
            this.y -= y;
            this.vY = 0;
        }
    }

    bloodParticleColor() {
        return '#f00';
    }

    hurt(source, amount) {
        if (this.health && amount > 0 && !G.onMainMenu) {
            this.lastDamage = (amount > 0) * G.clock;
            this.health = max(0, this.health - amount);

            if (!this.health)  {
                this.die();
            }

            W.emitBloodParticles(this.x + rnd(-1, 1) * this.radius / 2, this.y + rnd(-1, 1) * this.radius / 2, this.z, !this.health * 30 + 10, () => this.bloodParticleColor());

            damageSound();
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
