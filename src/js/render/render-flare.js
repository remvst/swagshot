renderFlare = () => {
    const castIndex = ~~(normalize(-P.angle) * SLICE_COUNT / FIELD_OF_VIEW);
    const cast = CASTED_RAYS[castIndex];

    if (
        cast &&
        STAR_Y > -lookupOffset() && STAR_Y < CANVAS_HEIGHT / 2 - heightOnScreen(cast, BLOCK_SIZE) / 2
    ) {
        const starX = castIndex * CANVAS_WIDTH / SLICE_COUNT;
        const distFromCenterX = evaluate(CANVAS_WIDTH / 2) - starX;
        const distFromCenterY = evaluate(CANVAS_HEIGHT / 2 - STAR_Y) - lookupOffset();
        const alphaRatio = 1 - limit(0, distP(0, 0, distFromCenterX, distFromCenterY) / 300, 1);

        for (let ratio = 0 ; ratio < 1 ; ratio += 0.2) {
            const size = ratio ? (ratio * 7 % 1) * 50 : 100;
            R.globalAlpha = ratio ? alphaRatio * 0.5 : 1;
            drawImage(
                ratio ? halo('#ff0') : halo('#ff0'),
                starX + 2 * ratio * distFromCenterX - size / 2,
                STAR_Y + 2 * ratio * distFromCenterY - size / 2,
                size,
                size
            );
        }
    }
};
