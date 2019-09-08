class Weapon {
    constructor(character) {
        this.character = character;
        this.lastShot = -9;
        this.shotInterval = 0.1;
        this.bulletCount = 1;
        this.angleRandomFactor = 0;
        this.trailSize = 0.5;
        this.bulletSpeed = 1600;
        this.ammoPerShot = 1 / 30;
        this.ammo = 1;
        this.created = G.clock;
        this.explodes = false;
    }

    cycle(e) {

    }

    maybeShoot() {
        if (G.clock - this.lastShot > this.shotInterval && this.character.health > 0) {
            this.lastShot = G.clock;
            this.shoot();

            if (this.sound) {
                this.sound();
            }
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
        if (!(this.ammo = max(0, this.ammo - this.ammoPerShot))) {
            this.character.setWeapon(new Pistol(this.character));
        }

        for (let i = 0 ; i < this.bulletCount ; i++) {
            new Bullet(
                this.character.x + cos(this.character.angle) * BLOCK_SIZE * 0.1,
                this.character.y + sin(this.character.angle) * BLOCK_SIZE * 0.1,
                this.character.eyeZ() - 10,
                this.bulletSpeed,
                this.character.shootAngle() + rnd(-1, 1) * this.angleRandomFactor,
                this.character.shootVerticalAngle() + rnd(-1, 1) * this.angleRandomFactor,
                this.character.enemies,
                this.trailSize,
                this.explodes
            );
        }

        if (this.character == P) {
            backgroundAnimation('#444');
        }
    }
}
