function renderFloor(z, maxDistance) {
    const size = BLOCK_SIZE / 4;

    const sizeRatio = (size / BLOCK_SIZE);

    for (let x = ~~((P.x - maxDistance) / BLOCK_SIZE) * BLOCK_SIZE ; x < P.x + maxDistance ; x += size) {
        for (let y = ~~((P.y - maxDistance) / BLOCK_SIZE) * BLOCK_SIZE ; y < P.y + maxDistance ; y += size) {

            const blockCol = ~~(x / BLOCK_SIZE);
            const blockRow = ~~(y / BLOCK_SIZE);

            const texture = (blockCol % 3) || (blockRow % 3) ? FLOOR_SPRITE : FLOOR_SPRITE_GRID;

            const offsetXRatio = (x % BLOCK_SIZE) / BLOCK_SIZE;
            const offsetYRatio = (y % BLOCK_SIZE) / BLOCK_SIZE;

            const topLeft = positionOnScreen(x, y, z);
            const bottomLeft = positionOnScreen(x, y + size, z);
            const topRight = positionOnScreen(x + size, y, z);
            const bottomRight = positionOnScreen(x + size, y + size, z);

            if (topLeft.renderable || topRight.renderable || bottomLeft.renderable) {
                if (DEBUG) {
                    G.floorTiles++;
                }

                R.globalAlpha = 1 - limit(0, distP(P.x, P.y, x, y) / maxDistance, 1);
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

                R.globalAlpha = 1 - limit(0, distP(P.x, P.y, x, y) / maxDistance, 1);
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
}

function drawTriangle(
    image,
    x0, y0,
    x1, y1,
    x2, y2,

    u0, v0,
    u1, v1,
    u2, v2
) {
    // clip triangle
    save();
    beginPath();
    moveTo(x0, y0);
    lineTo(x1, y1);
    lineTo(x2, y2);
    closePath();
    // stroke();
    clip();

    // calculate transformation matrix
    x1 -= x0; y1 -= y0; x2 -= x0; y2 -= y0;
    u1 -= u0; v1 -= v0; u2 -= u0; v2 -= v0;
    const id = 1.0 / (u1 * v2 - u2 * v1);
    const a = id * (v2 * x1 - v1 * x2);
    const b = id * (v2 * y1 - v1 * y2);
    const c = id * (u1 * x2 - u2 * x1);
    const d = id * (u1 * y2 - u2 * y1);
    const e = x0 - a*u0 - c*v0;
    const f = y0 - b*u0 - d*v0;

    // draw image
    transform(a, b, c, d, e, f);
    drawImage(image, 0, 0);

    // restore previous state
    restore();
}
