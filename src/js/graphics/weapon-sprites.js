ROCKET_LAUNCHER = pixelate(createCanvas(ROCKET_LAUNCHER_WIDTH, ROCKET_LAUNCHER_HEIGHT, ctx => {
    const grad = ctx.createLinearGradient(0, 0, ROCKET_LAUNCHER_WIDTH, 0);
    grad.addColorStop(0.2, '#443');
    grad.addColorStop(0.5, '#676');
    grad.addColorStop(0.8, '#443');

    ctx.fs(grad);

    ctx.beginPath();
    ctx.arc(evaluate(ROCKET_LAUNCHER_WIDTH / 2), ROCKET_LAUNCHER_BIG_BARREL_RADIUS, ROCKET_LAUNCHER_BIG_BARREL_RADIUS, PI, 0, false);
    ctx.arc(evaluate(ROCKET_LAUNCHER_WIDTH / 2), ROCKET_LAUNCHER_BIG_BARREL_RADIUS + ROCKET_LAUNCHER_SMALL_BARREL_Y_OFFSET, ROCKET_LAUNCHER_BIG_BARREL_RADIUS, 0, PI, false);
    ctx.fill();

    ctx.fs('#221');
    ctx.beginPath();
    ctx.arc(evaluate(ROCKET_LAUNCHER_WIDTH / 2), ROCKET_LAUNCHER_BIG_BARREL_RADIUS + ROCKET_LAUNCHER_SMALL_BARREL_Y_OFFSET, ROCKET_LAUNCHER_BIG_BARREL_RADIUS, 0, TWO_PI, false);
    ctx.fill();

    ctx.fs(grad);

    ctx.beginPath();
    ctx.arc(evaluate(ROCKET_LAUNCHER_WIDTH / 2), ROCKET_LAUNCHER_BIG_BARREL_RADIUS + ROCKET_LAUNCHER_SMALL_BARREL_Y_OFFSET, ROCKET_LAUNCHER_SMALL_BARREL_RADIUS, PI, 0, false);
    ctx.lineTo(evaluate(ROCKET_LAUNCHER_WIDTH / 2 + ROCKET_LAUNCHER_SMALL_BARREL_RADIUS), ROCKET_LAUNCHER_BIG_BARREL_RADIUS + ROCKET_LAUNCHER_SMALL_BARREL_Y_OFFSET);
    ctx.lineTo(evaluate(ROCKET_LAUNCHER_WIDTH / 2 + ROCKET_LAUNCHER_SMALL_BARREL_RADIUS + 20), ROCKET_LAUNCHER_HEIGHT);
    ctx.lineTo(evaluate(ROCKET_LAUNCHER_WIDTH / 2 - ROCKET_LAUNCHER_SMALL_BARREL_RADIUS - 20), ROCKET_LAUNCHER_HEIGHT);
    ctx.fill();
}), 5);

PISTOL = pixelate(createCanvas(PISTOL_WIDTH, PISTOL_HEIGHT, ctx => {
    const grad = ctx.createLinearGradient(0, 0, PISTOL_WIDTH, 0);
    grad.addColorStop(0.2, '#000');
    grad.addColorStop(0.5, '#222');
    grad.addColorStop(0.8, '#000');

    ctx.fs(grad);
    ctx.beginPath();
    ctx.arc(evaluate(PISTOL_WIDTH / 2), PISTOL_BARREL_RADIUS + 5, PISTOL_BARREL_RADIUS, PI, 0);
    ctx.arc(evaluate(PISTOL_WIDTH / 2), 80, PISTOL_BOTTOM_BARREL_RADIUS, 0, PI, true);
    ctx.fill();

    ctx.fs('#000');

    ctx.fr(evaluate(PISTOL_WIDTH / 2 - 3), 40, -10, -5);
    ctx.fr(evaluate(PISTOL_WIDTH / 2 + 3), 40, 10, -5);
    ctx.fr(evaluate(PISTOL_WIDTH / 2 - 3), 0, 6, 10);

    ctx.beginPath();
    ctx.arc(evaluate(PISTOL_WIDTH / 2), 79, PISTOL_BOTTOM_BARREL_RADIUS, PI, 0);
    ctx.lineTo(evaluate(PISTOL_WIDTH / 2 + PISTOL_BOTTOM_BARREL_RADIUS), PISTOL_HEIGHT);
    ctx.lineTo(evaluate(PISTOL_WIDTH / 2 - PISTOL_BOTTOM_BARREL_RADIUS), PISTOL_HEIGHT);
    ctx.fill();

    ctx.fs('#222');
    ctx.fr(evaluate(PISTOL_WIDTH / 2 - 5), 60, 10, 16);

    ctx.fs('#111');
    ctx.fr(0, 80, 5, 100);
    ctx.fr(evaluate(PISTOL_WIDTH - 5), 80, 5, 100);
}), 5);

