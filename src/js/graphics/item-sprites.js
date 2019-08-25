WEAPON_BOX = pixelate(createCanvas(100, 100, ctx => {
    ctx.fs('#816951');
    ctx.beginPath();
    ctx.moveTo(0, WEAPON_BOX_HEIGHT / 6);
    ctx.lineTo(WEAPON_BOX_WIDTH / 2, WEAPON_BOX_HEIGHT / 6);
    ctx.lineTo(WEAPON_BOX_WIDTH / 2, WEAPON_BOX_HEIGHT);
    ctx.lineTo(0, WEAPON_BOX_HEIGHT * 5 / 6);
    ctx.fill();

    ctx.fs('#b09370');
    ctx.beginPath();
    ctx.moveTo(WEAPON_BOX_WIDTH / 2, WEAPON_BOX_HEIGHT / 3);
    ctx.lineTo(WEAPON_BOX_WIDTH, WEAPON_BOX_HEIGHT / 6);
    ctx.lineTo(WEAPON_BOX_WIDTH, WEAPON_BOX_HEIGHT * 5 / 6);
    ctx.lineTo(WEAPON_BOX_WIDTH / 2, WEAPON_BOX_HEIGHT);
    ctx.fill();

    ctx.fs('#5e503a');
    ctx.beginPath();
    ctx.moveTo(WEAPON_BOX_WIDTH / 2, 0);
    ctx.lineTo(WEAPON_BOX_WIDTH, WEAPON_BOX_HEIGHT / 6);
    ctx.lineTo(WEAPON_BOX_WIDTH / 2, WEAPON_BOX_HEIGHT / 3);
    ctx.lineTo(0, WEAPON_BOX_HEIGHT / 6);
    ctx.fill();
}), 5);

HEALTH_ITEM = pixelate(createCanvas(HEALTH_ITEM_WIDTH, HEALTH_ITEM_HEIGHT, ctx => {
    ctx.fs('#ccc');
    ctx.fr(0, HEALTH_ITEM_HEIGHT * 0.2, HEALTH_ITEM_WIDTH, 60);

    ctx.fs('#888');
    ctx.beginPath();
    ctx.moveTo(0, HEALTH_ITEM_HEIGHT * 0.2);
    ctx.lineTo(HEALTH_ITEM_WIDTH, HEALTH_ITEM_HEIGHT * 0.2);
    ctx.lineTo(HEALTH_ITEM_WIDTH * 0.8, 0);
    ctx.lineTo(HEALTH_ITEM_WIDTH * 0.2, 0);
    ctx.fill();

    ctx.fs('#900');
    ctx.fr(HEALTH_ITEM_WIDTH / 2 - HEALTH_ITEM_CROSS_THICKNESS / 2, HEALTH_ITEM_HEIGHT * 0.2 + (HEALTH_ITEM_HEIGHT * 0.8 - HEALTH_ITEM_CROSS_LENGTH) / 2, HEALTH_ITEM_CROSS_THICKNESS, HEALTH_ITEM_CROSS_LENGTH);
    ctx.fr((HEALTH_ITEM_WIDTH - HEALTH_ITEM_CROSS_LENGTH) / 2, HEALTH_ITEM_HEIGHT * 0.2 + (HEALTH_ITEM_HEIGHT * 0.8 - HEALTH_ITEM_CROSS_THICKNESS) / 2, HEALTH_ITEM_CROSS_LENGTH, HEALTH_ITEM_CROSS_THICKNESS);
}), 5);

CPU_ITEM = createCanvas(11, 11, ctx => {
    ctx.fs('#111');
    ctx.fr(1, 1, 9, 9);

    ctx.fs('#aaa');
    for (let x = 1 ; x < 10 ; x += 2) {
        ctx.fr(x, 0, 1, 1, 1);
        ctx.fr(0, x, 1, 1, 1);
        ctx.fr(x, 10, 1, 1, 1);
        ctx.fr(10, x, 1, 1, 1);
    }
});
