class RailGun extends Weapon {
    constructor(character) {
        super(character);
        this.shotInterval = 1;
        this.bulletCount = 7;
        this.sprite = RAIL_GUN;
        this.bulletSpeed = evaluate(BLOCK_SIZE * 50);
        this.sound = () => {
            for (let i = 5 ; --i ; ) {
                pistolSound();
            }
        };
        this.ammoPerShot = 0.15;
        this.trailColor = '#f0f';
    }
}
