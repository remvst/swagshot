class MachineGun extends Weapon {
    constructor(character) {
        super(character);
        this.shotInterval = 0.1;
        this.angleRandomFactor = PI / 256;

        this.sprite = MACHINE_GUN;
        this.bulletSpeed = evaluate(BLOCK_SIZE * 30);
        this.ammoPerShot = 0.02;
        this.sound = pistolSound;
    }

    cycle(e) {
        super.cycle(e);
        if (this.triggerDown) {
            this.maybeShoot();
        }
    }
}
