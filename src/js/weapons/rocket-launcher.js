class RocketLauncher extends Weapon {
    constructor(character) {
        super(character);
        this.shotInterval = 0.5;
        this.trailSize = 5;
        this.sprite = ROCKET_LAUNCHER;
        this.bulletSpeed = evaluate(BLOCK_SIZE * 20);
        this.explodes = true;
        this.sound = rocketSound;
    }
}
