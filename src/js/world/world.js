class World {
    constructor() {
        const generated = generateWorld();
        this.matrix = generated.matrix;
        this.can = generated.can;

        CYCLABLES.splice(0, CYCLABLES.length);
        SPRITES.splice(0, SPRITES.length);
        ITEMS.splice(0, ITEMS.length);
        ENEMIES.splice(0, ENEMIES.length);

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
                    enemy.dropScrap = enemy.z < BLOCK_SIZE / 2;
                }
            }
        }
    }

    cycle(e) {
        P.cycle(e);

        CYCLABLES.forEach(b => b.cycle(e));
    }
}
