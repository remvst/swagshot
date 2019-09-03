class EnemySpreadWeapon extends EnemyWeapon {
    constructor(character) {
        super(character);

        this.bulletCount = 5;
        this.angleRandomFactor = PI / 64;
        this.shotInterval = 3;
        this.trailSize = 4;
    }
}
