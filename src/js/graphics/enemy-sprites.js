createRobot1 = eyeColor => createCanvas(ROBOT_1_WIDTH, ROBOT_1_HEIGHT, ctx => {
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;

    ctx.fs('#333');
    ctx.beginPath();
    ctx.arc(evaluate(ROBOT_1_WIDTH / 2), ROBOT_1_HEAD_RADIUS, ROBOT_1_HEAD_RADIUS, PI, 0);
    ctx.fill();
    ctx.stroke();

    ctx.fs('#111');
    ctx.beginPath();
    ctx.moveTo(0, ROBOT_1_HEAD_RADIUS);
    ctx.lineTo(ROBOT_1_WIDTH, ROBOT_1_HEAD_RADIUS);
    ctx.lineTo(evaluate(ROBOT_1_WIDTH - 20), evaluate(ROBOT_1_HEIGHT - ROBOT_1_WHEEL_HEIGHT));
    ctx.lineTo(20, evaluate(ROBOT_1_HEIGHT - ROBOT_1_WHEEL_HEIGHT));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fs('#333');
    ctx.fr(evaluate(ROBOT_1_WIDTH / 2 - ROBOT_1_WHEEL_RADIUS), evaluate(ROBOT_1_HEIGHT - ROBOT_1_WHEEL_HEIGHT), evaluate(ROBOT_1_WHEEL_RADIUS * 2), evaluate(ROBOT_1_WHEEL_HEIGHT));
    ctx.strokeRect(evaluate(ROBOT_1_WIDTH / 2 - ROBOT_1_WHEEL_RADIUS), evaluate(ROBOT_1_HEIGHT - ROBOT_1_WHEEL_HEIGHT), evaluate(ROBOT_1_WHEEL_RADIUS * 2), evaluate(ROBOT_1_WHEEL_HEIGHT));

    ctx.fs(eyeColor);
    ctx.fr(evaluate(ROBOT_1_WIDTH / 2 - 10), 15, 20, 10);
    // ctx.fr(evaluate(ROBOT_1_WIDTH / 2 + 20), 15, -10, 10);
});

createRobot2 = eyeColor => createCanvas(ROBOT_2_WIDTH, ROBOT_2_HEIGHT, ctx => {
    ctx.fs('#111');
    ctx.beginPath();
    ctx.arc(ROBOT_2_CORNER_RADIUS, ROBOT_2_CORNER_RADIUS, ROBOT_2_CORNER_RADIUS, PI, -PI / 2);
    ctx.arc(evaluate(ROBOT_2_WIDTH - ROBOT_2_CORNER_RADIUS), ROBOT_2_CORNER_RADIUS, ROBOT_2_CORNER_RADIUS, -PI / 2, 0);
    ctx.arc(evaluate(ROBOT_2_WIDTH - ROBOT_2_CORNER_RADIUS), evaluate(ROBOT_2_HEIGHT - ROBOT_2_LEG_LENGTH - ROBOT_2_CORNER_RADIUS), ROBOT_2_CORNER_RADIUS, 0, PI / 2);
    ctx.arc(ROBOT_2_CORNER_RADIUS, evaluate(ROBOT_2_HEIGHT - ROBOT_2_LEG_LENGTH - ROBOT_2_CORNER_RADIUS), ROBOT_2_CORNER_RADIUS, PI / 2, PI);
    ctx.fill();

    ctx.fs('#333');
    ctx.beginPath();
    ctx.arc(evaluate(ROBOT_2_CORNER_RADIUS + ROBOT_2_INNER_PADDING), evaluate(ROBOT_2_CORNER_RADIUS + ROBOT_2_INNER_PADDING), ROBOT_2_CORNER_RADIUS, PI, -PI / 2);
    ctx.arc(evaluate(ROBOT_2_WIDTH - ROBOT_2_CORNER_RADIUS - ROBOT_2_INNER_PADDING), evaluate(ROBOT_2_CORNER_RADIUS + ROBOT_2_INNER_PADDING), ROBOT_2_CORNER_RADIUS, -PI / 2, 0);
    ctx.arc(evaluate(ROBOT_2_WIDTH - ROBOT_2_CORNER_RADIUS - ROBOT_2_INNER_PADDING), evaluate(ROBOT_2_HEIGHT - ROBOT_2_LEG_LENGTH - ROBOT_2_CORNER_RADIUS - ROBOT_2_INNER_PADDING), ROBOT_2_CORNER_RADIUS, 0, PI / 2);
    ctx.arc(evaluate(ROBOT_2_CORNER_RADIUS + ROBOT_2_INNER_PADDING), evaluate(ROBOT_2_HEIGHT - ROBOT_2_LEG_LENGTH - ROBOT_2_CORNER_RADIUS - ROBOT_2_INNER_PADDING), ROBOT_2_CORNER_RADIUS, PI / 2, PI);
    ctx.fill();

    ctx.strokeStyle = '#111';
    ctx.lineWidth = 10;

    ctx.fr(25, 90, 10, 10);
    ctx.strokeRect(25, 90, 10, 10);
    ctx.fr(evaluate(ROBOT_2_WIDTH - 25), 90, -10, 10);
    ctx.strokeRect(evaluate(ROBOT_2_WIDTH - 25), 90, -10, 10);

    ctx.fs('#111');
    ctx.fr(evaluate(ROBOT_2_WIDTH / 2 - 25), 25, 20, 20);
    ctx.fr(evaluate(ROBOT_2_WIDTH / 2 + 25), 25, -20, 20);

    ctx.fs(eyeColor);
    ctx.fr(evaluate(ROBOT_2_WIDTH / 2 - 20), 30, 10, 10);
    ctx.fr(evaluate(ROBOT_2_WIDTH / 2 + 20), 30, -10, 10);
});

