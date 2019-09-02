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

    shoot() {
        if (abs(normalize(P.angle - angleBetween(this.character, P))) < PI / 2 || random() < 0.5) {
            super.shoot();
        } else {
            // Enemies behind shoot the player less
            this.lastShot = G.clock;
        }
    }
}
