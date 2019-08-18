class World {
    constructor() {
        this.matrix = generateWorld();

        CYCLABLES = [];
        SPRITES = [];

        for (let i = 0 ; i < 10 ; i++) {
            const enemy = new Enemy();
            enemy.x = 1550 + rnd(-1, 1) * BLOCK_SIZE * 2;
            enemy.y = 150 + i * BLOCK_SIZE;
            enemy.z = rnd(-0.35, 2) * BLOCK_SIZE;
        }
    }

    cycle(e) {
        P.cycle(e);

        CYCLABLES.forEach(b => b.cycle(e));
    }
}
