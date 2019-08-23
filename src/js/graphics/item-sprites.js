const WEAPON_BOX = pixelate(createCanvas(100, 100, (ctx, can) => {
    ctx.fillStyle = '#816951';
    ctx.beginPath();
    ctx.moveTo(0, can.height / 6);
    ctx.lineTo(can.width / 2, can.height / 6);
    ctx.lineTo(can.width / 2, can.height);
    ctx.lineTo(0, can.height * 5 / 6);
    ctx.fill();

    ctx.fillStyle = '#b09370';
    ctx.beginPath();
    ctx.moveTo(can.width / 2, can.height / 3);
    ctx.lineTo(can.width, can.height / 6);
    ctx.lineTo(can.width, can.height * 5 / 6);
    ctx.lineTo(can.width / 2, can.height);
    ctx.fill();

    ctx.fillStyle = '#5e503a';
    ctx.beginPath();
    ctx.moveTo(can.width / 2, 0);
    ctx.lineTo(can.width, can.height / 6);
    ctx.lineTo(can.width / 2, can.height / 3);
    ctx.lineTo(0, can.height / 6);
    ctx.fill();
}), 5);

const HEALTH_ITEM = pixelate(createCanvas(100, 60, (ctx, can) => {
    ctx.fillStyle = '#ccc';
    ctx.fillRect(0, can.height * 0.2, can.width, 60);

    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.moveTo(0, can.height * 0.2);
    ctx.lineTo(can.width, can.height * 0.2);
    ctx.lineTo(can.width * 0.8, 0);
    ctx.lineTo(can.width * 0.2, 0);
    ctx.fill();

    const crossLength = 30;
    const crossThickness = 10;
    ctx.fillStyle = '#900';
    ctx.fillRect(can.width / 2 - crossThickness / 2, can.height * 0.2 + (can.height * 0.8 - crossLength) / 2, crossThickness, crossLength);
    ctx.fillRect((can.width - crossLength) / 2, can.height * 0.2 + (can.height * 0.8 - crossThickness) / 2, crossLength, crossThickness);
}), 5);
