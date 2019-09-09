renderStar = () => {
    drawImage(
        halo('#ff0'),
        normalize(-P.angle) / FIELD_OF_VIEW * CANVAS_WIDTH - 30,
        STAR_Y - 30,
        60,
        60
    );
};

renderFlare = () => {
    const castIndex = ~~(normalize(-P.angle) * SLICE_COUNT / FIELD_OF_VIEW);
    const cast = CASTED_RAYS[castIndex];

    if (!cast) {
        return;
    }

    const wallHeightOnScreen = ~~heightOnScreen(cast, BLOCK_SIZE);
    const yTopWall = evaluate(CANVAS_HEIGHT / 2) - (1 - P.eyeZ() / evaluate(BLOCK_SIZE / 2)) * wallHeightOnScreen / 2;

    if (STAR_Y > -lookupOffset() && STAR_Y < yTopWall) {
        const starX = castIndex * CANVAS_WIDTH / SLICE_COUNT;
        const distFromCenterX = evaluate(CANVAS_WIDTH / 2) - starX;
        const distFromCenterY = evaluate(CANVAS_HEIGHT / 2 - STAR_Y) - lookupOffset();
        const alphaRatio = 1 - limit(0, distP(0, 0, distFromCenterX, distFromCenterY) / (G.onMainMenu ? 500 : 250), 1);

        for (let ratio = 0 ; ratio < 1 ; ratio += 0.15) {
            const size = (ratio * 56 % 1) * 35;
            R.globalAlpha = alphaRatio * 0.5;
            drawImage(
                halo('#ff0'),
                starX + 2 * ratio * distFromCenterX - size / 2,
                STAR_Y + 2 * ratio * distFromCenterY - size / 2,
                size,
                size
            );
        }
    }
};
