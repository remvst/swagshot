class Item {
    constructor(sprite) {
        this.width = ITEM_RADIUS;

        SPRITES.push(this.sprite = {
            'z': -BLOCK_SIZE / 4,
            'width': ITEM_RADIUS / 2,
            'height': sprite.height / sprite.width * ITEM_RADIUS / 2,
            'sprite': sprite
        });
        CYCLABLES.push(this);
        ITEMS.push(this);
        MINIMAP_ELEMENTS.push(this);

        SPRITES.push(this.shadowSprite = {
            'x': this.x,
            'y': this.y,
            'z': -BLOCK_SIZE / 2,
            'width': 30,
            'height': 8,
            'sprite': SHADOW_CIRCLE
        });
    }

    cycle() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = sin(G.clock * PI * 2 / 2) * 2 - BLOCK_SIZE / 4;

        this.shadowSprite.x = this.x + cos(P.angle);
        this.shadowSprite.y = this.y + sin(P.angle);

        if (dist(this, P) < ITEM_RADIUS) {
            // itemSound();
            this.pickup();
            this.remove();
            P.lastPickup = G.clock;
        }
    }

    remove() {
        remove(CYCLABLES, this);
        remove(ITEMS, this);
        remove(MINIMAP_ELEMENTS, this);
        remove(SPRITES, this.sprite);
        remove(SPRITES, this.shadowSprite);

        itemSound();
    }
}
