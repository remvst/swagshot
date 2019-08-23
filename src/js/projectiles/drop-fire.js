dropFire = (x, y, z, frames) => {
    for (let i = 0 ; i < 5 ; i++) {
        const fire = new Fire();
        fire.x = x + rnd(-1, 1) * BLOCK_SIZE / 2;
        fire.y = y + rnd(-1, 1) * BLOCK_SIZE / 2;

        const targetZ = max(-BLOCK_SIZE / 2, min(z, hasBlock(fire.x, fire.y) ? BLOCK_SIZE / 2 : -BLOCK_SIZE / 2));
        interp(fire, 'z', z, targetZ, abs(targetZ - z) / (BLOCK_SIZE * rnd(2, 2.5)));
    }
};
