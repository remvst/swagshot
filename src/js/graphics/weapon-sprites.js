const ROCKET_LAUNCHER = pixelate(createCanvas(120, 200, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, can.width, 0);
    grad.addColorStop(0.2, '#41403a');
    grad.addColorStop(0.5, '#6a7163');
    grad.addColorStop(0.8, '#41403a');

    ctx.fs(grad);

    const bigBarrelRadius = 40;
    const smallBarrelTopY = bigBarrelRadius + 20;
    const smallBarrelRadius = 30;

    ctx.beginPath();
    ctx.arc(can.width / 2, bigBarrelRadius, bigBarrelRadius, PI, 0, false);
    ctx.arc(can.width / 2, smallBarrelTopY, bigBarrelRadius, 0, PI, false);
    ctx.fill();

    ctx.fs('#22241b');
    ctx.beginPath();
    ctx.arc(can.width / 2, smallBarrelTopY, bigBarrelRadius, 0, TWO_PI, false);
    ctx.fill();

    ctx.fs(grad);

    ctx.beginPath();
    ctx.arc(can.width / 2, smallBarrelTopY, smallBarrelRadius, PI, 0, false);
    ctx.lineTo(can.width / 2 + smallBarrelRadius, smallBarrelTopY);
    ctx.lineTo(can.width / 2 + smallBarrelRadius + 20, can.height);
    ctx.lineTo(can.width / 2 - smallBarrelRadius - 20, can.height);
    ctx.fill();
}), 5);

const PISTOL = pixelate(createCanvas(70, 150, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, can.width, 0);
    grad.addColorStop(0.2, '#000');
    grad.addColorStop(0.5, '#222');
    grad.addColorStop(0.8, '#000');

    const barrelRadius = 20;
    const bottomBarrelRadius = 35;

    ctx.fs(grad);
    ctx.beginPath();
    ctx.arc(can.width / 2, barrelRadius + 5, barrelRadius, PI, 0);
    ctx.arc(can.width / 2, 80, bottomBarrelRadius, 0, PI, true);
    // ctx.lineTo(can.width / 2 + barrelRadius + 20, can.height);
    // ctx.lineTo(can.width / 2 - barrelRadius - 20, can.height);
    ctx.fill();

    ctx.fs('#000');

    ctx.fillRect(can.width / 2 - 3, 40, -10, -5);
    ctx.fillRect(can.width / 2 + 3, 40, 10, -5);
    ctx.fillRect(can.width / 2 - 3, 0, 6, 10);

    ctx.beginPath();
    ctx.arc(can.width / 2, 80, bottomBarrelRadius, PI, 0);
    ctx.lineTo(can.width / 2 + bottomBarrelRadius, can.height);
    ctx.lineTo(can.width / 2 - bottomBarrelRadius, can.height);
    ctx.fill();

    ctx.fs('#222');
    ctx.fillRect(can.width / 2 - 5, 60, 10, 16);

    ctx.fs('#111');
    ctx.fillRect(0, 80, 5, 100);
    ctx.fillRect(can.width - 5, 80, 5, 100);
}), 5);

const MACHINE_GUN = pixelate(createCanvas(100, 150, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, can.width, 0);
    grad.addColorStop(0.2, '#000');
    grad.addColorStop(0.5, '#222');
    grad.addColorStop(0.8, '#000');

    const barrelRadius = 20;

    ctx.fs(grad);
    ctx.beginPath();
    ctx.arc(can.width / 2, barrelRadius + 10, barrelRadius, PI, 0);
    ctx.lineTo(can.width / 2 + barrelRadius + 20, can.height);
    ctx.lineTo(can.width / 2 - barrelRadius - 20, can.height);
    ctx.fill();

    ctx.fs('#000');
    ctx.fillRect(can.width / 2 - 4, 0, 8, 20);
}), 5);

const SHOTGUN = pixelate(createCanvas(165, 150, (ctx, can) => {
    const grad = ctx.createLinearGradient(0, 0, can.width / 2, 10);
    grad.addColorStop(0, '#765');
    grad.addColorStop(0.7, '#ddd');
    grad.addColorStop(1, '#765');

    const barrel = () => {
        ctx.beginPath();
        ctx.moveTo(40, 20);
        ctx.arc(60, 20, 20, PI, 0, false);
        ctx.lineTo(80, can.height);
        ctx.lineTo(10, can.height);
        ctx.fill();
    };

    ctx.fs(grad);
    barrel();

    ctx.translate(can.width, 0);
    ctx.scale(-1, 1);
    barrel();
}), 5);

const MUZZLEFLASH = pixelate(createCanvas(160, 160, (ctx, can) => {
    const grad = ctx.createRadialGradient(can.width / 2, can.width / 2, 0, can.width / 2, can.width / 2, can.width / 2);
    grad.addColorStop(0, '#fff');
    grad.addColorStop(0.4, '#fff');
    grad.addColorStop(0.6, '#ff0');
    grad.addColorStop(1, '#ff0');

    ctx.fs(grad);
    for (let i = 0 ; i < 3 ; i++) {
        // ctx.rotate(PI / 3);
        ctx.beginPath();
        ctx.ellipse(can.width / 2, can.width / 2, can.width / 2, 16, i * PI / 3, 0, PI * 2);
        ctx.fill();
    }
}), 5);
