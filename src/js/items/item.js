class Item {
    constructor(sprite) {
        this.width = ITEM_RADIUS;

        this.z = -BLOCK_SIZE / 4;

        SPRITES.push(this.sprite = {
            'z': -BLOCK_SIZE / 4,
            'worldWidth': ITEM_RADIUS / 2,
            'worldHeight': sprite.height / sprite.width * ITEM_RADIUS / 2,
            'sprite': sprite
        });
        CYCLABLES.push(this);
        ITEMS.push(this);
        MINIMAP_ELEMENTS.push(this);

        SPRITES.push(this.shadowSprite = {
            'x': this.x,
            'y': this.y,
            'z': -BLOCK_SIZE / 2,
            'worldWidth': 30,
            'worldHeight': 8,
            'sprite': SHADOW_CIRCLE
        });
    }

    cycle() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.sprite.z = this.z + sin(G.clock * PI * 2 / 2) * 2;

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
