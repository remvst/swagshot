class Weapon {
    constructor(character) {
        this.character = character;
        this.lastShot = 0;
        this.shotInterval = 0.1;
        this.bulletCount = 1;
        this.angleRandomFactor = 0;
        this.projectileSize = 1;
        this.trailSize = 1;
        this.bulletSpeed = 1600;
        this.ammoPerShot = 1 / 30;
        this.ammo = 1;
    }

    cycle(e) {

    }

    maybeShoot() {
        if (G.clock - this.lastShot > this.shotInterval) {
            this.shoot();
            this.lastShot = G.clock;
        }
    }

    holdTrigger() {
        this.triggerDown = true;
        this.maybeShoot();
    }

    releaseTrigger() {
        this.triggerDown = false;
    }

    shoot() {
        this.ammo -= this.ammoPerShot;

        for (let i = 0 ; i < this.bulletCount ; i++) {
            new Bullet(
                this.character.x + cos(this.character.angle) * BLOCK_SIZE * 0.2,
                this.character.y + sin(this.character.angle) * BLOCK_SIZE * 0.2,
                this.character.eyeZ() - 10,
                this.bulletSpeed,
                this.character.angle + rnd(-1, 1) * this.angleRandomFactor,
                this.character.verticalAngle + rnd(-1, 1) * this.angleRandomFactor,
                this.character.enemies,
                this.projectileSize,
                this.trailSize
            );
        }
    }
}
