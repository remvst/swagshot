class EnemyBurstWeapon extends EnemyWeapon {
    constructor(character) {
        super(character);
        this.angleRandomFactor = PI / 512;
        this.angleRandomFactor = 0;
        this.shotInterval = 0.1;
        this.trailSize = 4;
        this.shotCount = 0;
    }

    shoot() {
        super.shoot();
        if (!(++this.shotCount % 10)) {
            this.lastShot += 4;
        }
    }
}
