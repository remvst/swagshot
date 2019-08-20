class EnemyFireWeapon extends Weapon {
    constructor(character) {
        super(character);
        this.angleRandomFactor = PI / 512;
        this.trailColor = '#0f0';
        this.shotInterval = 3;
        this.trailSize = 10;
        this.bulletSpeed = BLOCK_SIZE * 8;
        this.explodes = true;
    }

    cycle(e) {
        super.cycle(e);
        if (this.character.aggressive) {
            this.maybeShoot();
        }
    }
}
