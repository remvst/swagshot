pixelate = (can, pixelSize) => {
    const smaller = createCanvas(can.width / pixelSize, can.height / pixelSize, (ctx, smallCan) => {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(can, 0, 0, smallCan.width, smallCan.height);
    });

    return createCanvas(can.width, can.height, (ctx, largeCan) => {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(smaller, 0, 0, largeCan.width, largeCan.height);
    });
};

tintCanvas = (can, color) => {
    return createCanvas(can.width, can.height, (ctx) => {
        ctx.drawImage(can, 0, 0);
        ctx.globalCompositeOperation = nomangle('source-atop');
        ctx.fs(color);
        ctx.fr(0, 0, can.width, can.height);
    });
};

addNoise = (can, pixelSize, color) => {
    return createCanvas(can.width, can.height, ctx => {
        ctx.drawImage(can, 0, 0);

        ctx.globalCompositeOperation = nomangle('source-atop');
        for (let x = 0 ; x < can.width ; x += pixelSize) {
            for (let y = 0 ; y < can.height ; y += pixelSize) {
                ctx.fs(color());
                ctx.fr(x, y, pixelSize, pixelSize);
            }
        }
    });
};

scaleCanvas = (can, x, y) => {
    return createCanvas(can.width, can.height, ctx => {
        ctx.translate(can.width * (0.5 - 0.5 * x), can.height * (0.5 - 0.5 * y));
        ctx.scale(x, y);
        ctx.drawImage(can, 0, 0);
    });
};
