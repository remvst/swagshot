class Fire {

    constructor() {
        this.x = this.y = this.z = 0;

        this.created = G.clock + random() * 0.3;

        CYCLABLES.push(this);
        MINIMAP_ELEMENTS.push(this);
        SPRITES.push(this.sprite = {
            'width': 12,
            'height': 20,
            'sprite': FIRE
        });
    }

    cycle(e) {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z + 10;

        this.sprite.sprite = G.clock % 0.5 < 0.25 ? FIRE : FIRE_2;

        if (G.clock - this.created > 4) {
            this.remove();
        }

        if (dist(this, P) < P.radius && abs(this.z - (P.z - BLOCK_SIZE / 4)) < BLOCK_SIZE / 2) {
            P.hurt(this, e * 0.1);
        }
    }

    remove() {
        remove(CYCLABLES, this);
        remove(MINIMAP_ELEMENTS, this);
        remove(SPRITES, this.sprite);
    }

}
