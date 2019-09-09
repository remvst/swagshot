function renderSprite(sprite, aboveBlocks) {
    if (aboveBlocks && sprite.z < evaluate(BLOCK_SIZE / 2)) {
        return;
    }

    const distanceFromPlayer = dist(P, sprite);

    renderPoint(sprite, sprite.worldWidth, sprite.worldHeight, evaluate(DRAW_DISTANCE - 100), DRAW_DISTANCE, (x, y, renderedWidth, renderedHeight, alpha) => {
        R.globalAlpha = (isNaN(sprite.alpha) ? 1 : sprite.alpha) * alpha;

        if (sprite.sprite) {
            const xStart = ~~(x - renderedWidth / 2);
            const xEnd = ~~(x + renderedWidth / 2);

            for (let xSlice = xStart ; xSlice < xEnd ; xSlice += SLICE_WIDTH) {
                const xRatioOnScreen = (xSlice / CANVAS_WIDTH) * FIELD_OF_VIEW;
                const castIndex = ~~(xRatioOnScreen * SLICE_COUNT);

                const cast = CASTED_RAYS[castIndex];
                if (cast && dist(cast, P) > distanceFromPlayer || aboveBlocks) {
                    const ratio = (xSlice - xStart) / renderedWidth;
                    const ratioNext = ratio + SLICE_WIDTH / renderedWidth;

                    drawImage(
                        sprite.sprite,
                        (ratio * sprite.sprite.width), 0, (ratioNext - ratio) * sprite.sprite.width, sprite.sprite.height,
                        xSlice, y - renderedHeight / 2, SLICE_WIDTH, renderedHeight
                    );
                }

            }
        } else {
            translate(x, y);
            scale(renderedWidth / HALO.width, renderedHeight / HALO.width);
            drawImage(halo(sprite.color), 0, 0);
        }
    }, sprite.sprite || aboveBlocks);
}
