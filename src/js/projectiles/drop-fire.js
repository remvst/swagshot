dropFire = (x, y, z, duration = 3) => {
    for (let i = 0 ; i < 5 ; i++) {
        const fire = new Fire(
            x + rnd(-1, 1) * evaluate(BLOCK_SIZE / 2),
            y + rnd(-1, 1) * evaluate(BLOCK_SIZE / 2),
            duration + rnd(0, 0.3)
        );

        const targetZ = max(-BLOCK_SIZE / 2, min(z, hasBlock(fire.x, fire.y) ? BLOCK_SIZE / 2 : -BLOCK_SIZE / 2));
        interp(fire, 'z', z, targetZ, (abs(targetZ - z) / (BLOCK_SIZE * rnd(2, 2.5))) || 0.1);
    }
};
