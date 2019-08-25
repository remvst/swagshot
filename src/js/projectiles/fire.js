class Fire {

    constructor() {
        this.x = this.y = this.z = 0;

        this.created = G.clock + random() * 0.3;

        CYCLABLES.push(this);
        MINIMAP_ELEMENTS.push(this);
        SPRITES.push(this.sprite = {
            'width': 12,
            'height': 20,
            'sprite': FIRE_FRAMES[0]
        });
    }

    cycle(e) {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z + 10;

        this.sprite.sprite = FIRE_FRAMES[~~((G.clock + this.created) % 0.5 / 0.25)];

        if (G.clock - this.created > 4) {
            this.remove();
        }

        if (dist(this, P) < P.radius && abs(this.z - (P.z - BLOCK_SIZE / 4)) < BLOCK_SIZE / 2 && G.clock - P.lastFireDamage > 0.1) {
            const damage = (G.clock - P.lastFireDamage > 0.1) * e * 1;
            P.hurt(this, damage, angleBetween(this, P));

            if (damage) {
                P.lastFireDamage = G.clock;
            }
        }
    }

    remove() {
        remove(CYCLABLES, this);
        remove(MINIMAP_ELEMENTS, this);
        remove(SPRITES, this.sprite);
    }

}
