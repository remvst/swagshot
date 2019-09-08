renderFloor = () => {
    const sizeRatio = (evaluate(BLOCK_SIZE / 4) / BLOCK_SIZE);

    for (let x = ~~((P.x - FLOOR_DRAW_DISTANCE) / BLOCK_SIZE) * BLOCK_SIZE ; x < P.x + FLOOR_DRAW_DISTANCE ; x += evaluate(BLOCK_SIZE / 4)) {
        for (let y = ~~((P.y - FLOOR_DRAW_DISTANCE) / BLOCK_SIZE) * BLOCK_SIZE ; y < P.y + FLOOR_DRAW_DISTANCE ; y += evaluate(BLOCK_SIZE / 4)) {

            const blockCol = ~~(x / BLOCK_SIZE);
            const blockRow = ~~(y / BLOCK_SIZE);

            const texture = (blockCol % 3) || (blockRow % 3) ? FLOOR_SPRITE : FLOOR_SPRITE_GRID;

            const offsetXRatio = (x % BLOCK_SIZE) / BLOCK_SIZE;
            const offsetYRatio = (y % BLOCK_SIZE) / BLOCK_SIZE;

            const topLeft = positionOnScreen(x, y, evaluate(-BLOCK_SIZE / 2));
            const bottomLeft = positionOnScreen(x, y + evaluate(BLOCK_SIZE / 4), evaluate(-BLOCK_SIZE / 2));
            const topRight = positionOnScreen(x + evaluate(BLOCK_SIZE / 4), y, evaluate(-BLOCK_SIZE / 2));
            const bottomRight = positionOnScreen(x + evaluate(BLOCK_SIZE / 4), y + evaluate(BLOCK_SIZE / 4), evaluate(-BLOCK_SIZE / 2));

            if (topLeft.renderable || topRight.renderable || bottomLeft.renderable) {
                if (DEBUG) {
                    G.floorTiles++;
                }

                R.globalAlpha = 1 - limit(0, distP(P.x, P.y, x, y) / FLOOR_DRAW_DISTANCE, 1);
                drawTriangle(
                    texture,
                    topLeft.x, topLeft.y,
                    topRight.x, topRight.y,
                    bottomLeft.x, bottomLeft.y,

                    texture.width * offsetXRatio, texture.height * offsetYRatio,
                    texture.width * (offsetXRatio + sizeRatio), texture.height * offsetYRatio,
                    texture.height * offsetXRatio, texture.height * (offsetYRatio + sizeRatio)
                );
            }

            if (bottomRight.renderable || topRight.renderable || bottomLeft.renderable) {
                if (DEBUG) {
                    G.floorTiles++;
                }

                R.globalAlpha = 1 - limit(0, distP(P.x, P.y, x, y) / FLOOR_DRAW_DISTANCE, 1);
                drawTriangle(
                    texture,
                    bottomRight.x, bottomRight.y,
                    topRight.x, topRight.y,
                    bottomLeft.x, bottomLeft.y,

                    texture.width * (offsetXRatio + sizeRatio), texture.height * (offsetYRatio + sizeRatio),
                    texture.width * (offsetXRatio + sizeRatio), texture.height * offsetYRatio,
                    texture.height * offsetXRatio, texture.height * (offsetYRatio + sizeRatio)
                );
            }
        }
    }

    R.globalAlpha = 1;
};

drawTriangle = (
    image,
    x0, y0,
    x1, y1,
    x2, y2,

    u0, v0,
    u1, v1,
    u2, v2
) => {
    wrap(() => {
        // clip triangle
        beginPath();
        moveTo(x0, y0);
        lineTo(x1, y1);
        lineTo(x2, y2);
        // closePath();
        // stroke();
        clip();

        // calculate transformation matrix
        x1 -= x0; y1 -= y0; x2 -= x0; y2 -= y0;
        u1 -= u0; v1 -= v0; u2 -= u0; v2 -= v0;
        const id = 1 / (u1 * v2 - u2 * v1);
        const a = id * (v2 * x1 - v1 * x2);
        const b = id * (v2 * y1 - v1 * y2);
        const c = id * (u1 * x2 - u2 * x1);
        const d = id * (u1 * y2 - u2 * y1);
        const e = x0 - a*u0 - c*v0;
        const f = y0 - b*u0 - d*v0;

        // draw image
        transform(a, b, c, d, e, f);
        drawImage(image, 0, 0);
    });
};
