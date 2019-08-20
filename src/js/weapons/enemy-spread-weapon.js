class EnemySpreadWeapon extends Weapon {
    constructor(character) {
        super(character);

        this.bulletCount = 5;
        this.angleRandomFactor = PI / 64;
        this.trailColor = '#0f0';
        this.shotInterval = 3;
        this.trailSize = 2;
        this.bulletSpeed = BLOCK_SIZE * 8;
    }

    cycle(e) {
        super.cycle(e);
        if (this.character.aggressive) {
            this.maybeShoot();
        }
    }
}