MACHINE_GUN = pixelate(createCanvas(MACHINE_GUN_WIDTH, MACHINE_GUN_HEIGHT, ctx => {
    const grad = ctx.createLinearGradient(0, 0, MACHINE_GUN_WIDTH, 0);
    grad.addColorStop(0.2, '#000');
    grad.addColorStop(0.5, '#222');
    grad.addColorStop(0.8, '#000');

    ctx.fs(grad);
    ctx.beginPath();
    ctx.arc(evaluate(MACHINE_GUN_WIDTH / 2), evaluate(MACHINE_GUN_BARREL_RADIUS + 10), MACHINE_GUN_BARREL_RADIUS, PI, 0);
    ctx.lineTo(evaluate(MACHINE_GUN_WIDTH / 2 + MACHINE_GUN_BARREL_RADIUS + 20), MACHINE_GUN_HEIGHT);
    ctx.lineTo(evaluate(MACHINE_GUN_WIDTH / 2 - MACHINE_GUN_BARREL_RADIUS - 20), MACHINE_GUN_HEIGHT);
    ctx.fill();

    ctx.fs('#000');
    ctx.fr(evaluate(MACHINE_GUN_WIDTH / 2 - 4), 0, 8, 20);
}), 5);

SHOTGUN = pixelate(createCanvas(SHOTGUN_WIDTH, SHOTGUN_HEIGHT, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, evaluate(SHOTGUN_WIDTH / 2), 10);
    grad.addColorStop(0, '#765');
    grad.addColorStop(0.7, '#ddd');
    grad.addColorStop(1, '#765');

    const barrel = () => {
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.arc(60, 20, 20, PI, 0, false);
        ctx.lineTo(80, SHOTGUN_HEIGHT);
        ctx.lineTo(10, SHOTGUN_HEIGHT);
        ctx.fill();
    };

    ctx.fs(grad);
    barrel();

    ctx.translate(SHOTGUN_WIDTH, 0);
    ctx.scale(-1, 1);
    barrel();
}), 5);

MUZZLEFLASH = pixelate(createCanvas(MUZZLEFLASH_SIZE, MUZZLEFLASH_SIZE, ctx => {
    const grad = ctx.createRadialGradient(evaluate(MUZZLEFLASH_SIZE / 2), evaluate(MUZZLEFLASH_SIZE / 2), 0, evaluate(MUZZLEFLASH_SIZE / 2), evaluate(MUZZLEFLASH_SIZE / 2), evaluate(MUZZLEFLASH_SIZE / 2));
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.4, '#fff');
    grad.addColorStop(0.6, '#ff0');
    grad.addColorStop(1, '#ff0');

    ctx.fs(grad);
    for (let i = 0 ; i < 3 ; i++) {
        ctx.beginPath();
        ctx.ellipse(evaluate(MUZZLEFLASH_SIZE / 2), evaluate(MUZZLEFLASH_SIZE / 2), evaluate(MUZZLEFLASH_SIZE / 2), 16, i * PI / 3, 0, PI * 2);
        ctx.fill();
    }
}), 5);

RAIL_GUN = pixelate(createCanvas(RAIL_GUN_WIDTH, RAIL_GUN_HEIGHT, ctx => {
    const grad = ctx.createLinearGradient(0, 0, RAIL_GUN_WIDTH, 0);
    grad.addColorStop(0, '#76f');
    grad.addColorStop(0.5, '#ddf');
    grad.addColorStop(1, '#76f');

    const purpleGrad = ctx.createLinearGradient(0, 0, RAIL_GUN_WIDTH, 0);
    purpleGrad.addColorStop(0, '#f00');
    purpleGrad.addColorStop(0.5, '#c0f');
    purpleGrad.addColorStop(1, '#f00');

    ctx.fs(grad);

    ctx.beginPath();
    ctx.arc(40, 20, 20, PI, 0);
    ctx.lineTo(80, 160);
    ctx.lineTo(0, 160);
    ctx.fill();

    ctx.beginPath();
    ctx.fs(purpleGrad);
    ctx.arc(40, 60, 18, PI, 0);
    ctx.arc(40, 120, 25, 0, PI, true);
    ctx.fill();
}), 5);
