createRobot1 = eyeColor => addNoise(pixelate(createCanvas(100, 200, (ctx, can) => {
    const headRadius = 40;
    const wheelHeight = 30;
    const wheelRadius = 15;

    ctx.strokeStyle = '#000';
    ctx.lineWidth = 5;

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(can.width / 2, headRadius, headRadius, PI, 0);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.moveTo(0, headRadius);
    ctx.lineTo(can.width, headRadius);
    ctx.lineTo(can.width - 20, can.height - wheelHeight);
    ctx.lineTo(20, can.height - wheelHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#333';
    // ctx.beginPath();
    ctx.fillRect(can.width / 2 - wheelRadius, can.height - wheelHeight, wheelRadius * 2, wheelHeight);
    ctx.strokeRect(can.width / 2 - wheelRadius, can.height - wheelHeight, wheelRadius * 2, wheelHeight);

    ctx.fillStyle = eyeColor;
    ctx.fillRect(can.width / 2 - 20, 15, 10, 10);
    ctx.fillRect(can.width / 2 + 20, 15, -10, 10);
}), 5), 5, () => 'rgba(255,255,255, ' + (random() * 0.05) + ')');

createRobot2 = eyeColor => createCanvas(100, 110, (ctx, can) => {
    const cornerRadius = 20;
    const innerRectanglePadding = 10;
    const legLength = 20;

    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(cornerRadius, cornerRadius, cornerRadius, PI, -PI / 2);
    ctx.arc(can.width - cornerRadius, cornerRadius, cornerRadius, -PI / 2, 0);
    ctx.arc(can.width - cornerRadius, can.height - legLength - cornerRadius, cornerRadius, 0, PI / 2);
    ctx.arc(cornerRadius, can.height - legLength - cornerRadius, cornerRadius, PI / 2, PI);
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(cornerRadius + innerRectanglePadding, cornerRadius + innerRectanglePadding, cornerRadius, PI, -PI / 2);
    ctx.arc(can.width - cornerRadius - innerRectanglePadding, cornerRadius + innerRectanglePadding, cornerRadius, -PI / 2, 0);
    ctx.arc(can.width - cornerRadius - innerRectanglePadding, can.height - legLength - cornerRadius - innerRectanglePadding, cornerRadius, 0, PI / 2);
    ctx.arc(cornerRadius + innerRectanglePadding, can.height - legLength - cornerRadius - innerRectanglePadding, cornerRadius, PI / 2, PI);
    ctx.fill();

    ctx.strokeStyle = '#111';
    ctx.lineWidth = 10;

    ctx.fillRect(25, 90, 10, 10);
    ctx.strokeRect(25, 90, 10, 10);
    ctx.fillRect(can.width - 25, 90, -10, 10);
    ctx.strokeRect(can.width - 25, 90, -10, 10);

    ctx.fillStyle = eyeColor;
    ctx.fillRect(can.width / 2 - 20, 30, 10, 10);
    ctx.fillRect(can.width / 2 + 20, 30, -10, 10);
});

createRobot3 = eyeColor => addNoise(pixelate(createCanvas(200, 200, (ctx, can) => {
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(can.width / 2, can.height / 2, can.width / 2, 0, TWO_PI);
    ctx.fill();

    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(can.width / 2, can.height / 2, can.width / 2 - 20, 0, TWO_PI);
    ctx.fill();

    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(can.width / 2, can.height / 2, 40, 0, TWO_PI);
    ctx.fill();

    ctx.fillStyle = eyeColor;
    ctx.beginPath();
    ctx.arc(can.width / 2, can.height / 2, 20, 0, TWO_PI);
    ctx.fill();
}), 5), 5, () => 'rgba(255,255,255, ' + (random() * 0.05) + ')');

createRobotSprites = spriteFunc => {
    const postProcess = sprite => addNoise(pixelate(sprite, 10), 10, () => 'rgba(255,255,255, ' + (random() * 0.05) + ')');
    return [
        postProcess(spriteFunc(IDLE_EYE_COLOR)),
        postProcess(spriteFunc(AGGRESSIVE_EYE_COLOR)),
        tintCanvas(postProcess(spriteFunc(AGGRESSIVE_EYE_COLOR)), 'rgba(255,255,255,0.5)')
    ];
};

const ROBOT_1 = createRobotSprites(createRobot1);
const ROBOT_2 = createRobotSprites(createRobot2);
const ROBOT_3 = createRobotSprites(createRobot3);

const SHADOW_CIRCLE = pixelate(createCanvas(200, 200, (ctx, can) => {
    ctx.fillStyle = '#250000';
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(100, 100, 100, 0, TWO_PI);
    ctx.fill();
}), 10);
