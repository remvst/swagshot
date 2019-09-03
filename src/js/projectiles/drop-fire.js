dropFire = (x, y, z, duration = 3) => {
    for (let i = 0 ; i < 5 ; i++) {
        const fire = new Fire(
            x + rnd(-1, 1) * evaluate(BLOCK_SIZE / 2),
            y + rnd(-1, 1) * evaluate(BLOCK_SIZE / 2),
            duration + rnd(0, 0.3)
        );

        const targetZ = evaluate(-BLOCK_SIZE / 2);
        interp(fire, 'z', z, targetZ, (abs(targetZ - z) / (BLOCK_SIZE * rnd(2, 2.5))) || 0.1);
    }
};
