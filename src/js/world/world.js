class World {
    constructor() {
        const generated = generateWorld();
        this.matrix = generated.matrix;
        this.can = generated.can;

        CYCLABLES.splice(0, CYCLABLES.length);
        SPRITES.splice(0, SPRITES.length);
        ITEMS.splice(0, ITEMS.length);
        ENEMIES.splice(0, ENEMIES.length);

        // const fire = new Fire();
        // fire.x = 10.5 * BLOCK_SIZE;
        // fire.y = 10.5 * BLOCK_SIZE;
        // // return;
        //
        // const enemy = new Enemy();
        // enemy.x = 10.5 * BLOCK_SIZE;
        // enemy.y = 10.5 * BLOCK_SIZE;
        // enemy.z = 0;
        // return;

        for (let row = 10 ; row < this.matrix.length ; row++) {
            for (let col = 10 ; col < this.matrix[0].length ; col++) {
                if (this.matrix[row][col]) {
                    continue;
                }

                const neighborCount = (this.matrix[row - 1][col] ? 1 : 0) +
                    (this.matrix[row + 1][col]  ? 1 : 0)+
                    (this.matrix[row][col - 1]  ? 1 : 0)+
                    (this.matrix[row][col + 1]? 1 : 0);

                if ((neighborCount == 2 || neighborCount == 3) && random() < ITEM_DENSITY) {
                    const item = new (pick([
                        WeaponItem,
                        HealthItem
                    ]))();
                    item.x = (col + 0.5) * BLOCK_SIZE;
                    item.y = (row + 0.5) * BLOCK_SIZE;
                }

                if (random() < ENEMY_DENSITY) {
                    const enemy = new Enemy();
                    enemy.x = (col + 0.5) * BLOCK_SIZE;
                    enemy.y = (row + 0.5) * BLOCK_SIZE;
                    enemy.z = rnd(-0.35, 2) * BLOCK_SIZE;
                }
            }
        }
    }

    cycle(e) {
        P.cycle(e);

        CYCLABLES.forEach(b => b.cycle(e));
    }
}
