class MachineGun extends Weapon {
    constructor(character) {
        super(character);
        this.shotInterval = 0.1;
        this.angleRandomFactor = PI / 256;

        this.sprite = MACHINE_GUN;
        this.bulletSpeed = BLOCK_SIZE * 20;
    }

    cycle(e) {
        super.cycle(e);
        if (this.triggerDown) {
            this.maybeShoot();
        }
    }
}
