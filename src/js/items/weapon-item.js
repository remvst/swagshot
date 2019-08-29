class WeaponItem extends Item {
    constructor() {
        super(WEAPON_BOX);
    }

    pickup() {
        P.setWeapon(new (pick([
            RocketLauncher,
            Shotgun,
            MachineGun,
            RailGun
        ].filter(x => P.weapon.constructor != x)))(P));
    }
}
