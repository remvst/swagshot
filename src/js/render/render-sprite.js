function renderSprite(sprite, aboveBlocks) {
    if (aboveBlocks && sprite.z < BLOCK_SIZE / 2) {
        return;
    }

    const distanceFromPlayer = dist(P, sprite);

    renderPoint(sprite, sprite.width, sprite.height, DRAW_DISTANCE - 100, DRAW_DISTANCE, (x, y, width, height, alpha) => {
        R.globalAlpha = (isNaN(sprite.alpha) ? 1 : sprite.alpha) * alpha;

        if (sprite.sprite) {
            const xStart = ~~(x - width / 2);
            const xEnd = ~~(x + width / 2);

            for (let xSlice = xStart ; xSlice < xEnd ; xSlice += SLICE_WIDTH) {
                const xRatioOnScreen = (xSlice / CANVAS_WIDTH) * FIELD_OF_VIEW;
                const castIndex = ~~(xRatioOnScreen * SLICE_COUNT);

                const cast = CASTED_RAYS[castIndex];
                if (cast && dist(cast, P) > distanceFromPlayer || aboveBlocks) {
                    const ratio = (xSlice - xStart) / width;
                    const ratioNext = ratio + SLICE_WIDTH / width;

                    drawImage(
                        sprite.sprite,
                        (ratio * sprite.sprite.width), 0, (ratioNext - ratio) * sprite.sprite.width, sprite.sprite.height,
                        xSlice - SLICE_WIDTH / 2, y - height / 2, SLICE_WIDTH, height
                    );
                }

            }
        } else {
            R.fs(sprite.color);

            translate(x, y);
            scale(width / HALO.width, height / HALO.width);
            drawImage(halo(sprite.color), 0, 0);

            // fr(x - width / 2, y - height / 2, width, height);
        }
    }, sprite.sprite || aboveBlocks);
}
