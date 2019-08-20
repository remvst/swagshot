dropFire = (x, y, z) => {
    for (let i = 0 ; i < 5 ; i++) {
        const fire = new Fire();
        fire.x = x + rnd(-1, 1) * BLOCK_SIZE / 2;
        fire.y = y + rnd(-1, 1) * BLOCK_SIZE / 2;

        const targetZ = min(z, hasBlock(fire.x, fire.y) ? BLOCK_SIZE / 2 : -BLOCK_SIZE / 2);
        interp(fire, 'z', z, targetZ, abs(targetZ - z) / (BLOCK_SIZE * 2 * rnd(1, 1.5)));
    }
};