createRobot3 = eyeColor => createCanvas(ROBOT_3_WIDTH, ROBOT_3_HEIGHT, ctx => {
    ctx.fs('#111');
    ctx.beginPath();
    ctx.arc(evaluate(ROBOT_3_WIDTH / 2), evaluate(ROBOT_3_HEIGHT / 2), evaluate(ROBOT_3_WIDTH / 2), 0, TWO_PI);
    ctx.fill();

    ctx.fs('#333');
    ctx.beginPath();
    ctx.arc(evaluate(ROBOT_3_WIDTH / 2), evaluate(ROBOT_3_HEIGHT / 2), evaluate(ROBOT_3_WIDTH / 2 - 20), 0, TWO_PI);
    ctx.fill();

    ctx.fs('#111');
    ctx.beginPath();
    ctx.arc(evaluate(ROBOT_3_WIDTH / 2), evaluate(ROBOT_3_HEIGHT / 2), 40, 0, TWO_PI);
    ctx.fill();

    ctx.fs(eyeColor);
    ctx.beginPath();
    ctx.arc(evaluate(ROBOT_3_WIDTH / 2), evaluate(ROBOT_3_HEIGHT / 2), 20, 0, TWO_PI);
    ctx.fill();
});

createRobotSprites = spriteFunc => {
    const postProcess = sprite => addNoise(pixelate(sprite, 5), 5, () => 'rgba(255,255,255, ' + (random() * 0.05) + ')');
    return [
        postProcess(spriteFunc(IDLE_EYE_COLOR)),
        postProcess(spriteFunc(AGGRESSIVE_EYE_COLOR)),
        tintCanvas(postProcess(spriteFunc(AGGRESSIVE_EYE_COLOR)), 'rgba(255,255,255,0.5)')
    ];
};

ROBOT_1 = createRobotSprites(createRobot1);
ROBOT_2 = createRobotSprites(createRobot2);
ROBOT_3 = createRobotSprites(createRobot3);

SHADOW_CIRCLE = pixelate(createCanvas(200, 200, ctx => {
    ctx.fs('#000');
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, TWO_PI);
    ctx.fill();
}), 10);

HALO = pixelate(createCanvas(10, 10, ctx => {
    ctx.fs('#fff');
    ctx.beginPath();
    ctx.arc(5, 5, 4.5, 0, TWO_PI);
    ctx.fill();
}), 2);

HALO_CACHE = {};
halo = color => {
    HALO_CACHE[color] = HALO_CACHE[color] || tintCanvas(HALO, color);
    return HALO_CACHE[color];
};
