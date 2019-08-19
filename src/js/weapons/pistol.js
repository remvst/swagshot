class Pistol extends Weapon {
    constructor(character) {
        super(character);
        this.shotInterval = 0.1;
        this.angleRandomFactor = PI / 512;
        this.sprite = PISTOL;
        this.bulletSpeed = BLOCK_SIZE * 30;
        this.ammoPerShot = 0;
    }
}
