class EnemyWeapon extends Weapon {
    constructor(character) {
        super(character);
        this.trailColor = '#f00';
    }

    cycle(e) {
        super.cycle(e);
        if (this.character.aggressive) {
            this.maybeShoot();
        }
    }
}
