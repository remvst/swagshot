renderMatrix = (matrix, ctx, colorGetter) => {
    for (let row = 0 ; row < matrix.length ; row++) {
        for (let col = 0 ; col < matrix[0].length ; col++) {
            if (matrix[row][col]) {
                ctx.fillStyle = toColor(colorGetter(matrix[row][col]));
                ctx.fillRect(col, row, 1, 1);
            }
        }
    }
};

pixelate = (can, pixelSize) => {
    const smaller = createCanvas(can.width / pixelSize, can.height / pixelSize, (ctx, smallCan) => {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(can, 0, 0, can.width, can.height, 0, 0, smallCan.width, smallCan.height);
    });

    return createCanvas(can.width, can.height, (ctx, largeCan) => {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(smaller, 0, 0, smaller.width, smaller.height, 0, 0, largeCan.width, largeCan.height);
    });
};

tintCanvas = (can, color) => {
    return createCanvas(can.width, can.height, (ctx) => {
        ctx.drawImage(can, 0, 0);
        ctx.globalCompositeOperation = nomangle('source-atop');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, can.width, can.height);
    });
};

addNoise = (can, pixelSize, color) => {
    return createCanvas(can.width, can.height, ctx => {
        ctx.drawImage(can, 0, 0);

        ctx.globalCompositeOperation = nomangle('source-atop');
        for (let x = 0 ; x < can.width ; x += pixelSize) {
            for (let y = 0 ; y < can.height ; y += pixelSize) {
                ctx.fillStyle = color();
                ctx.fillRect(x, y, pixelSize, pixelSize);
            }
        }
    });
};
