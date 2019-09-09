class Shotgun extends Weapon {
    constructor(character) {
        super(character);
        this.shotInterval = 0.3;
        this.angleRandomFactor = PI / 64;
        this.bulletCount = 5;
        this.sprite = SHOTGUN;
        this.bulletSpeed = evaluate(BLOCK_SIZE * 30);
        this.sound = () => {
            for (let i = 5 ; --i ; ) {
                pistolSound();
            }
        };
    }
}
