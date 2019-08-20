class EnemyBurstWeapon extends Weapon {
    constructor(character) {
        super(character);
        this.angleRandomFactor = PI / 512;
        this.angleRandomFactor = 0;
        this.trailColor = '#0f0';
        this.shotInterval = 0.1;
        this.trailSize = 2;
        this.bulletSpeed = BLOCK_SIZE * 8;
        this.shotCount = 0;
    }

    cycle(e) {
        super.cycle(e);
        if (this.character.aggressive) {
            this.maybeShoot();
        }
    }

    shoot() {
        super.shoot();
        if ((++this.shotCount % 10) == 0) {
            this.lastShot += 4;
        }
    }
}
