class HealthItem extends Item {
    constructor() {
        super(HEALTH_ITEM);
    }

    pickup() {
        P.health = min(1, P.health + 0.5);
    }

    enabled() {
        return P.health < 1;
    }
}
